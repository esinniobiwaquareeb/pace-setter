import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { createHash } from 'node:crypto'
import { loadEnv } from 'vite'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

/**
 * Vite dev-server middleware that handles /api/* routes locally so that
 * `npm run dev` works without needing `vercel dev`.
 */
function apiDevPlugin() {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const env = loadEnv('development', process.cwd(), '')

        // ── POST /api/upload-cv ────────────────────────────────────────────
        if (req.url === '/api/upload-cv' && req.method === 'POST') {
          const cloudName = env.CLOUDINARY_CLOUD_NAME
          const apiKey = env.CLOUDINARY_API_KEY
          const apiSecret = env.CLOUDINARY_API_SECRET

          if (!cloudName || !apiKey || !apiSecret) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'Cloudinary env vars not set.' }))
            return
          }

          let body = ''
          for await (const chunk of req) body += chunk
          let parsed: { fileName?: string; fileBase64?: string }
          try {
            parsed = JSON.parse(body)
          } catch {
            res.writeHead(400, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'Invalid JSON body.' }))
            return
          }

          const { fileName, fileBase64 } = parsed
          if (!fileBase64) {
            res.writeHead(400, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'No file data provided.' }))
            return
          }

          const timestamp = Math.floor(Date.now() / 1000)
          const safeName = (fileName ?? 'cv')
            .replace(/\.[^.]+$/, '')
            .replace(/[^a-zA-Z0-9_-]/g, '_')
            .slice(0, 60)
          const publicId = `careers/cvs/${timestamp}_${safeName}`
          const paramStr = `public_id=${publicId}&timestamp=${timestamp}`
          const signature = createHash('sha1')
            .update(`${paramStr}${apiSecret}`)
            .digest('hex')

          const base64Data = fileBase64.includes(',') ? fileBase64.split(',')[1] : fileBase64

          const formData = new FormData()
          formData.append('file', `data:application/pdf;base64,${base64Data}`)
          formData.append('public_id', publicId)
          formData.append('api_key', apiKey)
          formData.append('timestamp', String(timestamp))
          formData.append('signature', signature)
          formData.append('resource_type', 'auto')

          try {
            const cloudRes = await fetch(
              `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
              { method: 'POST', body: formData }
            )
            const data = await cloudRes.json() as { secure_url?: string; error?: { message: string } }

            if (data.error) {
              res.writeHead(422, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: data.error.message }))
              return
            }

            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ url: data.secure_url }))
          } catch (err) {
            res.writeHead(502, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: `Upload failed: ${String(err)}` }))
          }
          return
        }

        // ── POST /api/applications ─────────────────────────────────────────
        if (req.url === '/api/applications' && req.method === 'POST') {
          let body = ''
          for await (const chunk of req) body += chunk

          let application: Record<string, string>
          try {
            application = JSON.parse(body)
          } catch {
            res.writeHead(400, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'Invalid JSON body.' }))
            return
          }

          const recipientEmail = env.APPLICATIONS_EMAIL || 'pacesettercleaning@gmail.com'
          const resendKey = env.RESEND_API_KEY

          const cvLine = application.cvUrl
            ? `<a href="${application.cvUrl}" style="color:#16a34a;font-weight:600">Download CV ↗</a>`
            : '<span style="color:#9ca3af">Not provided</span>'

          const html = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px 24px">
            <h2 style="color:#166534;margin:0 0 4px">New Job Application</h2>
            <p style="color:#6b7280;font-size:13px;margin:0 0 24px">Pacesetter Cleaning Services</p>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;width:150px">Full Name</td><td style="padding:8px 0;font-size:14px;font-weight:600">${application.name ?? ''}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Email</td><td style="padding:8px 0;font-size:14px"><a href="mailto:${application.email ?? ''}" style="color:#16a34a">${application.email ?? ''}</a></td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Phone</td><td style="padding:8px 0;font-size:14px">${application.phone ?? ''}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Availability</td><td style="padding:8px 0;font-size:14px">${application.availability ?? ''}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Experience</td><td style="padding:8px 0;font-size:14px">${application.experience ?? ''}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">CV</td><td style="padding:8px 0;font-size:14px">${cvLine}</td></tr>
            </table>
            ${application.notes ? `<div style="margin-top:20px;padding:14px;background:#f0fdf4;border-left:3px solid #16a34a"><p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#16a34a;text-transform:uppercase">Cover Note</p><p style="margin:0;font-size:14px;white-space:pre-wrap">${application.notes}</p></div>` : ''}
            <p style="margin-top:24px;font-size:12px;color:#9ca3af">Submitted: ${new Date(application.createdAt ?? Date.now()).toLocaleString('en-GB')}</p>
          </div>`

          if (resendKey) {
            try {
              await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${resendKey}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  from: 'Pacesetter Careers <onboarding@resend.dev>',
                  to: [recipientEmail],
                  reply_to: application.email ?? undefined,
                  subject: `Job Application: ${application.name ?? ''} — ${application.email ?? ''}`,
                  html,
                }),
              })
            } catch (err) {
              console.error('[Resend dev] Failed to send email:', err)
            }
          }

          res.writeHead(200, { 'content-type': 'application/json' })
          res.end(JSON.stringify({ ok: true }))
          return
        }

        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    apiDevPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})

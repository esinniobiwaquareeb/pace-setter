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
        if (req.url !== '/api/upload-cv' || req.method !== 'POST') {
          return next()
        }

        // Read env from the project root
        const env = loadEnv('development', process.cwd(), '')
        const cloudName = env.CLOUDINARY_CLOUD_NAME
        const apiKey = env.CLOUDINARY_API_KEY
        const apiSecret = env.CLOUDINARY_API_SECRET

        if (!cloudName || !apiKey || !apiSecret) {
          res.writeHead(500, { 'content-type': 'application/json' })
          res.end(JSON.stringify({ error: 'Cloudinary env vars not set.' }))
          return
        }

        // Parse body
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

        // Build Cloudinary signature (SHA-1)
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

        const base64Data = fileBase64.includes(',')
          ? fileBase64.split(',')[1]
          : fileBase64

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

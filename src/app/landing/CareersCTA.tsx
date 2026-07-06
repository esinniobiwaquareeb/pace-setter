import { ArrowRight, Briefcase, Users } from "lucide-react";
import { Link } from "react-router";

export function CareersCTA() {
  return (
    <section className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div
          style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            background: "linear-gradient(135deg, #1a3a2a 0%, #0f2a1c 50%, #163322 100%)",
            padding: "clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px)",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          {/* Decorative blobs */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-60px",
              right: "-60px",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(72,199,116,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-40px",
              left: "-40px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(72,199,116,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "32px",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Left: copy */}
            <div style={{ flex: "1 1 320px", maxWidth: "640px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(72,199,116,0.15)",
                  border: "1px solid rgba(72,199,116,0.3)",
                  borderRadius: "100px",
                  padding: "6px 14px",
                  marginBottom: "20px",
                }}
              >
                <Users size={14} style={{ color: "#48c774" }} />
                <span style={{ color: "#48c774", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  We're Hiring
                </span>
              </div>

              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  margin: "0 0 14px",
                  letterSpacing: "-0.02em",
                }}
              >
                Join the Pacesetter Team
              </h2>

              <p
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontSize: "clamp(0.95rem, 1.8vw, 1.08rem)",
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: "520px",
                }}
              >
                We're growing our teams across London and Liverpool. Whether you're experienced or just starting out, we offer flexible shifts, competitive pay, and a supportive environment.
              </p>

              {/* Perks row */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "24px",
                }}
              >
                {["Flexible Hours", "Training Provided", "Immediate Start"].map((perk) => (
                  <span
                    key={perk}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      borderRadius: "100px",
                      padding: "5px 14px",
                      color: "rgba(255,255,255,0.82)",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                    }}
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: CTA button */}
            <div
              style={{
                flex: "0 0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <Link
                to="/careers"
                id="landing-careers-cta-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "linear-gradient(135deg, #48c774 0%, #2daa57 100%)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1rem",
                  padding: "16px 32px",
                  borderRadius: "14px",
                  textDecoration: "none",
                  boxShadow: "0 4px 24px rgba(72,199,116,0.35)",
                  transition: "transform 0.18s ease, box-shadow 0.18s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(72,199,116,0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 24px rgba(72,199,116,0.35)";
                }}
              >
                <Briefcase size={18} />
                View Open Roles
                <ArrowRight size={16} />
              </Link>
              <span
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.8rem",
                  paddingLeft: "2px",
                }}
              >
                No experience required for some roles
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const productLinks = ["Landscape Consultation", "Butterfly Garden", "Terrace Garden", "Other Services"];
  const companyLinks  = [
    { label: "About",    href: "#/about" },
    { label: "Portfolio",href: "#/portfolio" },
    { label: "News",     href: "#/news" },
    { label: "Contact",  href: "#/contact" },
  ];


  return (
    <footer style={{
      borderTop: "1px solid #e5e7eb",
      backgroundColor: "#ffffff",
      fontFamily: "var(--font-sans)",
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "64px 40px 40px",
      }}>

        {/* ── Top Grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "48px",
          marginBottom: "48px",
        }}
        className="footer-top-grid"
        >
          {/* Column 1 – Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }}>
                GREEN REALM LANDSCAPE
              </span>
            </div>

            <p style={{
              fontSize: "14px", lineHeight: "1.7",
              color: "#6b7280", maxWidth: "280px", margin: 0,
            }}>
              A collection of premium landscaping and architectural designs for your luxury space or side project.
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { icon: <FaInstagram size={16} />, label: "Instagram", href: "https://www.instagram.com/greenrealmlandscape/" },
                { icon: <FaFacebookF size={16} />, label: "Facebook",  href: "https://www.facebook.com/greenrealmlandscape" },                { icon: <FaLinkedinIn size={16} />, label: "LinkedIn",  href: "https://in.linkedin.com/company/green-realm-landscape" },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href} title={label}
                  target={href !== "#" ? "_blank" : undefined}
                  rel={href !== "#" ? "noopener noreferrer" : undefined}
                  style={{
                    width: "38px", height: "38px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#6b7280",
                    transition: "all 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#0f172a";
                    e.currentTarget.style.color = "#0f172a";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.color = "#6b7280";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 – Product */}
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "20px" }}>
              Services
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {productLinks.map(link => (
                <li key={link}>
                  <a href="#" style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#0f172a"}
                    onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}
                  >{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Company */}
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "20px" }}>
              Company
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#0f172a"}
                    onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}
                  >{label}</a>
                </li>
              ))}
            </ul>
          </div>


        </div>

        {/* ── Bottom Bar ── */}
        <div style={{
          borderTop: "1px solid #f3f4f6",
          paddingTop: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
            © 2026  GREEN REALM LANDSCAPE. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Terms and Conditions", "Privacy Policy"].map(txt => (
              <a key={txt} href="#/procedure"
                style={{ fontSize: "12px", color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#0f172a"}
                onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}
              >{txt}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .footer-top-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-top-grid { grid-template-columns: 1fr !important; }
        }
        footer { padding: 0 !important; }
      `}</style>
    </footer>
  );
};

export default Footer;

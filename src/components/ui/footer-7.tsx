import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Team", href: "/about#team" },
      { name: "Blog", href: "/news" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="w-5 h-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="w-5 h-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

export const Footer7 = ({
  logo = {
    url: "/",
    src: "/logo.png",
    alt: "logo",
    title: "Sortex Premium",
  },
  sections = defaultSections,
  description = "A collection of premium landscaping and architectural designs for your luxury space.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2024 Sortex Premium. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <footer className="py-20 bg-white border-t border-gray-100 font-sans">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-black">{logo.title}</span>
            </div>
            <p className="text-gray-500 text-[15px] leading-relaxed">
              {description}
            </p>
            <div className="flex items-center gap-5 text-gray-400">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  className="hover:text-black transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
            {sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-black font-bold mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a 
                        href={link.href} 
                        className="text-gray-500 hover:text-black transition-colors text-[15px]"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            {copyright}
          </p>
          <div className="flex items-center gap-8">
            {legalLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.href} 
                className="text-gray-500 hover:text-black transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

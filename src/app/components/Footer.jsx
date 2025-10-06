import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";

export default function Footer() {
  const footerLinks = [
    { text: "About Us", href: "/about" },
    { text: "Services", href: "/services" },
    { text: "Projects", href: "/projects" },
    { text: "Testimonials", href: "/testimonials" },
    { text: "Contact", href: "/contact" },
    { text: "Privacy Policy", href: "/privacy-policy" },
  ];

  const socials = [
    { icon: <FaLinkedin />, href: "https://www.linkedin.com", label: "LinkedIn" },
    { icon: <BsTwitterX />, href: "https://www.twitter.com", label: "Twitter" },
    { icon: <FaInstagram />, href: "https://www.instagram.com", label: "Instagram" },
    { icon: <FaFacebook />, href: "https://www.facebook.com", label: "Facebook" },
    { icon: <FaYoutube />, href: "https://www.youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="bg-indigo-900 text-white py-2 px-2 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo and Social Icons */}
        <div className="space-y-4 text-center md:text-left">
          <Link href="/">
            <img
              src="/Lemtech logo.jpg"
              alt="Lemtech Hub Nigeria logo"
              width={100}
              className="mx-auto md:mx-0"
            />
          </Link>
          <div className="flex gap-4 justify-center mt-5 md:justify-start text-2xl">
            {socials.map((social, index) => (
              <Link
                href={social.href}
                key={index}
                aria-label={`Visit our ${social.label} page`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition-colors"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap gap-4 justify-center mt-6 md:justify-start">
          {footerLinks.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className="text-lg md:text-base hover:text-indigo-300 transition-colors"
            >
              {link.text}
            </Link>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="text-center md:text-right text-xs mt-6 md:text-sm">
          <p>
            © {new Date().getFullYear()} Lemtech Hub Nigeria.
            <br /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

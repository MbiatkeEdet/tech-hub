"use client";
import { useState } from "react";
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
    { text: "Services", href: "/services" },
    { text: "Projects", href: "/projects" },
    { text: "Testimonials", href: "/testimonials" },
    { text: "Contact", href: "/contact" },
  ];

  return (
    <header className="text-base">
      <nav className=" fixed top-0 left-0 w-full z-30 flex justify-between text-white bg-indigo-900 font-light hover:text-yellow-300 items-center py-2 px-4 md:px-12">
        <Link href="/">
          <img
            src="Lemtech logo.jpg"
            alt="lemtechlogo logo"
            className="w-10 md:w-10"
          />
        </Link>

        <div className="hidden md:flex md:items-center">
          <ul className="flex gap-8">
            {navItems.map((page, index) => (
              <li key={index}>
                <Link href={page.href}>{page.text}</Link>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="block md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col items-start gap-4 px-6 py-4 bg-white shadow-md">
            {navItems.map((page, index) => (
              <li key={index}>
                <Link href={page.href}>{page.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

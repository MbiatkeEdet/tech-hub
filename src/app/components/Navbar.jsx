"use client";
import { useState } from "react";
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
    { text: "Contact", href: "/contact" },
  ];

  return (
    <header className="text-base">
      <nav className="flex justify-between text-3xl font-bold italic items-center py-4 px-6 md:px-12">
        <Link href="/">
          <img
            src="Lemtech logo.jpg"
            alt="lemtechlogo logo"
            className="w-28 md:w-36"
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

        <div className="hidden md:flex gap-4">
          <Link href="/login">
            <button className="py-2 rounded-lg">Login</button>
          </Link>
          <Link href="/signup">
            <button className="px-6 py-2 rounded-xl bg-[#FFD700]">
              Sign Up
            </button>
          </Link>
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
            <div className="flex flex-col gap-4 w-full">
              <Link href="/login">
                <button className="py-2 rounded-lg w-full">Login</button>
              </Link>
              <Link href="/signup">
                <button className="py-2 rounded-xl bg-[#FFD700] w-full">
                  Sign Up
                </button>
              </Link>
            </div>
          </ul>
        </div>
      )}
    </header>
  );
}

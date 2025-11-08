"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
export default function PartnershipPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
  };

  return (
    
    <div className="flex flex-col items-center w-full min-h-screen text-gray-800">
        <Navbar />
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-blue-900 to-indigo-600 text-white py-20 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Collaborate. Build. Empower.
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Join <span className="font-semibold">Lemtech Hub</span> in shaping
            Africa’s digital future. We collaborate with forward-thinking
            partners to create scalable, human-centered software solutions.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-800 mt-4 mb-6 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Learn More
            </button>
            <button className="bg-indigo-500 text-white border mb-6 border-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition">
              Partner With Us
            </button>
          </div>
        </div>

        {/* Decorative Images */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6 opacity-90 mt-8">
          <Image
            src="/images/lemtech-team1.jpg"
            alt="Lemtech team"
            width={150}
            height={100}
            className="rounded-lg shadow-lg"
          />
          <Image
            src="/images/lemtech-team2.jpg"
            alt="Lemtech workspace"
            width={150}
            height={100}
            className="rounded-lg shadow-lg"
          />
          <Image
            src="/images/lemtech-team3.jpg"
            alt="Developers working"
            width={150}
            height={100}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Partner with Lemtech Hub */}
      <section className="py-20 bg-gray-50 w-full text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Partner with Lemtech Hub</h2>
          <p className="text-lg text-gray-600 mb-8">
            We believe technology is a bridge to transformation. Through{" "}
            <strong>custom software development</strong>,{" "}
            <strong>technical partnerships</strong>, and{" "}
            <strong>mentorship programs</strong>, we empower startups,
            enterprises, and tech talents to grow and scale.
          </p>
          <p className="text-gray-700 mb-8">
            Whether you are an investor, business leader, or ecosystem builder,
            we’re excited to collaborate and build the next generation of
            impactful digital solutions.
          </p>
          <button className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition">
            Let’s Build Together
          </button>
        </div>
      </section>

      {/* Contact Form */}
      <section className="w-full py-20 bg-white px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Let’s Hear From You</h2>
          <p className="text-gray-600 mb-10">
            Have a project in mind or want to explore partnership opportunities?
            Let’s connect and make innovation happen.
          </p>

          <form onSubmit={handleSubmit} className="grid gap-6 text-left">
            <div>
              <label className="block mb-2 font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Message</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us how you'd like to collaborate..."
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="w-full bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Partner With Lemtech Hub
          </h2>

          {/* Custom Software Solutions */}
          <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
            <Image
              src="/images/software-dev.jpg"
              alt="Custom Software Development"
              width={500}
              height={350}
              className="rounded-xl shadow-md"
            />
            <div>
              <h3 className="text-2xl font-semibold mb-3">
                Custom Software Solutions
              </h3>
              <p className="text-gray-600 mb-4">
                We build tailored software that aligns with your vision — from
                web apps to enterprise systems. Our approach is agile, scalable,
                and user-focused.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Web & Mobile Application Development</li>
                <li>• API Integration & Automation</li>
                <li>• Product Design & UI/UX Strategy</li>
              </ul>
            </div>
          </div>

          {/* Mentorship & Talent Development */}
          <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-3">
                Mentorship & Talent Development
              </h3>
              <p className="text-gray-600 mb-4">
                We nurture the next generation of software engineers through
                mentorship, internship programs, and hands-on project exposure.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Sponsor or mentor young developers</li>
                <li>• Partner with our internship & learning programs</li>
                <li>• Support tech inclusion and digital skill initiatives</li>
              </ul>
            </div>
            <Image
              src="/images/mentorship-dev.jpg"
              alt="Mentorship Program"
              width={500}
              height={350}
              className="rounded-xl shadow-md"
            />
          </div>

          {/* Strategic Tech Partnerships */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <Image
              src="/partnership.jpg"
              alt="Strategic Tech Partnerships"
              width={500}
              height={350}
              className="rounded-xl shadow-md"
            />
            <div>
              <h3 className="text-2xl font-semibold mb-3">
                Strategic Tech Partnerships
              </h3>
              <p className="text-gray-600 mb-4">
                Collaborate with Lemtech Hub for product innovation, digital
                transformation, and technical consulting.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Joint product development or co-building</li>
                <li>• Access to a network of developers and tech advisors</li>
                <li>
                  • Strengthen your digital infrastructure with expert support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

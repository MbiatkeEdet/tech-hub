"use client";
import React from "react";
import { FaLaptopCode, FaIndustry, FaLightbulb, FaProjectDiagram } from "react-icons/fa";
import { MdScience } from "react-icons/md";
import Navbar from "../components/Navbar";

const AboutUs = () => {
  return (
    <>
    <Navbar />
    <section className="text-gray-800">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center text-white py-20 px-6"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523531294911-5fd93221c4fe?auto=format&fit=crop&w=1600&q=80')" }}
      >
        <div className="max-w-4xl mx-auto mt-16 text-center space-y-6 bg-black/40 p-6 rounded-2xl">
          <h1 className="text-3xl md:text-5xl font-bold">
            We develop world-changing ideas. <br /> With passion. For impact.
          </h1>
          <p className="text-lg md:text-xl">
            Our team lives and breathes tech 7 days a week.
          </p>
        </div>
      </div>

      {/* Team Identity */}
      <div className="py-16 px-6 mb-5 bg-gray-100">
        <div className="max-w-6xl mb-5 mx-auto text-center space-y-4">
          <h2 className="text-2xl mb-6 md:text-4xl uppercase font-semibold">About Us</h2>
          <p className="max-w-3xl mx-auto text-lg">
            We are a team of dedicated designers, developers, and business
            strategists delivering powerful digital solutions from the city of Port
            Harcourt, Nigeria. Our mission is to create innovative products that
            drive growth and make a positive impact on businesses and communities
          </p>
        </div>
      </div>

      {/* Product Development */}
      <div className="py-16 px-6 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="text-white space-y-4 bg-black/50 p-6 rounded-2xl">
            <FaLaptopCode size={40} className="text-yellow-400" />
            <h3 className="text-2xl font-semibold">Product Development Focus</h3>
            <p>
              We build beautiful and user-friendly web and mobile products.
              With over a decade of experience across startups and global
              corporations, we deliver solutions with speed and precision.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80"
              alt="Development Team"
            />
          </div>
        </div>
      </div>

      {/* Industries */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
              alt="Industries"
            />
          </div>
          <div className="space-y-4">
            <FaIndustry size={40} className="text-blue-600" />
            <h3 className="text-2xl font-semibold">Traditional Industries</h3>
            <p>
              Our expertise spans forestry, energy, entertainment, flower
              wholesale, and more—bringing innovative and user-friendly digital
              solutions to industries not yet touched by today’s technologies.
            </p>
          </div>
        </div>
      </div>

      {/* Cutting Edge */}
      <div
        className="py-16 px-6 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80')" }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center bg-black/50 p-6 rounded-2xl">
          <div className="space-y-4">
            <MdScience size={40} className="text-green-400" />
            <h3 className="text-2xl font-semibold">Always on the Cutting Edge</h3>
            <p>
              Our team stays ahead of the curve by following the latest global
              tech trends in big data, AI, biotechnology, materials, and more.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=800&q=80"
              alt="Innovation"
            />
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <FaProjectDiagram size={40} className="text-purple-600 mx-auto" />
          <h3 className="text-2xl font-semibold">Our Process</h3>
          <p className="max-w-3xl mx-auto">
            We’ve designed a unique way of working with partners—offering maximum
            value through our combined experience with both startups and
            corporations. It’s efficient, collaborative, and impactful.
          </p>
        </div>
      </div>
    </section>
    </>
  );
};

export default AboutUs;

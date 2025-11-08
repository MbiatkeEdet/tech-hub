"use client";
import React from "react";
import Navbar from "../components/Navbar";

const landingPages = [
  {
    title: "Chioma & Mbiatke Wedding",
    image: "/images/chioma-mbiatke.png",
    description:
      "A romantic wedding website with RSVP, gallery, and gift registry built with Next.js and Firebase.",
    url: "https://chioma-mbiatke.vercel.app",
  },
  {
    title: "Finear",
    image: "/images/kate-edidiong.png",
    description:
      "An AI powered platform for personalized learning experiences.",
    url: "https://finear.app",
  },
  {
    title: "Smart Road App",
    image: "/images/smart-road-app.png",
    description:
      "A mobile app providing real-time traffic updates, route optimization, and user-friendly navigation.",
    url: "https://smart-road-app.vercel.app",
  },
  {
    title: "Confiable Enterprise Software",
    image: "/images/lemtech-hub.png",
    description:
      "Enterprise software solutions for reliable and efficient business operations.",
    url: "https://lemtechhub.netlify.app",
  },
];

const LandingPagesShowcase = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-5 mt-6 text-gray-800">
          Our Projects
        </h1>
        <p className="text-center text-2xl text-gray-600 mb-8">
          Explore our diverse range of projects, each showcasing unique features and technologies.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {landingPages.map((page, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={page.image}
                alt={page.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800">
                  {page.title}
                </h2>
                <p className="text-gray-600 mt-2 text-sm">{page.description}</p>
                <a
                  href={page.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-600 font-medium hover:underline"
                >
                  Visit Site →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LandingPagesShowcase;

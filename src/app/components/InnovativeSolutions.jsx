// import React from "react";
// import { FaLink, FaMobileAlt, FaGlobe, FaCogs } from "react-icons/fa";

// const InnovativeSolutions = () => {
//   const solutions = [
//     {
//       title: "Blockchain",
//       description:
//         "Secure and transparent solutions leveraging blockchain for trust, efficiency, and scalability.",
//       icon: <FaLink className="text-indigo-500 text-3xl" />,
//     },
//     {
//       title: "Mobile Development",
//       description:
//         "High-performing mobile apps designed to enhance user experiences and drive business growth.",
//       icon: <FaMobileAlt className="text-green-500 text-3xl" />,
//     },
//     {
//       title: "Web Development",
//       description:
//         "Modern, responsive, and scalable web applications tailored to your business needs.",
//       icon: <FaGlobe className="text-blue-500 text-3xl" />,
//     },
//     {
//       title: "Custom Solutions",
//       description:
//         "Tailored software and integrations to solve unique challenges and unlock new opportunities.",
//       icon: <FaCogs className="text-yellow-500 text-3xl" />,
//     },
//   ];

//   return (
//     <section className="bg-white dark:bg-gray-900 px-6 py-20">
//       <div className="max-w-6xl mx-auto text-center mb-12">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
//           Innovative Solutions
//         </h2>
//         <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//           We leverage the latest technologies to deliver scalable, impactful, and
//           future-ready solutions for businesses of all sizes.
//         </p>
//       </div>

//       {/* Grid Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
//         {solutions.map((solution, index) => (
//           <div
//             key={index}
//             className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition"
//           >
//             <div className="flex justify-center mb-4">{solution.icon}</div>
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//               {solution.title}
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-300">
//               {solution.description}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default InnovativeSolutions;
// "use client"
// import React from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";

// // Simple reusable 3D Shape component
// const SpinningShape = ({ color = "hotpink", shape = "box" }) => {
//   return (
//     <mesh rotation={[0.5, 0.5, 0]}>
//       {shape === "box" && <boxGeometry args={[1, 1, 1]} />}
//       {shape === "sphere" && <sphereGeometry args={[0.75, 32, 32]} />}
//       {shape === "cone" && <coneGeometry args={[0.7, 1, 32]} />}
//       {shape === "torus" && <torusGeometry args={[0.7, 0.2, 16, 100]} />}
//       <meshStandardMaterial color={color} />
//     </mesh>
//   );
// };

// const InnovativeSolutions = () => {
//   const solutions = [
//     {
//       title: "Blockchain",
//       description:
//         "Secure and transparent solutions leveraging blockchain for trust, efficiency, and scalability.",
//       shape: "box",
//       color: "#6366F1", // indigo
//     },
//     {
//       title: "Mobile Development",
//       description:
//         "High-performing mobile apps designed to enhance user experiences and drive business growth.",
//       shape: "sphere",
//       color: "#22C55E", // green
//     },
//     {
//       title: "Web Development",
//       description:
//         "Modern, responsive, and scalable web applications tailored to your business needs.",
//       shape: "torus",
//       color: "#3B82F6", // blue
//     },
//     {
//       title: "Custom Solutions",
//       description:
//         "Tailored software and integrations to solve unique challenges and unlock new opportunities.",
//       shape: "cone",
//       color: "#FACC15", // yellow
//     },
//   ];

//   return (
//     <section className="bg-white dark:bg-gray-900 px-6 py-20">
//       <div className="max-w-6xl mx-auto text-center mb-12">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
//           Innovative Solutions
//         </h2>
//         <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//           We leverage the latest technologies to deliver scalable, impactful, and
//           future-ready solutions for businesses of all sizes.
//         </p>
//       </div>

//       {/* Grid Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
//         {solutions.map((solution, index) => (
//           <div
//             key={index}
//             className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center"
//           >
//             {/* 3D Canvas */}
//             <div className="w-32 h-32 mb-4">
//               <Canvas camera={{ position: [2, 2, 3], fov: 45 }}>
//                 <ambientLight intensity={0.6} />
//                 <directionalLight position={[5, 5, 5]} />
//                 <SpinningShape shape={solution.shape} color={solution.color} />
//                 <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
//               </Canvas>
//             </div>

//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//               {solution.title}
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
//               {solution.description}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default InnovativeSolutions;
"use client"
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

// 3D Shape
const Shape = ({ shape = "box", color = "hotpink" }) => (
  <mesh rotation={[0.5, 0.5, 0]}>
    {shape === "box" && <boxGeometry args={[1, 1, 1]} />}
    {shape === "sphere" && <sphereGeometry args={[0.75, 32, 32]} />}
    {shape === "cone" && <coneGeometry args={[0.7, 1, 32]} />}
    {shape === "torus" && <torusGeometry args={[0.7, 0.2, 16, 100]} />}
    <meshStandardMaterial color={color} />
  </mesh>
);

const InnovativeSolutions = () => {
  const solutions = [
    {
      title: "Blockchain",
      description:
        "Secure and transparent solutions leveraging blockchain for trust, efficiency, and scalability.",
      shape: "box",
      color: "#6366F1",
    },
    {
      title: "Mobile Development",
      description:
        "High-performing mobile apps designed to enhance user experiences and drive business growth.",
      shape: "sphere",
      color: "#22C55E",
    },
    {
      title: "Web Development",
      description:
        "Modern, responsive, and scalable web applications tailored to your business needs.",
      shape: "torus",
      color: "#3B82F6",
    },
    {
      title: "Custom Solutions",
      description:
        "Tailored software and integrations to solve unique challenges and unlock new opportunities.",
      shape: "cone",
      color: "#FACC15",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 px-6 py-20">
      <div className="max-w-6xl mx-auto text-center mb-12">
        {/* Animated Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-montserrat font-bold text-gray-900 dark:text-white"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <span className="bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 bg-clip-text text-4xl font-bold italic text-block text-transparent drop-shadow-md">
            Innovative Solutions
          </span>
        </motion.h2>

        {/* Animated Subtext */}
        <motion.p
          className="mt-4 text-3xl text-gray-600 font-montserrat dark:text-gray-300 max-w-3xl mx-auto"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          We leverage the latest technologies to deliver scalable, impactful, and
          future-ready solutions for businesses of all sizes.
        </motion.p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {solutions.map((solution, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center"
          >
            {/* 3D Canvas */}
            <div className="w-32 h-32 mb-4">
              <Canvas camera={{ position: [2, 2, 3], fov: 45 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} />
                <Shape shape={solution.shape} color={solution.color} />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
              </Canvas>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {solution.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              {solution.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InnovativeSolutions;

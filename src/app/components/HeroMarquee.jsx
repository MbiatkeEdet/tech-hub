// "use client";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { motion } from "framer-motion";
// import Counter from "./Counter";

// // Cube Shape
// const Cube = () => (
//   <mesh>
//     <boxGeometry args={[0.9, 0.9, 0.9]} />
//     <meshStandardMaterial color="hotpink" />
//   </mesh>
// );

// // Sphere Shape
// const Sphere = () => (
//   <mesh>
//     <sphereGeometry args={[0.35, 32, 32]} />
//     <meshStandardMaterial color="skyblue" />
//   </mesh>
// );

// // Torus Shape
// const Torus = () => (
//   <mesh>
//     <torusGeometry args={[0.4, 0.15, 16, 100]} />
//     <meshStandardMaterial color="limegreen" />
//   </mesh>
// );

// export default function HeroMarquee() {
//   const items = [
//     { text: "Inspire.", Shape: Cube },
//     { text: "Create.", Shape: Sphere },
//     { text: "Innovate.", Shape: Torus },
//   ];

//   return (
//     <div className="text-center mt-3 overflow-hidden">
//       {/* Stats Section */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-6 items-center max-w-7xl mx-auto mb-10">
//         <div>
//           <h2 className="text-5xl font-montserrat font-bold text-gray-900 dark:text-white">
//             <Counter to={4} />+
//           </h2>
//           <p className="text-3xl text-gray-600 font-bold italic dark:text-gray-300">
//             Years of Experience
//           </p>
//         </div>
//         <div>
//           <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
//             <Counter to={5} />+
//           </h2>
//           <p className="text-3xl text-gray-600 font-bold italic dark:text-gray-300">
//             Team Members
//           </p>
//         </div>
//         <div>
//           <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
//             <Counter to={15} />+
//           </h2>
//           <p className="text-3xl text-gray-600 font-bold italic dark:text-gray-300">
//             Projects Completed
//           </p>
//         </div>
//       </div>

//       {/* Marquee Section */}
//       <motion.div
//         className="inline-flex gap-10 items-center"
//         animate={{ x: ["100%", "-100%"] }}
//         transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
//       >
//         {[...items, ...items].map(({ text, Shape }, idx) => (
//           <div key={idx} className="flex items-center gap-2">
//             {/* 3D Icon */}
//             <div className="w-24 h-24 md:w-40 md:h-40">
//               <Canvas camera={{ position: [2, 2, 2] }}>
//                 <ambientLight intensity={0.6} />
//                 <directionalLight position={[2, 2, 2]} />
//                 <Shape />
//                 <OrbitControls
//                   enableZoom={false}
//                   enablePan={false}
//                   autoRotate
//                   autoRotateSpeed={3}
//                 />
//               </Canvas>
//             </div>

//             {/* Text */}
//             <h2 className="text-5xl font-bold mt-2 text-gray-900 dark:text-white">
//               {text}
//             </h2>
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

"use client";
import { motion } from "framer-motion";
import Counter from "./Counter";

export default function HeroMarquee() {
  const items = [
    { text: "Inspire.", color: "bg-gradient-to-br from-pink-500 to-fuchsia-600" },
    { text: "Create.", color: "bg-gradient-to-br from-sky-400 to-blue-600" },
    { text: "Innovate.", color: "bg-gradient-to-br from-green-400 to-emerald-600" },
  ];

  return (
    <div className="text-center mt-3 overflow-hidden">
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-6 items-center max-w-7xl mx-auto mb-10">
        <div>
          <h2 className="text-5xl font-montserrat font-bold text-gray-900 dark:text-white">
            <Counter to={4} />+
          </h2>
          <p className="text-3xl text-gray-600 font-bold italic dark:text-gray-300">
            Years of Experience
          </p>
        </div>
        <div>
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
            <Counter to={5} />+
          </h2>
          <p className="text-3xl text-gray-600 font-bold italic dark:text-gray-300">
            Team Members
          </p>
        </div>
        <div>
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
            <Counter to={15} />+
          </h2>
          <p className="text-3xl text-gray-600 font-bold italic dark:text-gray-300">
            Projects Completed
          </p>
        </div>
      </div>

      {/* Marquee Section */}
      <motion.div
        className="inline-flex gap-10 items-center"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...items, ...items].map(({ text, color }, idx) => (
          <div key={idx} className="flex items-center gap-4">
            {/* Animated 3D-style Shape */}
            <motion.div
              className={`w-20 h-20 md:w-20 md:h-20 rounded-2xl shadow-lg ${color}`}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: { repeat: Infinity, duration: 8, ease: "linear" },
                scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
              }}
            ></motion.div>

            {/* Text */}
            <h2 className="text-5xl font-bold mt-2 text-gray-900 dark:text-white">
              {text}
            </h2>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

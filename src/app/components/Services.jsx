// "use client";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function Services() {
  

//   return (
//     <div className="bg-gradient-to-b from-yellow-50 to-yellow-50">
//       {/* How It Works Section */}
//       <section className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">How It Works</h2>
//             <p className="text-gray-600 max-w-3xl mx-auto">
//               Our platform combines AI-powered learning tools with blockchain rewards to create a revolutionary educational experience.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 number: "01",
//                 title: "Connect Your Wallet",
//                 desc: "Link your Solana wallet to start earning rewards for academic achievements."
//               },
//               {
//                 number: "02",
//                 title: "Use AI Tools",
//                 desc: "Leverage our suite of AI-powered learning assistants to improve your academic performance."
//               },
//               {
//                 number: "03",
//                 title: "Earn Rewards",
//                 desc: "Complete goals and milestones to earn tokens you can exchange or use within our ecosystem."
//               }
//             ].map((step, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white p-8 rounded-xl shadow-md relative overflow-hidden"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.2, duration: 0.6 }}
//                 viewport={{ once: true }}
//               >
//                 <div className="text-6xl font-bold text-indigo-100 absolute -top-2 -right-2">
//                   {step.number}
//                 </div>
//                 <h3 className="text-xl font-bold text-indigo-900 mb-4 relative z-10">
//                   {step.title}
//                 </h3>
//                 <p className="text-gray-600 relative z-10">{step.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 px-6 bg-gradient-to-b from-yellow-500 to-indigo-700 overflow-hidden">
//         <div className="max-w-7xl mx-auto">
          
//           <motion.div
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
//     <div className="absolute w-[500px] h-[500px] rounded-full bg-center animate-rotate"
//          style={{
//            backgroundImage: 'url(/herogirl.png)', // Replace with your image path
//            backgroundSize: 'contain',
//            opacity: 0.1,
//          }}
//     ></div>
//   </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//               UTILITY
//             </h2>
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">$FIN TOKEN</h2>
//             <p className="text-indigo-200 text-2xl max-w-3xl mx-auto">
//               Launched fairly, $FIN fuels our ecosystem, rewarding users for academic achievements and providing access to premium features.
//             </p>
//             <p className="text-indigo-200 text-2xl max-w-3xl mx-auto">
//               The $FIN token is your key to unlocking exclusive features, content, and rewards within the Finear ecosystem.
//             </p>
//           </motion.div>

//           <motion.div
//             className="text-center mt-12"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6, duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             {/* <Link href="/signup">
//               <button className="px-8 py-3 bg-yellow-400 text-indigo-900 font-semibold rounded-lg hover:bg-yellow-300 transition">
//                 Join Finear Today
//               </button>
//             </Link> */}
//             <Link href="#">
//               <button className="px-8 py-3 bg-yellow-400 text-indigo-900 font-semibold rounded-lg hover:bg-yellow-300 transition">
//                 Coming soon
//               </button>
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";
import { Brain, Cog, Code } from "lucide-react"; // icons

export default function Services() {
  const services = [
    {
      icon: <Brain className="w-10 h-10 text-blue-500" />,
      title: "Artificial Intelligence",
      desc: "Leverage AI to unlock smarter insights, enhance decision-making, and drive innovation.",
    },
    {
      icon: <Cog className="w-10 h-10 text-green-500" />,
      title: "Automation & Integrations",
      desc: "Streamline workflows, reduce manual effort, and connect systems seamlessly for peak efficiency.",
    },
    {
      icon: <Code className="w-10 h-10 text-purple-500" />,
      title: "Custom Software Development",
      desc: "Build tailored solutions designed to meet your unique business needs and scale with growth.",
    },
  ];

  return (
    <section className="bg-gray-500 rounded-lg mb-5 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
          Outperform Competition with Digital Technologies
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

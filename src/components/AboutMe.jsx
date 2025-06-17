import React from "react";
import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <motion.div
      className="max-w-5xl mx-auto px-6 py-12 text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-400">👨‍💻 About Me</h1>
      <div className="bg-gray-800 rounded-2xl shadow-xl p-6 space-y-4">
        <p className="text-lg leading-relaxed">
          Hi! I’m <span className="font-semibold text-indigo-300">Anirban Routh</span>, a passionate developer currently pursuing my <span className="text-indigo-300">Master’s in Computer Applications (MCA)</span>. My journey in tech began with curiosity and evolved into a deep enthusiasm for building interactive, meaningful tools that help others understand complex topics.
        </p>

        <p className="text-lg leading-relaxed">
          Over time, I’ve dived into <span className="text-yellow-300 font-semibold">Data Structures and Algorithms</span> not just as a subject, but as a way to strengthen problem-solving skills and think like a true engineer. This led me to build this <span className="text-green-400 font-semibold">DSA Visualizer</span> project — a practical demonstration of how I merge logic, UI/UX, and creativity.
        </p>

        <p className="text-lg leading-relaxed">
          <span className="font-semibold text-blue-300">What Drives Me:</span><br />
          ✦ Crafting visual and intuitive learning tools<br />
          ✦ Solving problems through code<br />
          ✦ Exploring front-end technologies like React & Tailwind CSS<br />
          ✦ Learning by doing — building projects to reinforce concepts
        </p>

        <p className="text-lg leading-relaxed">
          <span className="font-semibold text-purple-300">What I’ve Built Here:</span><br />
          From <span className="text-orange-300">Linked Lists</span> to <span className="text-orange-300">Trees</span>, <span className="text-orange-300">Graphs</span> to <span className="text-orange-300">Min-Heaps</span> — each visualizer reflects my understanding of both the theory and implementation of core DSA topics. I’ve added traversal animations, memory layout visuals, and interactive controls to ensure users can engage with data structures the same way I learned — by doing.
        </p>

        <p className="text-lg leading-relaxed">
          <span className="font-semibold text-pink-400">Goal:</span><br />
          To become a developer who not only codes but explains — who not only builds projects but builds <span className="italic text-pink-300">experiences</span>. I'm working toward opportunities where I can grow as a full-stack or front-end developer, contribute to open-source, and stay on the cutting edge of the web.
        </p>

        <p className="text-lg text-center text-green-300 font-semibold pt-4">
          Thanks for stopping by!
        </p>
      </div>
    </motion.div>
  );
};

export default AboutMe;

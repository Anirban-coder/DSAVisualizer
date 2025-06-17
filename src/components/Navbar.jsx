import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StackVisualizer from "./components/StackVisualizer";
import QueueVisualizer from "./components/QueueVisualizer";
import TreeVisualizer from "./components/TreeVisualizer";
import GraphVisualizer from "./components/GraphVisualizer";
import MinHeapVisualizer from "./components/MinHeapVisualizer";

const Navbar = () => (
  <nav className="bg-gray-900 text-white p-4 flex flex-wrap gap-4 justify-center shadow-md">
    <Link to="/" className="hover:text-yellow-400">Home</Link>
    <Link to="/stack" className="hover:text-yellow-400">Stack</Link>
    <Link to="/queue" className="hover:text-yellow-400">Queue</Link>
    <Link to="/tree" className="hover:text-yellow-400">Tree</Link>
    <Link to="/graph" className="hover:text-yellow-400">Graph</Link>
    <Link to="/minheap" className="hover:text-yellow-400">MinHeap</Link>
    <Link to="/about" className="hover:text-yellow-400">About</Link>
  </nav>
);

const Home = () => (
  <div className="text-center p-10 text-white">
    <h1 className="text-4xl font-bold mb-4">Welcome to the DSA Visualizer 🚀</h1>
    <p className="text-lg max-w-xl mx-auto">
      This platform helps you understand core Data Structures and Algorithms visually using animations and pointer paths. Navigate to any section to get started!
    </p>
  </div>
);

const About = () => (
  <div className="text-white p-10 max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold mb-4">About Me</h2>
    <p className="mb-2">
      Hi! I'm Anirban Routh, an MCA student with a passion for Data Structures and web development. This project is a part of my journey in mastering front-end development with React and visualizing complex DSA concepts in an interactive way.
    </p>
    <p>
      Feel free to explore each section and check how the data flows, nodes get inserted or deleted, and graphs are traversed with animation.
    </p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-800">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stack" element={<StackVisualizer />} />
          <Route path="/queue" element={<QueueVisualizer />} />
          <Route path="/tree" element={<TreeVisualizer />} />
          <Route path="/graph" element={<GraphVisualizer />} />
          <Route path="/minheap" element={<MinHeapVisualizer />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

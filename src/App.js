import React, { useState } from "react";
import StackVisualizer from "./components/StackVisualizer";
import QueueVisualizer from "./components/QueueVisualizer";
import LinkedListVisualizer from "./components/LinkedListVisualizer";
import TreeVisualizer from "./components/TreeVisualizer";
import MinHeapVisualizer from './components/MinHeapVisualizer';
import GraphVisualizar from './components/GraphVisualizar';
import AboutMe from './components/AboutMe';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TrieVisualizer from "./components/TrieVisualizer";
import HashTableVisualizer from "./components/HashTableVisualizer";
import SortingVisualizer from './components/SortingVisualizer';

function App() {
  const [currentView, setCurrentView] = useState("stack");

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold mb-4">DSA Visualizer</h1>

        {/* Nav Buttons */}
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          <button onClick={() => setCurrentView("stack")} className={`px-4 py-2 rounded ${currentView === "stack" ? "bg-blue-600" : "bg-gray-700"}`}>Stack</button>
          <button onClick={() => setCurrentView("queue")} className={`px-4 py-2 rounded ${currentView === "queue" ? "bg-blue-600" : "bg-gray-700"}`}>Queue</button>
          <button onClick={() => setCurrentView("linkedlist")} className={`px-4 py-2 rounded ${currentView === "linkedlist" ? "bg-blue-600" : "bg-gray-700"}`}>Linked List</button>
          <button onClick={() => setCurrentView("tree")} className={`px-4 py-2 rounded ${currentView === "tree" ? "bg-blue-600" : "bg-gray-700"}`}>Tree</button>
          <button onClick={() => setCurrentView("minheap")} className={`px-4 py-2 rounded ${currentView === "minheap" ? "bg-blue-600" : "bg-gray-700"}`}>Min Heap</button>
          <button onClick={() => setCurrentView("graph")} className={`px-4 py-2 rounded ${currentView === "graph" ? "bg-blue-600" : "bg-gray-700"}`}>Graph</button>
          <button onClick={() => setCurrentView("trie")} className={`px-4 py-2 rounded ${currentView === "trie" ? "bg-blue-600" : "bg-gray-700"}`}>Trie</button>
          <button onClick={() => setCurrentView("hash")} className={`px-4 py-2 rounded ${currentView === "hash" ? "bg-blue-600" : "bg-gray-700"}`}>HashTable</button>
          <button onClick={() => setCurrentView("sorting")} className={`px-4 py-2 rounded ${currentView === "sorting" ? "bg-blue-600" : "bg-gray-700"}`}>Sorting</button>

          {/* Link to About Page */}
          <Link to="/about" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded">About Me</Link>
        </div>

        {/* Conditional Rendering for DSA Visualizers */}
        {currentView === "stack" && <StackVisualizer />}
        {currentView === "queue" && <QueueVisualizer />}
        {currentView === "linkedlist" && <LinkedListVisualizer />}
        {currentView === "tree" && <TreeVisualizer />}
        {currentView === "minheap" && <MinHeapVisualizer />}
        {currentView === "graph" && <GraphVisualizar />}
        {currentView === "trie" && <TrieVisualizer/>}   
        {currentView === "hash" && <HashTableVisualizer/>}
        {currentView === "sorting" && <SortingVisualizer />}

        {/* Route-based rendering for About Page */}
        <Routes>
          <Route path="/about" element={<AboutMe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
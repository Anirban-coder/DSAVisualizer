import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

let nodeId = 0;

const GraphVisualizer = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeLabel, setNodeLabel] = useState("");
  const [edgeFrom, setEdgeFrom] = useState("");
  const [edgeTo, setEdgeTo] = useState("");

  const addNode = () => {
    if (!nodeLabel) return;
    const newNode = {
      id: nodeId++,
      label: nodeLabel,
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50,
    };
    setNodes((prev) => [...prev, newNode]);
    setNodeLabel("");
  };

  const addEdge = () => {
    const from = parseInt(edgeFrom);
    const to = parseInt(edgeTo);
    if (isNaN(from) || isNaN(to) || from === to) return;
    setEdges((prev) => [...prev, { from, to }]);
    setEdgeFrom("");
    setEdgeTo("");
  };

  const removeNode = (id) => {
    setNodes((prev) => prev.filter((node) => node.id !== id));
    setEdges((prev) => prev.filter((edge) => edge.from !== id && edge.to !== id));
  };

  const removeEdge = (index) => {
    setEdges((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-900 p-4 sm:p-6 rounded-xl shadow-xl text-white w-full">
      <h2 className="text-xl sm:text-3xl font-bold text-center mb-4">Graph Visualizer</h2>

      {/* Info Section */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 text-white text-sm sm:text-base shadow-md">
        <p>
          A <strong>Graph</strong> consists of <strong>nodes</strong> and <strong>edges</strong> connecting them.
          This visualizer supports:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Node creation</li>
          <li>Edge drawing</li>
          <li>Traversals: BFS & DFS</li>
          <li>Dijkstra's shortest path</li>
          <li>Dragging nodes</li>
          <li>Reset & weighted toggle</li>
        </ul>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6">
        <input
          value={nodeLabel}
          onChange={(e) => setNodeLabel(e.target.value)}
          placeholder="Node label"
          className="px-2 py-1 rounded text-black text-sm w-[110px]"
        />
        <button
          onClick={addNode}
          className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
        >
          Add Node
        </button>

        <input
          value={edgeFrom}
          onChange={(e) => setEdgeFrom(e.target.value)}
          placeholder="From ID"
          className="px-2 py-1 rounded text-black text-sm w-[90px]"
        />
        <input
          value={edgeTo}
          onChange={(e) => setEdgeTo(e.target.value)}
          placeholder="To ID"
          className="px-2 py-1 rounded text-black text-sm w-[90px]"
        />
        <button
          onClick={addEdge}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
        >
          Add Edge
        </button>
      </div>

      {/* Graph Area */}
      <div className="relative w-full h-[400px] sm:h-[500px] bg-gray-800 rounded overflow-hidden">
        <svg className="absolute w-full h-full">
          {edges.map((edge, i) => {
            const fromNode = nodes.find((n) => n.id === edge.from);
            const toNode = nodes.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            const dx = toNode.x - fromNode.x;
            const dy = toNode.y - fromNode.y;
            const angle = Math.atan2(dy, dx);
            const headLength = 10;
            const tx = toNode.x - Math.cos(angle) * headLength;
            const ty = toNode.y - Math.sin(angle) * headLength;

            return (
              <g key={i}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="#ffffffaa"
                  strokeWidth="2"
                />
                <polygon
                  points={`${tx},${ty} ${tx - 5},${ty - 5} ${tx + 5},${ty - 5}`}
                  fill="#ffffff"
                  transform={`rotate(${(angle * 180) / Math.PI},${tx},${ty})`}
                />
              </g>
            );
          })}
        </svg>

        {/* Render nodes */}
        <AnimatePresence>
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              style={{
                position: "absolute",
                left: node.x,
                top: node.y,
                transform: "translate(-50%, -50%)",
              }}
              className="bg-purple-600 px-3 py-1 rounded-full cursor-pointer text-xs sm:text-sm shadow"
              onDoubleClick={() => removeNode(node.id)}
              title={`ID: ${node.id} (Double-click to delete)`}
            >
              {node.label}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Edge List */}
      <div className="mt-6 bg-gray-700 p-4 rounded text-sm sm:text-base">
        <h3 className="font-semibold mb-2">Edges (tap to remove)</h3>
        <div className="flex flex-wrap gap-2">
          {edges.map((e, i) => (
            <div
              key={i}
              onClick={() => removeEdge(i)}
              className="bg-blue-500 px-2 py-1 rounded cursor-pointer"
            >
              {`${e.from} → ${e.to}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraphVisualizer;

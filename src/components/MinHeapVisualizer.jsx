import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper: Swap elements
const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

const MinHeapVisualizer = () => {
  const [heap, setHeap] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Insert with heapify up
  const insert = (val) => {
    const newHeap = [...heap, val];
    let i = newHeap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (newHeap[parent] > newHeap[i]) {
        swap(newHeap, i, parent);
        i = parent;
      } else break;
    }
    setHeap(newHeap);
  };

  // Delete min (root) with heapify down
  const deleteMin = () => {
    if (heap.length === 0) return;
    const newHeap = [...heap];
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();

    let i = 0;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let smallest = i;

      if (left < newHeap.length && newHeap[left] < newHeap[smallest]) smallest = left;
      if (right < newHeap.length && newHeap[right] < newHeap[smallest]) smallest = right;

      if (smallest !== i) {
        swap(newHeap, i, smallest);
        i = smallest;
      } else break;
    }
    setHeap(newHeap);
  };

  const handleInsert = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return alert("Enter a number");
    insert(val);
    setInputValue("");
  };

  const renderHeapTree = (index = 0) => {
    if (index >= heap.length) return null;

    const left = 2 * index + 1;
    const right = 2 * index + 2;

    return (
      <div className="flex flex-col items-center relative">
        <motion.div
          key={heap[index] + "-" + index}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="bg-purple-600 text-white px-4 py-2 rounded shadow-lg mb-4"
        >
          {heap[index]}
        </motion.div>

        <div className="flex gap-4">
          {renderHeapTree(left)}
          {renderHeapTree(right)}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Min-Heap Visualizer</h2>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          className="px-2 py-1 rounded text-black"
        />
        <button
          onClick={handleInsert}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Insert
        </button>
        <button
          onClick={deleteMin}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Min
        </button>
      </div>

      {/* Heap Tree */}
      <div className="mb-6 flex justify-center">{renderHeapTree()}</div>

      {/* Array View */}
      <div className="bg-gray-700 p-4 rounded">
        <h4 className="text-lg font-semibold mb-2">Array Representation</h4>
        <div className="flex flex-wrap gap-2">
          {heap.map((val, i) => (
            <div
              key={i}
              className="bg-indigo-500 px-3 py-1 rounded text-sm font-medium shadow"
            >
              {val}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MinHeapVisualizer;

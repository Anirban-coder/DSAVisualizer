import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [action, setAction] = useState("");

  const handleEnqueue = () => {
    if (inputValue.trim() !== "") {
      setQueue([...queue, inputValue]);
      setAction(`Enqueued "${inputValue}" into the queue.`);
      setInputValue("");
    }
  };

  const handleDequeue = () => {
    if (queue.length > 0) {
      const removed = queue[0];
      setQueue(queue.slice(1));
      setAction(`Dequeued "${removed}" from the queue.`);
    } else {
      setAction("Queue is already empty.");
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">📦 Queue Visualizer</h1>

      <div className="flex gap-2">
        <input
          type="text"
          className="px-3 py-2 text-black rounded-md focus:outline-none"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          onClick={handleEnqueue}
        >
          Enqueue
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          onClick={handleDequeue}
        >
          Dequeue
        </button>
      </div>

      <div className="flex gap-3 items-end overflow-x-auto max-w-full p-4">
        <AnimatePresence>
          {queue.map((item, index) => (
            <motion.div
              key={item + index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className={`w-24 h-24 flex items-center justify-center rounded bg-blue-500 relative text-lg font-semibold ${
                index === 0 || index === queue.length - 1 ? "border-4 border-yellow-400" : ""
              }`}
            >
              {item}
              {index === 0 && (
                <span className="absolute -top-6 text-sm text-yellow-400">Front</span>
              )}
              {index === queue.length - 1 && (
                <span className="absolute -bottom-6 text-sm text-yellow-400">Rear</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="bg-gray-800 p-4 rounded w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-2">🧠 Operation Info</h2>
        <p className="text-green-400">{action || "Try Enqueue or Dequeue!"}</p>
        <div className="mt-3 text-sm text-gray-300">
          <p>Queue follows FIFO (First In, First Out)</p>
          <p>Front = Oldest element</p>
          <p>Rear = Newest element</p>
        </div>
      </div>
    </div>
  );
};

export default QueueVisualizer;

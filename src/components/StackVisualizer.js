import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [action, setAction] = useState("");

  const handlePush = () => {
    if (inputValue.trim() !== "") {
      setStack([...stack, inputValue]);
      setAction(`Pushed "${inputValue}" onto the stack.`);
      setInputValue("");
    }
  };

  const handlePop = () => {
    if (stack.length > 0) {
      const popped = stack[stack.length - 1];
      setStack(stack.slice(0, -1));
      setAction(`Popped "${popped}" from the stack.`);
    } else {
      setAction("Stack is already empty.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 min-h-screen bg-gray-900 text-white">
      {/* Stack Visualizer */}
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">🧱 Stack Visualizer</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            className="px-3 py-2 text-black rounded-md focus:outline-none"
            placeholder="Enter value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            onClick={handlePush}
          >
            Push
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            onClick={handlePop}
          >
            Pop
          </button>
          <button
  className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
  onClick={() => {
    setStack([]);
    setAction("Stack cleared.");
  }}
>
  Clear
</button>

        </div>


        <div className="flex flex-col-reverse items-center gap-3 overflow-y-auto max-h-[50vh]">
          <AnimatePresence>
            {stack.map((item, index) => (
              <motion.div
                key={item + index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className={`w-40 text-center py-2 rounded shadow-md bg-blue-500 relative ${
                  index === stack.length - 1 ? "border-4 border-yellow-400" : ""
                }`}
              >
                {item}
                {index === stack.length - 1 && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-yellow-400">
                    Top
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="mt-4 text-gray-300 text-sm">
  <p>Stack Size: {stack.length}</p>
  <p>Top Value: {stack[stack.length - 1] || "None"}</p>
</div>
        </div>
      </div>

      {/* Explanation Panel */}
      <div className="flex-1 bg-gray-800 rounded-lg p-4 shadow-lg h-fit">
        <h2 className="text-2xl font-semibold mb-4">📘 Operation Details</h2>
        <p className="text-green-400">{action || "Try pushing or popping something!"}</p>

        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">🔍 Stack (LIFO)</h3>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
            <li>Last-In, First-Out structure</li>
            <li>Push adds an item to the top</li>
            <li>Pop removes the item from the top</li>
            <li>Empty stack = nothing to pop</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StackVisualizer;

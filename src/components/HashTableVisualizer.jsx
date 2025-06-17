import React, { useState } from "react";
import { motion } from "framer-motion";

const TABLE_SIZE = 7;

const createBucket = () => ({
  head: null,
});

const createNode = (key, next = null) => ({
  key,
  next,
  id: Math.random().toString(36).substr(2, 9),
});

const HashTableVisualizer = () => {
  const [table, setTable] = useState(Array(TABLE_SIZE).fill(null).map(createBucket));
  const [input, setInput] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [deleteKey, setDeleteKey] = useState("");
  const [highlighted, setHighlighted] = useState(null);
  const [explanation, setExplanation] = useState("Enter a number to insert into the hash table.");

  const hash = (key) => key % TABLE_SIZE;

  const insert = () => {
    const val = parseInt(input);
    if (isNaN(val)) return alert("Enter a valid number");
    const index = hash(val);
    const bucket = table[index];
    const newNode = createNode(val);
    newNode.next = bucket.head;
    bucket.head = newNode;
    setTable([...table]);
    setInput("");
    setExplanation(`Inserted ${val} at index ${index} using chaining.`);
  };

  const search = () => {
    const val = parseInt(searchKey);
    if (isNaN(val)) return alert("Enter a valid number");
    const index = hash(val);
    let current = table[index].head;
    while (current) {
      if (current.key === val) {
        setHighlighted(current.id);
        setExplanation(`Found ${val} at index ${index}.`);
        return;
      }
      current = current.next;
    }
    setHighlighted(null);
    setExplanation(`${val} not found in the hash table.`);
  };

  const remove = () => {
    const val = parseInt(deleteKey);
    if (isNaN(val)) return alert("Enter a valid number");
    const index = hash(val);
    let current = table[index].head;
    let prev = null;
    while (current) {
      if (current.key === val) {
        if (prev) {
          prev.next = current.next;
        } else {
          table[index].head = current.next;
        }
        setTable([...table]);
        setDeleteKey("");
        setHighlighted(null);
        setExplanation(`Deleted ${val} from index ${index}.`);
        return;
      }
      prev = current;
      current = current.next;
    }
    setExplanation(`${val} not found. Cannot delete.`);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-900 text-white rounded-xl shadow-xl w-full">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Hash Table Visualizer</h2>

      {/* Control Panel */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Insert value"
          className="px-2 py-1 rounded text-black text-sm w-[110px]"
        />
        <button
          onClick={insert}
          className="bg-green-600 px-3 py-1 rounded text-sm hover:bg-green-700"
        >
          Insert
        </button>

        <input
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search value"
          className="px-2 py-1 rounded text-black text-sm w-[110px]"
        />
        <button
          onClick={search}
          className="bg-yellow-600 px-3 py-1 rounded text-sm hover:bg-yellow-700"
        >
          Search
        </button>

        <input
          type="text"
          value={deleteKey}
          onChange={(e) => setDeleteKey(e.target.value)}
          placeholder="Delete value"
          className="px-2 py-1 rounded text-black text-sm w-[110px]"
        />
        <button
          onClick={remove}
          className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700"
        >
          Delete
        </button>
      </div>

      {/* Table Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {table.map((bucket, i) => (
          <div key={i} className="bg-gray-800 rounded p-2 w-full">
            <h4 className="text-center text-base font-semibold mb-2">Index {i}</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {renderChain(bucket.head, highlighted)}
            </div>
          </div>
        ))}
      </div>

      {/* Explanation */}
      <div className="mt-6 p-3 bg-gray-800 rounded text-sm overflow-auto max-h-40">
        <strong>Explanation: </strong>
        <span>{explanation}</span>
      </div>
    </div>
  );
};

// Helper to render chain nodes
const renderChain = (head, highlighted) => {
  const nodes = [];
  let current = head;

  while (current) {
    nodes.push(
      <motion.div
        key={current.id}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className={`px-3 py-1 bg-blue-600 rounded shadow text-sm text-white ${
          highlighted === current.id ? "bg-yellow-500" : ""
        }`}
      >
        {current.key}
      </motion.div>
    );
    if (current.next) {
      nodes.push(
        <span key={current.id + "-arrow"} className="text-lg font-bold text-white">
          →
        </span>
      );
    }
    current = current.next;
  }

  return nodes.length ? nodes : <div className="text-gray-500 text-sm">Empty</div>;
};

export default HashTableVisualizer;

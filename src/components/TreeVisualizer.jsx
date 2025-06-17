import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
  this.id = Math.random().toString(36).substr(2, 9); // Unique ID for animation keys
}

const TreeVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [value, setValue] = useState("");
  const [isBST, setIsBST] = useState(true);
  const [deleteVal, setDeleteVal] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [foundId, setFoundId] = useState(null);

  const insertBST = (node, val) => {
    if (!node) return new TreeNode(val);
    if (val < node.val) node.left = insertBST(node.left, val);
    else node.right = insertBST(node.right, val);
    return node;
  };

  const insertGeneral = (node, val) => {
    if (!node) return new TreeNode(val);
    const queue = [node];
    while (queue.length) {
      const current = queue.shift();
      if (!current.left) {
        current.left = new TreeNode(val);
        break;
      } else queue.push(current.left);
      if (!current.right) {
        current.right = new TreeNode(val);
        break;
      } else queue.push(current.right);
    }
    return node;
  };

  const deleteNode = (node, val) => {
    if (!node) return null;
    if (val < node.val) node.left = deleteNode(node.left, val);
    else if (val > node.val) node.right = deleteNode(node.right, val);
    else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let temp = node.right;
      while (temp.left) temp = temp.left;
      node.val = temp.val;
      node.right = deleteNode(node.right, temp.val);
    }
    return node;
  };

  const searchNode = (node, val) => {
    if (!node) return null;
    if (node.val === val) return node;
    if (val < node.val) return searchNode(node.left, val);
    return searchNode(node.right, val);
  };

  const handleInsert = () => {
    const num = parseInt(value);
    if (isNaN(num)) return alert("Enter a valid number");
    const newRoot = isBST ? insertBST(root, num) : insertGeneral(root, num);
    setRoot({ ...newRoot });
    setValue("");
  };

  const handleDelete = () => {
    const num = parseInt(deleteVal);
    if (isNaN(num)) return alert("Enter a valid number to delete");
    const updated = deleteNode(root, num);
    setRoot({ ...updated });
    setDeleteVal("");
  };

  const handleSearch = () => {
    const num = parseInt(searchVal);
    if (isNaN(num)) return alert("Enter valid search value");
    const found = searchNode(root, num);
    setFoundId(found?.id || null);
    setSearchVal("");
  };

  const renderTree = (node) => {
    if (!node) return null;
    return (
      <div className="flex flex-col items-center relative">
        <AnimatePresence>
          <motion.div
            key={node.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className={`relative px-4 py-2 rounded mb-4 text-white text-lg font-medium shadow-lg transition-all duration-300 ${
              foundId === node.id ? "bg-yellow-500" : "bg-blue-600"
            }`}
          >
            {node.val}
          </motion.div>
        </AnimatePresence>
        <div className="flex gap-4">
          {node.left && <Arrow direction="left" />}
          {node.right && <Arrow direction="right" />}
        </div>
        <div className="flex gap-4">
          {renderTree(node.left)}
          {renderTree(node.right)}
        </div>
      </div>
    );
  };

  const Arrow = ({ direction }) => (
    <div
      className={`w-8 h-8 border-t-4 border-l-4 transform rotate-${
        direction === "left" ? "-45" : "45"
      } border-white mt-2`}
    />
  );

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-6xl text-white flex flex-col md:flex-row gap-6">
      {/* Left: Controls */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-4 text-center">Tree Visualizer</h2>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Insert value"
            className="px-2 py-1 rounded text-black"
          />
          <button
            onClick={handleInsert}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            Insert
          </button>

          <input
            type="text"
            value={deleteVal}
            onChange={(e) => setDeleteVal(e.target.value)}
            placeholder="Delete value"
            className="px-2 py-1 rounded text-black"
          />
          <button
            onClick={handleDelete}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>

          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search value"
            className="px-2 py-1 rounded text-black"
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700"
          >
            Search
          </button>
        </div>

        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setIsBST(true)}
            className={`px-4 py-2 rounded ${isBST ? "bg-green-600" : "bg-gray-700"}`}
          >
            BST Mode
          </button>
          <button
            onClick={() => setIsBST(false)}
            className={`px-4 py-2 rounded ${!isBST ? "bg-green-600" : "bg-gray-700"}`}
          >
            General Tree Mode
          </button>
        </div>
      </div>

      {/* Right: Tree View & Memory */}
      <div className="flex-1">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Tree Structure</h3>
          <div className="overflow-auto flex justify-center items-start">
            {renderTree(root)}
          </div>
        </div>
        <div className="bg-gray-700 p-4 rounded">
          <h4 className="font-semibold mb-2">Memory Layout (Simulated)</h4>
          <div className="flex flex-wrap gap-2">
            {flattenTree(root).map((node) => (
              <div
                key={node.id}
                className="px-3 py-1 bg-indigo-500 rounded text-sm shadow-md"
              >
                {`Node(${node.val}) → left: ${node.left ? node.left.val : "null"}, right: ${node.right ? node.right.val : "null"}`}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const flattenTree = (root) => {
  const result = [];
  const traverse = (node) => {
    if (!node) return;
    result.push(node);
    traverse(node.left);
    traverse(node.right);
  };
  traverse(root);
  return result;
};

export default TreeVisualizer;

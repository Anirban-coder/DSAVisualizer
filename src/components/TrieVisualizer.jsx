import React, { useState } from "react";
import { motion } from "framer-motion";

class TrieNode {
  constructor(char) {
    this.char = char;
    this.children = {};
    this.isEndOfWord = false;
    this.id = Math.random().toString(36).substr(2, 9);
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode("");
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode(char);
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    const path = [];
    for (let char of word) {
      if (!node.children[char]) return { found: false, path };
      node = node.children[char];
      path.push(node.id);
    }
    return { found: node.isEndOfWord, path };
  }
}

const trie = new Trie();

const TrieVisualizer = () => {
  const [insertWord, setInsertWord] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [highlightPath, setHighlightPath] = useState([]);
  const [result, setResult] = useState(null);
  const [_, forceRender] = useState({});

  const handleInsert = () => {
    if (!insertWord.trim()) return;
    trie.insert(insertWord.toLowerCase());
    setInsertWord("");
    forceRender({});
  };

  const handleSearch = () => {
    const res = trie.search(searchWord.toLowerCase());
    setHighlightPath(res.path);
    setResult(res.found);
    setTimeout(() => setHighlightPath([]), 2000);
  };

  const renderTrie = (node) => {
    return (
      <div className="flex flex-col items-center">
        <motion.div
          layout
          key={node.id}
          className={`rounded-full px-3 py-2 m-1 text-white font-semibold text-xs sm:text-sm ${
            highlightPath.includes(node.id) ? "bg-yellow-500" : "bg-blue-600"
          }`}
        >
          {node.char || "Root"}
        </motion.div>
        <div className="flex flex-wrap justify-center">
          {Object.values(node.children).map((child) => (
            <div key={child.id} className="flex flex-col items-center mx-1 sm:mx-2">
              <div className="h-4 w-0.5 bg-white" />
              {renderTrie(child)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 text-white p-4 sm:p-6 rounded-xl shadow-xl w-full max-w-6xl mx-auto">
      <h2 className="text-xl sm:text-3xl font-bold mb-3 text-center">Trie Visualizer</h2>

      <p className="text-center text-xs sm:text-sm text-gray-300 mb-5 max-w-md mx-auto">
        A Trie (prefix tree) efficiently stores strings for prefix-based lookups. Insert words and search to highlight the traversal path.
      </p>

      <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-4 sm:mb-6">
        <input
          value={insertWord}
          onChange={(e) => setInsertWord(e.target.value)}
          placeholder="Insert word"
          className="text-black text-sm sm:text-base px-3 py-1 rounded w-[130px]"
        />
        <button
          onClick={handleInsert}
          className="bg-green-600 hover:bg-green-700 px-4 py-1 sm:py-2 rounded text-sm sm:text-base"
        >
          Insert
        </button>

        <input
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="Search word"
          className="text-black text-sm sm:text-base px-3 py-1 rounded w-[130px]"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-600 hover:bg-yellow-700 px-4 py-1 sm:py-2 rounded text-sm sm:text-base"
        >
          Search
        </button>
      </div>

      {result !== null && (
        <div
          className={`text-center mb-4 font-semibold text-sm sm:text-lg ${
            result ? "text-green-400" : "text-red-400"
          }`}
        >
          {result ? "Word Found!" : "Word Not Found!"}
        </div>
      )}

      <div className="overflow-auto max-w-full">
        <div className="min-w-[300px] flex justify-center">{renderTrie(trie.root)}</div>
      </div>
    </div>
  );
};

export default TrieVisualizer;

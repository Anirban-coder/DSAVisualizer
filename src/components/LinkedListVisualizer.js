import React, { useState } from "react";

function Node(value) {
  this.value = value;
  this.next = null;
}

const LinkedListVisualizer = () => {
  const [head, setHead] = useState(null);
  const [input, setInput] = useState("");
  const [deleteValue, setDeleteValue] = useState("");
  const [renderList, setRenderList] = useState([]);

  const updateRenderList = (node) => {
    const list = [];
    let current = node;
    while (current) {
      list.push(current.value);
      current = current.next;
    }
    setRenderList(list);
  };

  const insert = () => {
    if (!input) return;
    const newNode = new Node(input);
    if (!head) {
      setHead(newNode);
      updateRenderList(newNode);
    } else {
      let current = head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
      updateRenderList(head);
    }
    setInput("");
  };

  const handleDelete = () => {
    if (!head) return;

    let dummy = new Node(null);
    dummy.next = head;
    let prev = dummy;
    let current = head;

    while (current) {
      if (current.value === deleteValue) {
        prev.next = current.next;
        break;
      }
      prev = current;
      current = current.next;
    }

    setHead(dummy.next);
    updateRenderList(dummy.next);
    setDeleteValue("");
  };

  const reset = () => {
    setHead(null);
    setRenderList([]);
    setInput("");
    setDeleteValue("");
  };

  return (
    <div className="w-full max-w-md bg-gray-800 p-6 rounded shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4 text-white">Linked List Visualizer</h2>
      <p className="text-sm text-gray-300 mb-6">
  A linked list is a linear data structure where each element (node) contains a value and a reference to the next node in the sequence. 
  It allows dynamic memory allocation and efficient insertions or deletions.
</p>
      <div className="flex flex-col gap-4">
        {/* Insert Section */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 rounded text-black"
            placeholder="Enter value"
          />
          <button
            onClick={insert}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            Insert
          </button>
        </div>

        {/* Delete Section */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Value to delete"
            value={deleteValue}
            onChange={(e) => setDeleteValue(e.target.value)}
            className="flex-1 px-2 py-1 rounded text-black"
          />
          <button
            onClick={handleDelete}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={reset}
          className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
        >
          Reset
        </button>
      </div>

      {/* Visual Display */}
      <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
  {renderList.map((val, idx) => (
    <div key={idx} className="flex items-center gap-2">
      <div className="bg-blue-600 px-4 py-2 rounded shadow text-white font-medium">
        {val}
      </div>
      <div className="text-white text-lg">{idx < renderList.length - 1 ? "➡️" : "⛔"}</div>
    </div>
  ))}
  {renderList.length > 0 && (
    <div className="text-gray-400 text-sm ml-2">null</div>
  )}
</div>

    </div>
  );
};

export default LinkedListVisualizer;

import React, { useState, useEffect } from 'react';

const ALGORITHMS = ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'];

const algoDetails = {
  'Bubble Sort': {
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    code: `for i in 0 to n-1:
  for j in 0 to n-i-1:
    if arr[j] > arr[j+1]:
      swap(arr[j], arr[j+1])`,
  },
  'Selection Sort': {
    description: 'Selects the smallest element from the unsorted part and places it at the beginning.',
    code: `for i in 0 to n-1:
  minIdx = i
  for j in i+1 to n:
    if arr[j] < arr[minIdx]:
      minIdx = j
  swap(arr[i], arr[minIdx])`,
  },
  'Insertion Sort': {
    description: 'Builds the sorted list one element at a time by comparing with elements to the left.',
    code: `for i in 1 to n:
  key = arr[i]
  j = i - 1
  while j >= 0 and arr[j] > key:
    arr[j+1] = arr[j]
    j -= 1
  arr[j+1] = key`,
  },
  'Merge Sort': {
    description: 'Divides the array into halves, recursively sorts them, and then merges them.',
    code: `mergeSort(arr):
  if len(arr) > 1:
    mid = len(arr) / 2
    L = arr[:mid]
    R = arr[mid:]
    mergeSort(L)
    mergeSort(R)
    merge L and R`,
  },
  'Quick Sort': {
    description: 'Selects a pivot, partitions array into two halves around the pivot, and sorts recursively.',
    code: `quickSort(arr, low, high):
  if low < high:
    pi = partition(arr, low, high)
    quickSort(arr, low, pi - 1)
    quickSort(arr, pi + 1, high)`,
  },
};

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(100);
  const [selectedAlgo, setSelectedAlgo] = useState(ALGORITHMS[0]);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    if (isSorting) return;
    const arr = Array.from({ length: 30 }, () => Math.floor(Math.random() * 300) + 20);
    setArray(arr);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(speed);
        }
      }
    }
    setIsSorting(false);
  };

  const selectionSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      setArray([...arr]);
      await sleep(speed);
    }
    setIsSorting(false);
  };

  const insertionSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]);
        await sleep(speed);
      }
      arr[j + 1] = key;
      setArray([...arr]);
      await sleep(speed);
    }
    setIsSorting(false);
  };

  const mergeSort = async () => {
    setIsSorting(true);
    const arr = [...array];

    const merge = async (arr, start, mid, end) => {
      const left = arr.slice(start, mid + 1);
      const right = arr.slice(mid + 1, end + 1);

      let i = 0, j = 0, k = start;

      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          arr[k] = left[i];
          i++;
        } else {
          arr[k] = right[j];
          j++;
        }
        k++;
        setArray([...arr]);
        await sleep(speed);
      }

      while (i < left.length) {
        arr[k++] = left[i++];
        setArray([...arr]);
        await sleep(speed);
      }

      while (j < right.length) {
        arr[k++] = right[j++];
        setArray([...arr]);
        await sleep(speed);
      }
    };

    const mergeSortHelper = async (arr, start, end) => {
      if (start >= end) return;
      const mid = Math.floor((start + end) / 2);
      await mergeSortHelper(arr, start, mid);
      await mergeSortHelper(arr, mid + 1, end);
      await merge(arr, start, mid, end);
    };

    await mergeSortHelper(arr, 0, arr.length - 1);
    setIsSorting(false);
  };

  const quickSort = async () => {
    setIsSorting(true);
    const arr = [...array];

    const partition = async (arr, low, high) => {
      let pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
          await sleep(speed);
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setArray([...arr]);
      await sleep(speed);
      return i + 1;
    };

    const quickSortHelper = async (arr, low, high) => {
      if (low < high) {
        const pi = await partition(arr, low, high);
        await quickSortHelper(arr, low, pi - 1);
        await quickSortHelper(arr, pi + 1, high);
      }
    };

    await quickSortHelper(arr, 0, arr.length - 1);
    setIsSorting(false);
  };

  const handleSort = () => {
    if (isSorting) return;
    if (selectedAlgo === 'Bubble Sort') bubbleSort();
    else if (selectedAlgo === 'Selection Sort') selectionSort();
    else if (selectedAlgo === 'Insertion Sort') insertionSort();
    else if (selectedAlgo === 'Merge Sort') mergeSort();
    else if (selectedAlgo === 'Quick Sort') quickSort();
  };

  return (
    <div className="w-full flex flex-col items-center px-2 sm:px-4">
      <h2 className="text-xl sm:text-2xl font-semibold my-4 text-center">Sorting Algorithm Visualizer</h2>

      <div className="flex flex-wrap gap-2 justify-center mb-4 w-full max-w-5xl">
        <select
          className="bg-gray-700 text-white px-3 py-1 rounded text-sm"
          value={selectedAlgo}
          onChange={(e) => setSelectedAlgo(e.target.value)}
          disabled={isSorting}
        >
          {ALGORITHMS.map((algo) => (
            <option key={algo} value={algo}>
              {algo}
            </option>
          ))}
        </select>

        <input
          type="range"
          min="10"
          max="500"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={isSorting}
          className="w-32 sm:w-40"
        />

        <button
          onClick={generateArray}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
          disabled={isSorting}
        >
          Reset
        </button>
        <button
          onClick={handleSort}
          className="bg-green-600 text-white px-3 py-1 rounded text-sm"
          disabled={isSorting}
        >
          Sort
        </button>
      </div>

      {/* Description */}
      <div className="bg-gray-900 text-white rounded p-3 w-full max-w-5xl mb-4 text-sm">
        <h3 className="font-bold mb-1">{selectedAlgo}</h3>
        <p className="mb-2 text-gray-300">{algoDetails[selectedAlgo].description}</p>
        <pre className="bg-gray-800 text-green-300 p-2 rounded overflow-auto whitespace-pre-wrap text-xs">
{algoDetails[selectedAlgo].code}
        </pre>
      </div>

      {/* Visual Bars */}
      <div className="flex items-end h-64 w-full max-w-5xl border border-gray-700 p-2 bg-gray-800 rounded overflow-x-auto">
        {array.map((val, idx) => (
          <div
            key={idx}
            style={{ height: `${val}px` }}
            className="bg-teal-400 w-[6px] mx-[1px] rounded-t"
          />
        ))}
      </div>
    </div>
  );
}

export default SortingVisualizer;

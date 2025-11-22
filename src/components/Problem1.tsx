import { useEffect, useState } from "react";

// recursive Fibonacci implementation
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export default function App() {
  const [number, setNumber] = useState(35);
  const [result, setResult] = useState<{
    value: number;
    duration: number;
  } | null>(null);
  const [computing, setComputing] = useState(false);
  const [worker, setWorker] = useState<Worker | null>(null);


  useEffect(() => {
    // Initialize the worker
    const w = new Worker(new URL("../utils/worker.ts", import.meta.url), {
      type: "module",
    });
    setWorker(w);

    // Set up the message handler
    w.onmessage = (e: MessageEvent<{ value: number; duration: number }>) => {
      setResult({
        value: e.data.value,
        duration: e.data.duration,
      });
      setComputing(false);
    };

    // Cleanup worker on unmount
    return () => {
      w.terminate();
      setWorker(null);
    };
  }, []);

  const handleCompute = () => {
    // Use worker if available to avoid blocking the main thread
    if (worker) {
      setComputing(true);
      worker.postMessage(number);
      return;
    }

    // Fallback: synchronous computation
    setComputing(true);
    const startTime = performance.now();

    const result = fibonacci(number);

    const endTime = performance.now();
    setResult({
      value: result,
      duration: endTime - startTime,
    });
    setComputing(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Problem 1: Fibonacci Calculator</h1>
      <p>Implement a Web Worker to prevent UI blocking</p>
      <div style={{ marginTop: "20px" }}>
        <h3>Instructions:</h3>
        <ol className="instructions">
          <li>Try calculating Fibonacci numbers above 35</li>
          <li>Notice how the UI becomes unresponsive during calculation</li>
          <li>Try moving the slider while computing</li>
        </ol>
      </div>
      <div>
        <label htmlFor="fibonacci-number">Enter a number:</label>
        <input
          id="fibonacci-number"
          type="number"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value))}
          style={{ margin: "10px 0" }}
          aria-label="fibonacci-number"
        />
        <button
          onClick={handleCompute}
          disabled={computing}
          style={{ marginLeft: "10px" }}
        >
          {computing ? "Computing..." : "Calculate"}
        </button>
      </div>

      {/* Try moving the slider while computing! */}
      <div style={{ margin: "20px 0" }}>
        <input type="range" min="0" max="100" style={{ width: "200px" }} />
      </div>

      {result && (
        <div>
          <p>Result: {result.value}</p>
          <p>Time taken: {result.duration.toFixed(2)}ms</p>
        </div>
      )}
    </div>
  );
}

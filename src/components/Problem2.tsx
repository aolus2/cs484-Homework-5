import { useState, useMemo } from "react";
import calculateFactorial from "../utils/factorial";

export default function Problem2() {
  const [number, setNumber] = useState(10);
  const [increment, setIncrement] = useState(0);

  const factorial = () => {
    console.log("Calculating factorial...");
    return calculateFactorial(number);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Problem 2: Optimizing Expensive Calculations with useMemo</h1>
      <p>Use useMemo to memoize expensive calculations.</p>
            <div style={{ marginTop: "20px" }}>
                <h3>Instructions:</h3>
                <ol className="instructions">
                    <li>
                        Enter a number to calculate its factorial.
                    </li>
                    <li>Click the "Re-render Component" button.</li>
                    <li>
                        "Calculating factorial..." should print to the console
                        only when the number changes.
                    </li>
                </ol>
            </div>
            <div>
                <label>
                      Enter a number:
                    <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(parseInt(e.target.value))}
                        style={{ marginLeft: "10px" }}
                    />
                </label>
            </div>

            <p>
                Factorial of {number} is {factorial()}
            </p>

            <button onClick={() => setIncrement(increment + 1)}>
                Re-render Component ({increment})
            </button>
        </div>
    );
}

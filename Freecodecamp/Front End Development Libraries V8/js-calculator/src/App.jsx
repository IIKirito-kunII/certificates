import React, { useState, useEffect } from "react";
import "./App.css";

const keys = [
  { key: "AC", id: "clear" },
  { key: "/", id: "divide" },
  { key: "*", id: "multiply" },
  { key: "-", id: "subtract" },
  { key: "7", id: "seven" },
  { key: "8", id: "eight" },
  { key: "9", id: "nine" },
  { key: "+", id: "add" },
  { key: "4", id: "four" },
  { key: "5", id: "five" },
  { key: "6", id: "six" },
  { key: "1", id: "one" },
  { key: "2", id: "two" },
  { key: "3", id: "three" },
  { key: "=", id: "equals" },
  { key: "0", id: "zero" },
  { key: ".", id: "decimal" },
];

export default function App() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("0");
  const [isCalculated, setIsCalculated] = useState(false);

  const handleButtonClick = (key) => {
    const index = keys.find((k) => k.key === key);
    const button = document.getElementById(index.id);
    if (button) {
      button.classList.add("active");
      setTimeout(() => {
        button.classList.remove("active");
      }, 100);
    }

    if (key === "AC") {
      setDisplay("");
      setResult("0");
      setIsCalculated(false);
      return;
    }

    if (key === "=") {
      if (isCalculated || display === "") return;
      try {
        const evaluatedResult = eval(display);
        setResult(evaluatedResult.toString());
        setDisplay((prev) => prev + " = " + evaluatedResult);
        setIsCalculated(true);
      } catch (error) {
        setResult("Error");
        setIsCalculated(true);
      }
      return;
    }

    if (isCalculated) {
      if (/[0-9.]/.test(key)) {
        setDisplay(key);
        setResult(key);
      } else {
        setDisplay(result + key);
        setResult(key);
      }
      setIsCalculated(false);
      return;
    }

    const lastChar = display.slice(-1);
    const secondLastChar = display.slice(-2);
    const lastNumber = result.split().pop();
    if (
      (/[0-9.]/.test(key) && lastNumber.length >= 10) ||
      (lastNumber.includes(".") && key === ".")
    ) {
      return;
    }

    if (/[\+\-\*/]/.test(key)) {
      if (display === "" && key !== "-") return;
      if (/[\+\-\*/]/.test(lastChar)) {
        if (key === "-" && lastChar !== "-") {
          setDisplay((prev) => prev + key);
          setResult(key);
        } else if (lastChar === "-" && /[\+\-\*/]/.test(secondLastChar)) {
          setDisplay((prev) => prev.slice(0, -2) + key);
        }
        setDisplay((prev) => prev.slice(0, -1) + key);
      } else {
        setDisplay((prev) => prev + key);
      }
      setResult(key);
    } else {
      setDisplay((prev) => prev + key);
      if (result === "0" || /[\+\-\*/]/.test(result)) {
        setResult(key);
      } else {
        setResult((prev) => prev + key);
      }
    }
  };

  const handleKeyDown = (e) => {
    const keyMap = {
      Enter: "=",
      Backspace: "AC",
    };
    const key = keyMap[e.key] || e.key;
    const button = keys.find((k) => k.key === key);
    if (button) {
      document.getElementById(button.id).click();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="container">
      <div className="display">{display || "0"}</div>
      <hr />
      <div id="display" className="result">
        {result}
      </div>
      <div className="keypad">
        {keys.map(({ key, id }) => (
          <button id={id} key={key} onClick={() => handleButtonClick(key)}>
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}

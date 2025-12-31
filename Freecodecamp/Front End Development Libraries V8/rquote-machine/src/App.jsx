import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight, FaTwitter } from "react-icons/fa";
import "./App.css";

export default function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [boxShadow, setBoxShadow] = useState(`0 10px 10px ${color}`);

  const getQuote = async () => {
    const response = await fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    );
    const data = await response.json();
    const i = Math.floor(Math.random() * data.quotes.length);
    const randomQuote = data.quotes[i];

    setTimeout(() => {
      setQuote(randomQuote.quote);
      setAuthor(randomQuote.author);
    }, 1000);
    changeColors();
  };

  const changeColors = () => {
    const red = Math.floor(Math.random() * 128);
    const green = Math.floor(Math.random() * 128);
    const blue = Math.floor(Math.random() * 128);
    const newColor = `rgb(${red},${green},${blue})`;

    setColor("rgba(0, 0, 0, 0)");

    setTimeout(() => {
      setColor(newColor);
      setBgColor(newColor);
      setBoxShadow(`0 10px 10px ${newColor}`);
      document.body.style.backgroundImage = `linear-gradient(to right bottom, ${newColor}, #ffedbca8)`;
    }, 1000);
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <>
      <div className="container" style={{ color: color, boxShadow: boxShadow }}>
        <div id="quote-box">
          <div id="text">
            <b>
              <FaQuoteLeft /> {quote || "Loading..."} <FaQuoteRight />
            </b>
          </div>
          <div id="author">~ {author || ""}</div>
          <footer>
            <a
              style={{ backgroundColor: bgColor }}
              id="tweet-quote"
              className="btn twitter"
              href={`https://twitter.com/intent/tweet?text="${quote}" ~${author}`}
              target="_blank"
            >
              <FaTwitter />
            </a>
            <button
              style={{ backgroundColor: bgColor }}
              id="new-quote"
              className="btn next"
              onClick={getQuote}
            >
              New quote
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}

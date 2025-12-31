import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(50);
  const names = {
    Q: {
      name: "Heater 1",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    W: {
      name: "Heater 2",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    E: {
      name: "Heater 3",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    A: {
      name: "Heater 4",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    S: {
      name: "Clap",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    D: {
      name: "Open HH",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    Z: {
      name: "Kick n' Hat",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    X: {
      name: "Kick",
      src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    C: {
      name: "Closed HH",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  };

  const playSound = (key) => {
    const button = document.getElementById(key);
    const display = document.querySelector(".display");
    const audio = button.querySelector("audio");

    if (power) {
      audio.currentTime = 0;
      audio.volume = volume / 100;
      audio.play();
    }

    button.classList.add("active");
    display.innerHTML = names[key].name;
    setTimeout(() => {
      button.classList.remove("active");
    }, 100);
  };

  const handleKeyDown = (e) => {
    const key = e.key.toUpperCase();
    if (names[key]) {
      document.getElementById(key).click();
    }
  };

  const handleVolumeChange = (e) => {
    const display = document.querySelector(".display");
    const newVolume = e.target.value;
    setVolume(newVolume);
    display.innerHTML = `Volume: ${newVolume}`;
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="container" id="drum-machine">
      <div className="keypad">
        {Object.keys(names).map((key) => (
          <button
            key={key}
            id={key}
            className="drum-pad"
            onClick={() => playSound(key)}
          >
            {key}
            <audio src={names[key].src} className="clip" id={key}></audio>
          </button>
        ))}
      </div>
      <div className="info">
        <div className="power">
          <p>Power: {power ? "ON" : "OFF"}</p>
          <div
            className="select"
            onClick={() => {
              setPower(!power);
            }}
          >
            <div
              className="inner"
              style={{ float: power ? "right" : "left" }}
            ></div>
          </div>
        </div>
        <div className="display" id="display"></div>
        <div className="volume">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="trigger"
          />
        </div>
      </div>
    </div>
  );
}

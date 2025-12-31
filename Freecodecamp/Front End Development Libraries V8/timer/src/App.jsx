import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionTime * 60);
  const [running, setRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  const beepAudio = useRef(null);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            if (beepAudio.current) {
              beepAudio.current.play();
            }
            setTimeout(() => {
              if (beepAudio.current) {
                beepAudio.current.pause();
                beepAudio.current.currentTime = 0;
              }
            }, 1000);
            setOnBreak((prevState) => !prevState);
            return onBreak ? sessionTime * 60 : breakTime * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [running, timeLeft, onBreak, sessionTime, breakTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleReset = () => {
    setRunning(false);
    setBreakTime(5);
    setSessionTime(25);
    setTimeLeft(25 * 60);
    setOnBreak(false);
    if (beepAudio.current) {
      beepAudio.current.pause();
      beepAudio.current.currentTime = 0;
    }
  };

  return (
    <div>
      <h1>25 + 5 Clock</h1>
      <div className="time">
        <div className="break">
          <h2 id="break-label">Break Length</h2>
          <button
            id="break-decrement"
            onClick={() => setBreakTime((prev) => Math.max(prev - 1, 1))}
          >
            -
          </button>
          <span id="break-length">{breakTime}</span>
          <button
            id="break-increment"
            onClick={() => setBreakTime((prev) => Math.min(prev + 1, 60))}
          >
            +
          </button>
        </div>

        <div className="session">
          <h2 id="session-label">Session Length</h2>
          <button
            id="session-decrement"
            onClick={() => {
              const newSessionTime = Math.max(sessionTime - 1, 1);
              setSessionTime(newSessionTime);
              if (!running && !onBreak) setTimeLeft(newSessionTime * 60);
            }}
          >
            -
          </button>
          <span id="session-length">{sessionTime}</span>
          <button
            id="session-increment"
            onClick={() => {
              const newSessionTime = Math.min(sessionTime + 1, 60);
              setSessionTime(newSessionTime);
              if (!running && !onBreak) setTimeLeft(newSessionTime * 60);
            }}
          >
            +
          </button>
        </div>
      </div>

      <div className="container">
        <div className="timer">
          <h3 id="timer-label">{onBreak ? "Break" : "Session"}</h3>
          <h3
            id="time-left"
            style={{
              color: running ? "black" : "white",
            }}
          >
            {formatTime(timeLeft)}
          </h3>
        </div>
        <div className="keypad">
          {running ? (
            <button id="start_stop" onClick={() => setRunning(false)}>
              Pause
            </button>
          ) : (
            <button id="start_stop" onClick={() => setRunning(true)}>
              Start
            </button>
          )}
          <button id="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      <audio id="beep" ref={beepAudio}>
        <source
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

import React, { useEffect, useState, createContext, useContext } from "react";
import Draggable from "react-draggable";
import { AiFillCaretDown } from "react-icons/ai";

const ScreenTimeTracker = () => {
  const [screenTime, setScreenTime] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  const [idleThreshold, setIdleThreshold] = useState(60000); // Default idle time threshold: 1 minute
  const [showContextMenu, setShowContextMenu] = useState(false);

  useEffect(() => {
    let intervalId;

    const startScreenTime = () => {
      intervalId = setInterval(() => {
        if (!isIdle) {
          setScreenTime((prevTime) => prevTime + 1);
        }
      }, 1000);
    };

    const handleUserActivity = () => {
      setIsIdle(false);
      setLastActiveTime(Date.now());
    };

    const handleUserIdle = () => {
      setIsIdle(true);
      clearInterval(intervalId);
    };

    // Add event listeners for user activity
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);
    document.addEventListener("mousedown", handleUserActivity);
    document.addEventListener("touchstart", handleUserActivity);
    document.addEventListener("visibilitychange", handleUserActivity);

    // Check idle state every second
    const idleCheckInterval = setInterval(() => {
      const currentTime = Date.now();
      const idleTime = currentTime - lastActiveTime;

      if (idleTime >= idleThreshold && !isIdle) {
        handleUserIdle();
        setIsIdle(true);
      } else if (idleTime < idleThreshold && isIdle) {
        setIsIdle(false);
        startScreenTime();
      }
    }, 1000);

    // Start screen time tracking
    startScreenTime();

    // Clean up event listeners and interval on component unmount
    return () => {
      clearInterval(intervalId);
      clearInterval(idleCheckInterval);
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
      document.removeEventListener("mousedown", handleUserActivity);
      document.removeEventListener("touchstart", handleUserActivity);
      document.removeEventListener("visibilitychange", handleUserActivity);
    };
  }, [isIdle, lastActiveTime, idleThreshold]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setShowContextMenu(!showContextMenu);
  };

  const handleSetIdleThreshold = (threshold) => {
    setIdleThreshold(threshold);
    setShowContextMenu(false);
  };

  return (
    <Draggable handle=".handle" defaultPosition={{ x: 0, y: 0 }}>
      <div
        className={`tracker-widget ${isIdle ? "idle" : ""}`}
        onContextMenu={handleContextMenu}
      >
        <div className="handle">
          <div>Screen Time: {formatTime(screenTime)}</div>
          <div className="menu-icon">
            <AiFillCaretDown onClick={handleContextMenu} />
            {showContextMenu && (
              <SettingsMenu handleSetIdleThreshold={handleSetIdleThreshold} />
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

const SettingsMenu = ({ handleSetIdleThreshold }) => {
  return (
    <ul className="context-menu" id="context-menu">
      <li onClick={() => handleSetIdleThreshold(60000)}>1 Minute</li>
      <li onClick={() => handleSetIdleThreshold(300000)}>5 Minutes</li>
      <li onClick={() => handleSetIdleThreshold(600000)}>10 Minutes</li>
    </ul>
  );
};

export default ScreenTimeTracker;

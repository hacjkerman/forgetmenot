import React, { useEffect, useState } from "react";
import TimerCSS from "./Timer.module.css";
import toast from "react-hot-toast";
const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  if (minutes <= 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
};

function Timer(props) {
  const duration = props.estimate;
  const setIsDoingTask = props.setIsDoingTask;
  const [seconds, setSeconds] = useState(duration * 60);
  const [isStarted, setIsStarted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (isStarted) {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  const toggleStart = () => {
    setIsStarted(!isStarted);
  };

  const handleTimerExtension = () => {
    setIsUpdating(!isUpdating);
  };
  const handleClose = () => {
    setIsDoingTask(false);
  };
  const addTime = (e) => {
    e.preventDefault();
    const num = Number(e.target[0].value);
    if (num <= 0 || num > 10000) {
      toast.error(
        "Number is too small or large\n(pick one between 1 and 10000)"
      );
    } else {
      const additionalSecs = num * 60;
      if ((seconds + additionalSecs) / 60 > 10000) {
        toast.error("Number is too large and will extend past 10000");
      } else {
        setSeconds(seconds + additionalSecs);
        handleTimerExtension();
      }
    }
    return;
  };

  return (
    <div className={TimerCSS.popup}>
      <div className={TimerCSS.timerBox}>
        <div className={TimerCSS.header}>
          <div></div>
          <h3 className={TimerCSS.headerText}>Timer</h3>
          <button className={TimerCSS.closeBtn} onClick={handleClose}>
            x
          </button>
        </div>
        <div className={TimerCSS.lowerBox}>
          <div className={TimerCSS.time}>{formatTime(seconds)}</div>
          <div className={TimerCSS.buttons}>
            {isStarted ? (
              <button onClick={toggleStart} className={TimerCSS.pauseButton}>
                Pause
              </button>
            ) : (
              <button onClick={toggleStart} className={TimerCSS.beginButton}>
                Begin
              </button>
            )}

            {isUpdating ? (
              <button
                className={TimerCSS.cancelButton}
                onClick={handleTimerExtension}
              >
                Cancel
              </button>
            ) : (
              <button
                className={TimerCSS.extendButton}
                onClick={handleTimerExtension}
              >
                Extend
              </button>
            )}
          </div>
          {isUpdating ? (
            <div className={TimerCSS.inputBox}>
              <form onSubmit={addTime}>
                <input
                  className={TimerCSS.input}
                  type="number"
                  placeholder="5 (extra minutes)"
                ></input>
                <button className={TimerCSS.addButton} type="submit">
                  Add
                </button>
              </form>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Timer;

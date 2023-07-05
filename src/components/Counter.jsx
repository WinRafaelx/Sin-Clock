import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import "./Css/Counter.css";

const showTime = (time) => {
  let miliseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
  let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
  let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
  let hours = ("0" + Math.floor(time / 3600000)).slice(-2);
  if (hours[0] == "0") hours = hours.slice(1);
  if (hours != "0") 
    return (
      <Typography variant="h3">{hours} : {minutes} : {seconds} . {miliseconds}`</Typography>
    );
  return (
    <Typography variant="h3">{minutes} : {seconds} . {miliseconds}</Typography>
  )
};

function Counter() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  const toSeconds = (hr, min, sec) => hr * 3600 + min * 60 + sec * 1;

  const addTime = (hr, min, sec) => {
    const newTime = time + toSeconds(hr, min, sec) * 1000;
    setTime(newTime);
  };
  
  const subtractTime = (hr, min, sec) => {
    const newTime = time - toSeconds(hr, min, sec) * 1000;
    setTime(newTime >= 0 ? newTime : 0);
  };

  

  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        {showTime(time)}
        <h1>{time}</h1>
        <Box sx={{ mt: 1 }}>
          <button className="Stop" onClick={() => setTimerOn(false)}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontStyle: "oblique",
                letterSpacing: 3,
              }}
            >
              Stop
            </Typography>
          </button>
          <button className="Start" onClick={() => setTimerOn(true)}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontStyle: "oblique",
                letterSpacing: 3,
              }}
            >
              Start
            </Typography>
          </button>
        </Box>

        <br />
        {/* <input value={hr} onChange={(e) => setHr(e.target.value)} />
        <input value={min} onChange={(e) => setMin(e.target.value)} />
        <input value={sec} onChange={(e) => setSec(e.target.value)} /> */}
        <Box>
          <button onClick={() => addTime(hr, min, sec)}>Add</button>
          <button onClick={() => subtractTime(hr, min, sec)}>Remove</button>
          <button
            onClick={() => {
              setTime(0);
              setTimerOn(false);
            }}
          >
            Clear
          </button>
        </Box>
      </Box>
    </>
  );
}

export default Counter;

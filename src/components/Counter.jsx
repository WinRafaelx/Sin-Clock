import React, { useEffect, useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import "./Css/Counter.css";

const addTime = (hr, min, sec) =>
  setTime((prevTime) => prevTime + toSeconds(hr, min, sec) * 1000);
const subtractTime = (hr, min, sec) =>
  setTime((prevTime) => prevTime - toSeconds(hr, min, sec) * 1000);
const Reset = () => {
  setTime(0)
  setTimerOn(false)
  setOutput("00 : 00 . 00")
};

const showTime = (time) => {
  let miliseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
  let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
  let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
  let hours = ("0" + Math.floor(time / 3600000)).slice(-2);
  if (hours[0] == "0") hours = hours.slice(1);
  if (hours != "0")
    return `${hours} : ${minutes} : ${seconds} . ${miliseconds}`;
  return `${minutes} : ${seconds} . ${miliseconds}`;
};

const IconStyle = {
  fontSize: "60px",
  color: "green",
  padding: "5px",
  border: "3px solid red",
  borderRadius: "50%",
  "&:hover": {
    color: "red",
    backgroundColor: "pink",
    borderRadius: "50%",
  },
};

function Counter() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [output, setOutput] = useState("00 : 00 . 00");
  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          setOutput(showTime(prevTime + 10));
          return prevTime + 10;
        });
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }
    console.log(time);
    return () => clearInterval(interval);
  }, [timerOn]);

  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Typography variant="h3" sx={{ color: "#C0C0C0" }}>
          {output}
        </Typography>
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
          <IconButton aria-label="delete" size="large">
            <ClearIcon sx={IconStyle} onClick={() => {
              setTime(0);
              setTimerOn(false);
            }}/>
          </IconButton>
          <button
            onClick={() => {Reset()}}
          >
            Clear
          </button>
        </Box>
      </Box>
    </>
  );
}

export default Counter;

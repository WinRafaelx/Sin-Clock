import React, { useEffect, useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import "./Css/Counter.css";

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
  color: "#9BD27B",
  padding: "5px",
  backgroundColor: "transparent",
  border: "3.5px solid #9BD27B",
  borderRadius: "50%",
  "&:hover": {
    color: "#FFFFFF",
    backgroundColor: "#9BD27B",
    borderRadius: "50%",
  },
};

function Counter() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [output, setOutput] = useState("00 : 00 . 00");

  const Reset = () => {
    setTime(0);
    setTimerOn(false);
    setOutput("00 : 00 . 00");
  };

  const addTime = (hr, min, sec) =>
    setTime((prevTime) => prevTime + toSeconds(hr, min, sec) * 1000);
  const subtractTime = (hr, min, sec) =>
    setTime((prevTime) => prevTime - toSeconds(hr, min, sec) * 1000);

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
          <IconButton aria-label="delete" size="normal">
            <ClearIcon sx={IconStyle} onClick={() => Reset()} />
          </IconButton>
          <IconButton aria-label="delete" size="normal">
            <ClearIcon sx={IconStyle} onClick={() => Reset()} />
          </IconButton>
          <IconButton aria-label="delete" size="normal">
            <ClearIcon sx={IconStyle} onClick={() => Reset()} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default Counter;

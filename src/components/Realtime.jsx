import React, { useEffect, useRef } from "react";
import Counter from "./Counter";
import { Box } from "@mui/material";
import "./Css/Counter.css";

const Realtime = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set line properties
    ctx.strokeStyle = "#9BD27B";
    ctx.lineWidth = 17;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#121E00";

    const degToRad = (degree) => {
      const factor = Math.PI / 180;
      return degree * factor;
    };

    const renderTime = () => {
      const now = new Date();
      const today = now.toDateString();
      const time = now.toLocaleTimeString("th-TH", { hour12: false });
      const hrs = now.getHours();
      const min = now.getMinutes();
      const sec = now.getSeconds();
      const mil = now.getMilliseconds();
      const smoothsec = sec + mil / 1000;
      const smoothmin = min + smoothsec / 60;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Blue gradient background
      const gradient = ctx.createRadialGradient(250, 250, 5, 250, 250, 250);
      gradient.addColorStop(0, "#262E22");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Hours
      ctx.beginPath();
      ctx.arc(250, 250, 200, degToRad(270), degToRad(hrs * 30 - 90));
      ctx.stroke();

      // Minutes
      ctx.beginPath();
      ctx.arc(250, 250, 170, degToRad(270), degToRad(smoothmin * 6 - 90));
      ctx.stroke();

      // Seconds
      ctx.beginPath();
      ctx.arc(250, 250, 140, degToRad(270), degToRad(smoothsec * 6 - 90));
      ctx.stroke();

      // Date
      ctx.font = "bolder 25px Courier New";
      ctx.fillStyle = "#D8E7CA";
      ctx.fillText(today, 140, 250);

      // Time
      ctx.font = "bolder 25px Courier New";
      ctx.fillStyle = "#D8E7CA";
      ctx.fillText(time + ":" + mil, 165, 280);
    };

    const intervalId = setInterval(renderTime, 40);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Box sx={{display: {xs: "none", md: "flex"}}}>
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          style={{ background: "transparent" }}
        />
      </Box>
      <Counter />
    </div>
  );
};

export default Realtime;

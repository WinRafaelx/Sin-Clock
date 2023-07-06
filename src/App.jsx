import { useState, useEffect } from "react";
import Realtime from "./components/Realtime";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url("https://i.pinimg.com/originals/18/28/d0/1828d026a93f77a1f9554789155c0aee.jpg")`,
        objectFit: "contain",
        color: "#FFFFFF",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor: "#36454F",
        backgroundBlendMode: "multiply",
      }}
    >
      <Realtime />
    </div>
  );
}

export default App;

"use client";


import { useEffect, useState } from "react";

const VideoCapture = () => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.110.85:8080/ws"); // Replace with backend IP address

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.frame) {
        setImageSrc(`data:image/jpeg;base64,${data.frame}`);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => ws.close(); // Close WebSocket when component unmounts
  }, []);

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="Processed Frame" style={{ width: "100%" }} />
      ) : (
        <p>Waiting for video stream...</p>
      )}
    </div>
  );
};

export default VideoCapture;

import React, { useEffect } from "react";
import { LoadingImage } from "../assets/LoadingImage";
import '../../styles/globals.css'; 

const CircleLoading = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      // This logic is kept for future use if needed
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
      <div className="rotating-image">
        <LoadingImage />
      </div>
  );
};

export default CircleLoading;
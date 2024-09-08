import React, { useEffect } from "react";
import { LoadingImageSmall } from "../assets/LoadingImageSmall";
import '../../styles/globals.css'; 

const CircleLoadingSmall = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      // This logic is kept for future use if needed
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
      <div className="rotating-image">
        <LoadingImageSmall />
      </div>
  );
};

export default CircleLoadingSmall;

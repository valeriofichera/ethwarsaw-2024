import React, { useEffect, useState } from "react";

const RetroLoadingScreen = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "."));
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="text-2xl font-bold text-white animate-pulse">
        <span className="font-mono tracking-widest">loading{dots}</span>
        {/* <div className="mt-4 h-2 w-48 bg-green-900 rounded">
          <div className="h-full bg-green-500 rounded animate-[loadingBar_2s_ease-in-out_infinite]"></div>
        </div> */}
      </div>
    </div>
  );
};

export default RetroLoadingScreen;

import { useState, useEffect } from "react";

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    const backHistory = history.slice(0, -1);
    const newHistory = replace ? [...backHistory, mode] : [mode];
    setHistory(prev => [...prev, ...newHistory]);
    setMode(mode);
  };

  const back = () => {
    if (mode !== initial) {
      const backHistory = history.slice(0, -1);
      setMode(backHistory[backHistory.length - 1]);
      setHistory(backHistory);
    } else {
      setMode(initial);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;

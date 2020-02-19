import { useState } from "react";

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
    const backHistory = history.slice(0, -1);
    setMode(mode !== initial ? backHistory[backHistory.length - 1] : initial);
    setHistory(mode !== initial ? backHistory : [initial]);
  };

  return { mode, transition, back };
};

export default useVisualMode;

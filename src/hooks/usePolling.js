import { useRef, useEffect } from "react";

export function usePolling(pollingFunction, interval) {
  const timer = useRef(null);
  const next = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    timer.current = setTimeout(() => {
      pollingFunction(next);
    }, interval);
  }, [timer.current]);
}

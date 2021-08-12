import { useRef, useEffect } from "react";

function useTimeout(callback, delay) {
  const savedCallback = useRef(callback);
  useEffect(() => { savedCallback.current = callback }, [callback]);
  useEffect(() => {
    if (delay === null) return;
    const id = setTimeout(() => savedCallback.current(), delay);
    return () => clearTimeout(id);
  }, [delay]);
}

export default useTimeout;

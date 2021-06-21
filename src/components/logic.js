import React, { useRef, useEffect } from "react";

const useElementOnScreen = (options) => {
  const containerRef = useRef(null);

  const callbackFunction = (entries) => {
    const [entry] = entries;

    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef];
};

export default useElementOnScreen;

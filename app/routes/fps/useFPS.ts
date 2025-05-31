import { useEffect, useState } from "react";

function useFPS() {
  const [fps, setFPS] = useState(0);

  useEffect(() => {
    let id: number,
      count = 0,
      time = performance.now();

    function register() {
      id = requestAnimationFrame(() => {
        count += 1;
        // 1s内
        if (performance.now() - time < 1000) {
          register();
        } else {
          console.log("count:", count);
          setFPS(count);
          count = 0;
          time = performance.now();
          register();
        }
      });
    }

    register();

    return () => {
      cancelAnimationFrame(id);
    };
  }, []);

  return fps;
}

export default useFPS;

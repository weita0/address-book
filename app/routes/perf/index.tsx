import {
  Profiler,
  use,
  useCallback,
  useState,
  type ProfilerOnRenderCallback,
} from "react";
import Child from "./Child";
import "./index.css";
import "animate.css";

function Perf() {
  const [count, setCount] = useState(
    new Array(200).fill(0).map((_, idx) => ({
      id: idx,
      seq: `box-${idx + 1}`,
      dancing: false,
    }))
  );
  const startDancing = useCallback(() => {
    let current = 0;
    setCount((p) => {
      const [p0, ...rest] = p;
      return [{ ...p0, dancing: true }, ...rest];
    });
    let id = setInterval(() => {
      setCount((p) =>
        p.map((item) => ({ ...item, dancing: item.id === current }))
      );
      current++;
      if (current >= count.length) {
        console.log("-- clean up --");
        clearInterval(id);
      }
    }, 1000);
  }, []);
  const add = useCallback(() => {
    setCount((p) => [
      ...p,
      {
        id: p[p.length - 1]?.id + 1,
        seq: `box-${p[p.length - 1].id + 2}`,
        dancing: false,
      },
    ]);
  }, []);
  const onRender: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) => {
    console.log(`${id} - ${phase} - ${actualDuration / 1000}s`);
    console.log(`baseDuration: ${baseDuration / 1000}s`);
    console.log(`startTime: ${startTime / 1000}s`);
    console.log(`commitTime: ${commitTime / 1000}s`);
  };
  return (
    <Profiler id="perf" onRender={onRender}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gridTemplateRows: "auto auto",
          width: "100%",
        }}
      >
        {count.map((item) => (
          <Child key={item.id} id={item.id} dancing={item.dancing}>
            {item.seq}
          </Child>
        ))}
        <Child className="add-btn" id={-1} onClick={add}>
          +
        </Child>
        <Child onClick={startDancing} id={-2}>
          click to dance
        </Child>
      </div>
    </Profiler>
  );
}

export default Perf;

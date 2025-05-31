"use server";
import { useCallback, useEffect, useState, useTransition } from "react";
import "./worker.css";

function heavyWork() {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) sum += Math.floor(Math.random() * 1000);
  return sum;
}

export default function Worker() {
  const [count, setCount] = useState(0);
  const start = useCallback(() => {
    let result = heavyWork();
    console.log("主线程结束", result);
  }, []);

  const startWorker = useCallback(() => {
    if (window.Worker) {
      let worker = new window.Worker("../../workers/index.js");
      worker.onmessage = (e) => {
        console.log("worker: ", e.data);
      };
    }
  }, []);

  const [isPending, startTransition] = useTransition();
  
  console.log('ispending ??', isPending);

  const startHeavyWork = () =>
    startTransition(async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCount((p) => p + 1);
      console.log("end of transition");
      // startTransition(async () => {
      //   await new Promise(resolve => setTimeout(resolve, 2000));
      // });
    });

  // useEffect(() => {
  //   console.log("current url ?", import.meta.url);
  // }, []);

  return (
    <div>
      <h1>web worker test</h1>
      <div>
        <button onClick={start}>start a heavy work</button>
      </div>
      <div>
        <button onClick={startWorker}>start a web work</button>
      </div>
      <div>
        <button onClick={startHeavyWork}>start a transition</button>
      </div>
      <div>
        <button onClick={() => setCount((p) => p + 1)} disabled={isPending}>
          {count}
        </button>
      </div>
    </div>
  );
}

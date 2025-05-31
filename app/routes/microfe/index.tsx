"use client";
import { Link } from "react-router";
// import { injectAction } from "./inject";
import { useTransition } from "react";

function Microfe() {
  const [isPending, startTransition] = useTransition();
  const start = async () => {
    startTransition(async () => {
      const data = await fetch('/api/inject');
      console.log("----- ", data);
    });
  };
  return (
    <div>
      <button onClick={start} disabled={isPending}>
        {isPending ? "Loading..." : "开始"}
      </button>
      <Link to="/">back</Link>
    </div>
  );
}

export default Microfe;

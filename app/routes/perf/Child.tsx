import React, { useCallback, useEffect, useMemo, useRef } from "react";

const handleAnimation = (el: HTMLDivElement) => {
  if (!el) return;
  el.classList.add("animate");
  el.addEventListener("animationend", () => {
    el.classList.remove("animate");
  });
}

function Child({
  children,
  className = "",
  onClick,
  id,
  dancing = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: number;
  dancing?: boolean;
}) {
  let now = performance.now();

  const cal = useMemo(() => {
    let r = 0;
    for (let i = 0; i < 10000000; i++) {
      r += Math.floor(Math.random() * 10);
    }
    return r;
  }, [now]);
  // console.log(`${id}_cal: `, cal);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseEnter = (el: MouseEvent) => {
      if (!el.target) return;
      (el.target as HTMLDivElement).classList.add("animate");
    };
    const handleAnimationEnd = (el: AnimationEvent) => {
      if (!el.target) return;
      (el.target as HTMLDivElement).classList.remove("animate");
    };
    if (ref.current) {
      const element = ref.current as HTMLDivElement;
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("animationend", handleAnimationEnd);
    }
    return function cleanup() {
      ref.current?.removeEventListener("mouseenter", handleMouseEnter);
      ref.current?.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);
  const handleClick = useCallback(() => {
    onClick?.(); 
    if (ref.current) {
      ref.current.classList.add("animate");
    }
    ref.current?.addEventListener("animationend", () => {
      ref.current?.classList.remove("animate");
    })
  }, [onClick]);

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`box${className ? ` ${className}` : ""}${
        dancing ? " bounce" : ""
      }`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
        width: "100%",
        border: "1px solid black",
        backgroundColor: "#f0f0f0",
        textAlign: "center",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {children}
    </div>
  );
}

export default React.memo(Child);
// export default Child;

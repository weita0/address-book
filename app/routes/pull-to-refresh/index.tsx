import React, { useEffect, useRef, useState } from "react";
import spinner from "./spinner.svg";
import Card from "./card";
import "./index.css";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function PullToRefresh({
  onRefresh,
  children,
}: {
  children: React.ReactNode;
  onRefresh: () => void;
}) {
  const startY = useRef(0);
  const [pulling, setPulling] = useState(false);
  const [translateY, setTranslateY] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    // 在顶部
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      setPulling(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!pulling) return;
    const deltaY = e.touches[0].clientY - startY.current;
    console.log(deltaY);
    if (deltaY > 0) {
      setTranslateY(Math.min(deltaY, 100)); // 限制最大下拉距离为80px
    }
  };

  const handleTouchEnd = async (e: React.TouchEvent) => {
    if (translateY >= 100) {
      setLoading(true);
      setTranslateY(80);
      try {
        await onRefresh();
      } catch (err) {
        console.log(err);
      }
    }
    setTranslateY(0);
    setPulling(false);
    setLoading(false);
  };
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translateY(${translateY}px)`,
        transition: pulling ? "none" : "transform 0.3s ease",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      {(translateY > 0 || loading) && (
        <div
          className="w-full flex items-center justify-center absolute"
          style={{
            height: `${translateY}px`,
            top: `-${translateY}px`,
            overflow: "hidden",
          }}
        >
          <img
            src={spinner}
            width={44}
            style={{
              scale: !loading ? translateY / 100 : 1,
            }}
            className={loading ? "animate-spin" : ""}
          />
        </div>
      )}
      {children}
    </div>
  );
}

function App() {
  const [list, setList] = useState<string[]>([]);
  // const [loading, setLoading] = useState(false);
  const request = async () => {
    // setLoading(true);
    console.log(" -- make a request --");
    const count = 10;
    const styles = ["earth", "cold", "warm", "morandi"];
    const getIdx = () => Math.floor(Math.random() * styles.length);
    const idx1 = getIdx();
    let idx2 = getIdx();
    // 确保 idx2 不等于 idx1
    while (idx2 === idx1) {
      idx2 = getIdx();
    }
    let style1 = styles[idx1];
    let style2 = styles[idx2];
    const [left, right] = await Promise.all([
      fetch(`http://192.168.31.94:3000/${count}?style=${style1}`).then((res) =>
        res.json()
      ),
      fetch(`http://192.168.31.94:3000/${count}?style=${style2}`).then((res) =>
        res.json()
      ),
    ]);
    let i = 0,
      res: string[] = [];
    while (i < left.length || i < right.length) {
      if (left[i]) {
        res.push(left[i]);
      }
      if (right[i]) {
        res.push(right[i]);
      }
      i++;
    }
    // setLoading(false);
    setList(res);
  };
  useEffect(() => {
    request();
  }, []);

  return (
    <PullToRefresh onRefresh={request}>
      {/* loading && (
        <div className="flex flex-col items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-transparent z-1000">
          <img src={spinner} width={45} className="animate-spin" />
          <div className="text-white">加载中...</div>
        </div>
      ) */}
      <div className="h-screen w-full grid grid-cols-2 z-2000">
        <div className="flex flex-col items-center justify-start w-full">
          {list
            .filter((_, idx) => idx % 2 === 0)
            .map((color, idx) => (
              <Card key={idx} color={color} left>
                {color}
              </Card>
            ))}
        </div>
        <div className="flex flex-col items-center justify-start w-full">
          {list
            .filter((_, idx) => idx % 2 === 1)
            .map((color, idx) => (
              <Card key={idx} color={color}>
                {color}
              </Card>
            ))}
        </div>
      </div>
    </PullToRefresh>
  );
}

export default App;

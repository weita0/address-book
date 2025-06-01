"use client";
import React, { useEffect, useRef, useState, lazy } from "react";
import imgSrc0 from "./images/building.jpg";
import imgSrc1 from "./images/galaxy.jpg";
import imgSrc2 from "./images/leaves.jpg";
import imgSrc3 from "./images/painting.jpg";
import imgSrc4 from "./images/lake.jpg";
import imgSrc5 from "./images/sunshine.jpg";
import imgSrc6 from "./images/village.jpg";
import imgSrc7 from "./images/snowmountain.jpg";
import imgSrc8 from "./images/x-box.jpg";
import imgSrc9 from "./images/eagle.jpg";
import spinner from "./spinner2.svg";
import WorkerPool from "./pool";
import { applyGaussianBlur } from "./gaussian";
import "./index.css";

const images = [
  imgSrc2,
  imgSrc1,
  imgSrc3,
  imgSrc4,
  imgSrc5,
  imgSrc6,
  imgSrc7,
  imgSrc8,
  imgSrc9,
  imgSrc0,
];

function dealWithImage(buffer: ArrayBuffer, width: number, height: number) {
  const input = new Uint8ClampedArray(buffer);
  const output = new Uint8ClampedArray(input.length);

  applyGaussianBlur(input, output, width, height, {
    kernelSize: 7,
    sigma: 1.5,
  });

  return output;
}

// const safeWindow = typeof window !== "undefined" ? window : null;

const WIDTH = 1200;

export default function WebWorkerDemo() {
  const [loading, setLoading] = useState(false);
  const pool = useRef<WorkerPool>(null);

  // const getWidth = () => safeWindow?.innerWidth || WIDTH;

  useEffect(() => {
    const init = (src: string, idx: number) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        const container = document.getElementById(`slot-${idx}`);
        if (!container) return;
        // const width = img.width;
        // const height = img.height;
        // canvas.width = img.width;
        // canvas.height = img.height;
        const width = WIDTH;
        const heightOnWidth = img.height / img.width;
        const height = heightOnWidth * width;
        canvas.width = width;
        canvas.height = height;

        container.appendChild(canvas);

        const ctx = canvas.getContext("2d");

        ctx?.drawImage(img, 0, 0, width, height);
      };
    };
    images.forEach((src, idx) => {
      init(src, idx);
    });
    pool.current = new WorkerPool("./worker", 3);
    // 清理函数，终止所有 worker
    return () => {
      pool.current?.terminate();
      pool.current = null;
    };
  }, []);

  const startProcessing = () => {
    setLoading(true);
    const now = performance.now();
    document.querySelectorAll("canvas").forEach((canvas, idx) => {
      const ctx = canvas.getContext("2d");

      const width = canvas.width;
      const height = canvas.height;

      const imageData = ctx?.getImageData(0, 0, width, height);
      const buffer = imageData?.data.buffer;

      // 同步
      // const processedData = dealWithImage(buffer as ArrayBuffer, width, height);
      // ctx?.putImageData(new ImageData(processedData, width, height), 0, 0);

      pool.current
        ?.runTask(buffer as ArrayBuffer, width, height)
        .then((processed) => {
          const processedData = new Uint8ClampedArray(processed);
          ctx?.putImageData(new ImageData(processedData, width, height), 0, 0);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    console.log(`timing: ${(performance.now() - now) / 1000}s`);
    setLoading(false);
  };

  return (
    <div>
      <div className="font-bold">web worker demo</div>
      <button
        className="mt-10 w-40 flex justify-center"
        disabled={loading}
        onClick={startProcessing}
      >
        {loading ? (
          <img className="animate-spin" src={spinner} width={20} />
        ) : (
          "start processing"
        )}
      </button>
      <div className="flex flex-col gap-10">
        {images.map((src, idx) => (
          <div id={`slot-${idx}`} key={idx} className="flex flex-row gap-10">
            {/* <img src={src} width={WIDTH} /> */}
          </div>
        ))}
      </div>
    </div>
  );
}

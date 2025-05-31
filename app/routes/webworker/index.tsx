"use client";
import React, { useEffect, useRef, useState, lazy } from "react";
import imgSrc0 from "./images/building.jpg";
import imgSrc1 from "./images/galaxy.jpg";
import imgSrc2 from "./images/leaves.jpg";
import imgSrc3 from "./images/painting.jpg";
import spinner from "./spinner2.svg";
import "./index.css";
import WorkerPool from "./pool";


const images = [imgSrc1, imgSrc2, imgSrc3, imgSrc0];

function dealWithImage(buffer: ArrayBuffer) {
  const pixels = new Uint8ClampedArray(buffer); // 重建视图
  const len = pixels.length;

  for (let i = 0; i < len; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // 简单灰度算法
    const gray = 0.3 * r + 0.59 * g + 0.11 * b;

    pixels[i] = pixels[i + 1] = pixels[i + 2] = gray;
    // pixels[i + 3] 是 alpha，不变
  }
  return buffer;
}

const WIDTH = 1000;

const getWidth = () => {
  return window?.innerWidth / 2 || WIDTH;
};


export default function WebWorkerDemo() {
  // const container = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const processImage = (src: string, idx: number) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas: HTMLCanvasElement = document.createElement("canvas");
      const container = document.getElementById(`slot-${idx}`);

      if (!container) return;

      const width = getWidth();

      const heightOnWidth = img.height / img.width;
      const height = heightOnWidth * width;

      canvas.width = width;
      canvas.height = height;

      container.appendChild(canvas);

      const ctx = canvas.getContext("2d");

      ctx?.drawImage(img, 0, 0, width, height);

      // const imageData = ctx?.getImageData(0, 0, width, height);
      // const buffer = imageData?.data.buffer;

      // const processed = dealWithImage(buffer as ArrayBuffer);
      // const processedData = new Uint8ClampedArray(processed);
      // ctx?.putImageData(new ImageData(processedData, width, height), 0, 0);
    };
  };

  const startProcessing = () => {
    setLoading(true);
    images.forEach((src, idx) => {
      processImage(src, idx);
    });
    setLoading(false);
  };
  
  useEffect(() => {
    const pool = new WorkerPool('./worker.js', 3);
    images.forEach((src, idx) => {
      pool.runTask({ src, idx }).then((result) => {})
    })
  }, []);
  
  return (
    <div>
      <div className="font-bold">web worker demo</div>
      <div className="flex flex-col gap-10">
        {images.map((src, idx) => (
          <div id={`slot-${idx}`} key={idx} className="flex flex-row gap-10">
            <img src={src} width={getWidth()} />
          </div>
        ))}
      </div>
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
    </div>
  );
}

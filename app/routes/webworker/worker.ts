import { applyGaussianBlur } from "./gaussian";

self.onmessage = (e: MessageEvent) => {
  const {
    taskId,
    payload: buffer,
    width,
    height,
    kernelSize = 7,
    sigma = 1.5,
  } = e.data;
  const input = new Uint8ClampedArray(buffer);
  const output = new Uint8ClampedArray(input.length);

  applyGaussianBlur(input, output, width, height, {
    kernelSize,
    sigma,
  });

  // @ts-ignore
  self.postMessage({ taskId, result: output.buffer, width, height }, [
    output.buffer,
  ]);
};

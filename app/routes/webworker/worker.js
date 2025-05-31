self.onmessage = function (e) {
  console.log('-- begin --');
  const { taskId, payload: buffer } = e.data;

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

  // 处理完再传回主线程
  console.log('-- done --');
  self.postMessage({ taskId, result: buffer }, [buffer]);
};

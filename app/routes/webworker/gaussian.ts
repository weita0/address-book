interface BlurOptions {
  kernelSize: number; // 如 3, 5, 7
  sigma: number; // 标准差
}

/**
 * 主函数：对 RGBA 图像数据执行高斯模糊
 */
export function applyGaussianBlur(
  input: Uint8ClampedArray,
  output: Uint8ClampedArray,
  width: number,
  height: number,
  options: BlurOptions
) {
  const { kernelSize, sigma } = options;
  const kernel = generateGaussianKernel(kernelSize, sigma);
  const half = Math.floor(kernelSize / 2);

  const getIndex = (x: number, y: number) => (y * width + x) * 4;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0,
        a = 0;
      let weightSum = 0;

      for (let ky = -half; ky <= half; ky++) {
        for (let kx = -half; kx <= half; kx++) {
          const px = x + kx;
          const py = y + ky;

          // 边界检查
          if (px < 0 || px >= width || py < 0 || py >= height) continue;

          const weight = kernel[ky + half][kx + half];
          const idx = getIndex(px, py);

          r += input[idx] * weight;
          g += input[idx + 1] * weight;
          b += input[idx + 2] * weight;
          a += input[idx + 3] * weight;
          weightSum += weight;
        }
      }

      const outIdx = getIndex(x, y);
      output[outIdx] = r / weightSum;
      output[outIdx + 1] = g / weightSum;
      output[outIdx + 2] = b / weightSum;
      output[outIdx + 3] = a / weightSum;
    }
  }
}

function generateGaussianKernel(size: number, sigma: number): number[][] {
  const kernel: number[][] = [];
  const center = Math.floor(size / 2);
  const sigma2 = sigma * sigma;
  let sum = 0;

  for (let y = 0; y < size; y++) {
    kernel[y] = [];
    for (let x = 0; x < size; x++) {
      const dx = x - center;
      const dy = y - center;
      const weight = Math.exp(-(dx * dx + dy * dy) / (2 * sigma2));
      kernel[y][x] = weight;
      sum += weight;
    }
  }

  // 归一化权重
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      kernel[y][x] /= sum;
    }
  }

  return kernel;
}

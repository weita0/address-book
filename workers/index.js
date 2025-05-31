self.postMessage('worker 已启动');

let sum = 0;
for (let i = 0; i < 1e9; i++) sum += Math.floor(Math.random() * 1000);
self.postMessage(`worker 完成计算: ${sum}`);
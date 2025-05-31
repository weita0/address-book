/**
 * 线程池
 */

type TaskPayload = Transferable;
type TaskResult = any;

interface Task {
  taskId: number;
  payload: TaskPayload;
}

interface Callback {
  resolve: (value: TaskResult) => void;
  reject: (reason?: any) => void;
}

export default class WorkerPool {
  maxWorkers: number;
  workerUrl: string;
  pool: Worker[] = [];
  idle: Worker[] = [];
  taskQueue: Task[] = [];
  taskIdCounter: number = 0;
  callbacks: Map<number, Callback> = new Map();

  constructor(workerUrl: string, maxWorkers = 4) {
    this.maxWorkers = maxWorkers;
    this.workerUrl = workerUrl;

    for (let i = 0; i < maxWorkers; i++) {
      const worker = new Worker(workerUrl);
      worker.onmessage = (e: MessageEvent) => this.handleWorkerMsg(worker, e);
      this.pool.push(worker);
      this.idle.push(worker);
    }
  }

  runTask(payload: TaskPayload): Promise<TaskResult> {
    const taskId = this.taskIdCounter++;

    const task: Task = { taskId, payload };

    return new Promise((resolve, reject) => {
      this.callbacks.set(taskId, { resolve, reject });

      const worker = this.idle.pop();
      if (worker) {
        worker.postMessage(task);
      } else {
        this.taskQueue.push(task);
      }
    });
  }

  private handleWorkerMsg(worker: Worker, e: MessageEvent) {
    const { taskId, result } = e.data;
    const cb = this.callbacks.get(taskId);
    if (cb) {
      cb.resolve(result);
      this.callbacks.delete(taskId);
    }

    if (this.taskQueue.length > 0) {
      const nextTask = this.taskQueue.shift()!;
      worker.postMessage(nextTask);
    } else {
      this.idle.push(worker);
    }
  }

  terminate() {
    this.pool.forEach((worker) => worker.terminate());
    this.pool = [];
    this.idle = [];
    this.taskQueue = [];
    this.callbacks.clear();
  }
}

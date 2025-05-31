class ProxySandbox {
  isRunning: boolean;
  proxyWindow: any;

  constructor() {
    this.isRunning = false;
    
    const fakeWindow = Object.create(null);
    
    const _this = this;
    
    this.proxyWindow = new Proxy(fakeWindow, {
      set(target, prop, value) {
        if (_this.isRunning) {
          target[prop] = value;
          return true;
        }
        return true;
      },
      get(target, prop) {
        return prop in target ? target[prop] : (window as any)[prop];
      }
    })
  }
  
  active() {
    this.isRunning = true;
  }
  
  inactive() {
    this.isRunning = false;
  }
}

export default ProxySandbox;
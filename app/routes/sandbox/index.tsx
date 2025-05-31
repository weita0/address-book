import { useEffect } from "react";
import ProxySandbox from "./sanbox";

export default function Sandbox() {
  useEffect(() => {
    (window as any).city = '北京'
    const p1 = new ProxySandbox();
    const p2 = new ProxySandbox();
    p1.active();
    // p2.active();
    p1.proxyWindow.city = 'shanghai';
    p2.proxyWindow.city = 'hangzhou';
    
    console.log((window as any).city);
    
    // p2.inactive();
    console.log(p2.proxyWindow.city);
  }, []);
  return (
    <div>
      <h1>Sandbox</h1>
    </div>
  );
}

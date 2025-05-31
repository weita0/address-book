export default function SlowComp() {
  let now = performance.now();
  while (performance.now() - now < 20) {
    // busy wait for 1 second
  }
  return <div>慢组件</div>;
}

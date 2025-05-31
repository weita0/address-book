import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <p id="index-page">
        This is a demo for React Router.
        <br />
        Check out{" "}
        <a href="https://reactrouter.com">the docs at reactrouter.com</a>.
      </p>
      <p>
        <Link to="/worker">Web workder</Link>
      </p>
      <p>
        <Link to="/calendar">Calendar</Link>
      </p>
      <p>
        <Link to="/h5">H5</Link>
      </p>
      <p>
        <Link to="/microfe">Microfe</Link>
      </p>
      <p>
        <Link to="/sandbox">Sandbox</Link>
      </p>
      <p>
        <Link to="/gauge">Gauge</Link>
      </p>
      <p>
        <Link to="/performance">Performance</Link>
      </p>
      <p>
        <Link to="/perf">Perf</Link>
      </p>
      <p>
        <Link to="/react">React</Link>
      </p>
      <p>
        <Link to="/pull-to-refresh">Pull to Refresh</Link>
      </p>
      <p>
        <Link to="/arraybuffer">ArrayBuffer</Link>
      </p>
      <p>
        <Link to="/fps">FPS</Link>
      </p>
      <p>
        <Link to="/webworker">Web Worker Demo</Link>
      </p>
    </>
  );
}

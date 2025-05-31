import { useState } from "react";
import SlowComp from "./SlowComp";

function Index() {
  const [input, setInput] = useState("");
  const [showList, setShowList] = useState(false);

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="try input something"
      />
      <button onClick={() => setShowList((p) => !p)}>切换显示列表</button>
      {showList && new Array(100).fill(0).map((_, i) => <SlowComp key={i} />)}
    </div>
  );
}

export default Index;

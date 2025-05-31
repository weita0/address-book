import { act } from "react";
import ReactDOM from "react-dom/client";
import ReactPage from "@/routes/react";

it("can render and update a counter", async () => {
  let container = document.createElement("div");
  document.body.appendChild(container);

  // ✅ Render the component inside act().
  await act(() => {
    ReactDOM.createRoot(container).render(<ReactPage />);
  });
  
  const h1 = container.querySelector("h1");
  expect(h1?.textContent).toBe("React Research");

});

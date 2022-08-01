import { useEffect, useState } from "react";
import { renderChild } from "./components/renderChild/renderChild";
import "./styles.css";

export default function App() {
  const [currentState, setCurrentState] = useState(
    JSON.parse(localStorage.getItem("data"))
  );
  const [needToUpdate, setNeedToUpdate] = useState(false);

  useEffect(() => {
    setCurrentState({ ...currentState });
    localStorage.setItem("data", JSON.stringify({ ...currentState }));
  }, [needToUpdate]);

  useEffect(() => {
    if (localStorage.getItem("data") === null) {
      localStorage.setItem("data", JSON.stringify({ childs: [] }));
    }
    const temp = JSON.parse(localStorage.getItem("data"));
    if (temp.childs === undefined) {
      temp.childs = [];
      temp.childs.length = 1;
    }

    setCurrentState(temp);
  }, []);

  return (
    <div className="App">
      {renderChild(currentState, needToUpdate, setNeedToUpdate)}
    </div>
  );
}

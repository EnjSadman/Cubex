import "./styles.css";
import { List } from "./components/List/List.js";
import { useEffect } from "react";

const startArr = [
  {
    id: 1,
    value: "1",
    sublist: []
  },
  {
    id: 2,
    value: "2",
    sublist: []
  },
  {
    id: 3,
    value: "3",
    sublist: []
  }
];

export default function App() {
  useEffect(() => {
    localStorage.setItem("arr", JSON.stringify(startArr));
  }, []);
  return (
    <div className="App">
      <List />
    </div>
  );
}

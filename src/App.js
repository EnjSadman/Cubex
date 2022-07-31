import "./styles.css";
import { List } from "./components/List/List.js";
import { useEffect } from "react";

const startArr = [
  {
    id: 1,
    value: "first",
    sublist: []
  },
  {
    id: 2,
    value: "second",
    sublist: []
  },
  {
    id: 3,
    value: "third",
    sublist: []
  }
];

export default function App() {
  useEffect(() => {
    if (
      localStorage.getItem("arr") === null ||
      JSON.parse(localStorage.getItem("arr")).length === 0
    ) {
      console.log(JSON.parse(localStorage.getItem("arr")).length);
      localStorage.setItem("arr", JSON.stringify(startArr));
    }
  }, []);
  return (
    <div className="App">
      <List />
    </div>
  );
}

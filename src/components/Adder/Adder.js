import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Adder.css";

export const Adder = ({ child, update, setUpdate }) => {
  const [inputText, setInputText] = useState("");

  return (
    <div className="adder">
      <input
        type="text"
        value={inputText}
        onChange={(event) => {
          setInputText(event.target.value);
        }}
      />
      <button
        type="button"
        className="button item__button--add"
        onClick={() => {
          if (child.childs[0] === undefined || child.childs[0] === null) {
            child.childs.shift();
          }

          child.childs = [
            ...child.childs,
            {
              id: uuidv4(),
              order: child.childs.length,
              value: inputText,
              childs: []
            }
          ];
          setUpdate(!update);
        }}
      >
        add +
      </button>
    </div>
  );
};

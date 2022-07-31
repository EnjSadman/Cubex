import { useEffect, useState } from "react";
import "./Sublist.css";

export const Sublist = ({ id }) => {
  const wholeList = JSON.parse(localStorage.getItem("arr"));
  const [sublistArrayData, setSublistArrayData] = useState(
    wholeList.find((el) => id === el.id).sublist
  );
  const [itemValue, setItemValue] = useState("");

  useEffect(() => {
    const temp = wholeList[id - 1];

    if (sublistArrayData.length > 0) {
      temp.sublist = [...sublistArrayData];
    }

    wholeList[id - 1] = { ...temp };

    localStorage.clear();
    localStorage.setItem("arr", JSON.stringify(wholeList));
  }, [sublistArrayData]);

  return (
    <ul className="sublist">
      {sublistArrayData.map((subEl) => (
        <li className="item" key={subEl.id}>
          {subEl.value}
        </li>
      ))}
      <li>
        <input
          value={itemValue}
          type="text"
          onChange={(event) => {
            setItemValue(event.target.value);
          }}
        />
        <button
          type="button"
          onClick={() => {
            const temp = {
              id: sublistArrayData.length + 1,
              value: itemValue
            };
            setSublistArrayData([...sublistArrayData, temp]);
          }}
        >
          add item
        </button>
      </li>
    </ul>
  );
};

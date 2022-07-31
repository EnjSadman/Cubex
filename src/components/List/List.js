import { useEffect, useState } from "react";
import { Sublist } from "../Sublist/Sublist";

import "./List.css";

export const List = () => {
  const [addValue, setAddValue] = useState("");
  const [listData, setListData] = useState([]);

  useEffect(() => {
    setListData(JSON.parse(localStorage.getItem("arr")));
  }, []);

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("arr", JSON.stringify(listData));
  }, [listData]);

  return (
    <ul className="list">
      {listData.map((el, index) => (
        <li className="list__item" key={el.id}>
          <p className="list__item--paragraph">{el.value}</p>
          <button
            className="button up__button"
            type="button"
            onClick={() => {
              if (index !== 0) {
                const tempArr = [...listData];
                const temp = tempArr[index];
                tempArr[index] = tempArr[index - 1];
                tempArr[index - 1] = temp;

                setListData(tempArr);
              }
            }}
          >
            up &#8593;
          </button>
          <button
            className="button down__button"
            type="button"
            onClick={() => {
              if (index !== listData.length - 1) {
                const tempArr = [...listData];
                const temp = tempArr[index];
                tempArr[index] = tempArr[index + 1];
                tempArr[index + 1] = temp;

                setListData(tempArr);
              }
            }}
          >
            down &#8595;
          </button>
          {el.sublist.length === 0 && (
            <button
              className="button add__button"
              type="button"
              onClick={() => {
                el.sublist.push({
                  id: el.sublist.length + 1,
                  value: "1"
                });
                setListData([...listData]);
              }}
            >
              add sublist +
            </button>
          )}
          {el.sublist.length > 0 && (
            <button
              className="button remove__button"
              type="button"
              onClick={() => {
                el.sublist = [];
                setListData([...listData]);
              }}
            >
              remove sublist -
            </button>
          )}
          <button
            className="button remove__button"
            type="button"
            onClick={() => {
              setListData(
                listData.filter((el, indexFilter) => index !== indexFilter)
              );
            }}
          >
            remove -
          </button>
          {el.sublist.length > 0 && (
            <Sublist id={index + 1} sublistArray={el.sublist} />
          )}
        </li>
      ))}
      <li className="list__item">
        <input
          className="list__item--input"
          placeholder="enter value"
          type="text"
          value={addValue}
          onChange={(event) => {
            setAddValue(event.target.value);
          }}
        />
        <button
          className="button add__button"
          type="button"
          onClick={() => {
            if (addValue !== "") {
              const temp = {
                id: listData.length + 1,
                value: addValue,
                sublist: []
              };
              setListData([...listData, temp]);
              setAddValue("");
            }
          }}
        >
          add +
        </button>
      </li>
    </ul>
  );
};

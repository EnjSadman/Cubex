import { useEffect, useState } from "react";
import { Sublist } from "../Sublist/Sublist";

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
    <ul>
      {listData.map((el, index) => (
        <li key={el.id}>
          {el.value}
          <button
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
            up
          </button>
          <button
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
            down
          </button>
          {el.sublist.length === 0 && (
            <button
              type="button"
              onClick={() => {
                el.sublist.push({
                  id: el.sublist.length + 1,
                  value: "1"
                });
                setListData([...listData]);
              }}
            >
              add sublist
            </button>
          )}
          {el.sublist.length > 0 && (
            <button
              type="button"
              onClick={() => {
                el.sublist = [];
                setListData([...listData]);
              }}
            >
              remove sublist
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setListData(
                listData.filter((el, indexFilter) => index !== indexFilter)
              );
            }}
          >
            remove
          </button>
          {el.sublist.length > 0 && (
            <Sublist id={index + 1} sublistArray={el.sublist} />
          )}
        </li>
      ))}
      <li>
        <input
          type="text"
          value={addValue}
          onChange={(event) => {
            setAddValue(event.target.value);
          }}
        />
        <button
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
          add
        </button>
      </li>
    </ul>
  );
};

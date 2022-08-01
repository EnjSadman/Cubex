import { Adder } from "../Adder/Adder";
import { v4 as uuidv4 } from "uuid";

export const renderChild = (child, update, setUpdate) => {
  if (child !== undefined && child.childs[0] !== null) {
    return (
      <ul className="list">
        {child.childs
          .sort((a, b) => a.order - b.order)
          .map((el, index) => (
            <li className="list__item item" key={uuidv4()}>
              <p className="item__paragraph">{el.value}</p>
              {el.order !== child.childs[0].order && (
                <button
                  type="button"
                  className="button item__button--up"
                  onClick={() => {
                    child.childs[index - 1].order += 1;
                    el.order -= 1;
                    setUpdate(!update);
                  }}
                >
                  up &#8593;
                </button>
              )}
              {el.order !== child.childs[child.childs.length - 1].order && (
                <button
                  className="button item__button--down"
                  onClick={() => {
                    child.childs[index + 1].order -= 1;
                    el.order += 1;
                    setUpdate(!update);
                  }}
                >
                  down &#8595;
                </button>
              )}
              {el.childs.length > 0 ? (
                <button
                  className="button item__button--remove"
                  type="button"
                  onClick={() => {
                    el.childs = [];
                    setUpdate(!update);
                  }}
                >
                  remove sublist -
                </button>
              ) : (
                <button
                  type="button"
                  className="button item__button--add"
                  onClick={() => {
                    el.childs.length = 1;
                    setUpdate(!update);
                  }}
                >
                  add sublist +
                </button>
              )}
              <button
                type="button"
                className="button item__button--remove"
                onClick={() => {
                  child.childs.splice(index, 1);
                  setUpdate(!update);
                }}
              >
                delete
              </button>
              {renderChild(el, update, setUpdate)}
            </li>
          ))}
        {child.childs.length > 0 && (
          <Adder child={child} update={update} setUpdate={setUpdate} />
        )}
      </ul>
    );
  } else {
    return <Adder child={child} update={update} setUpdate={setUpdate} />;
  }
};

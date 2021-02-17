import React, { useEffect, useReducer } from "react";
import ButtonBase from "../Button/Button";
import style from "./Table.module.css";
import classNames from "classnames";
import { initialState, reducer } from "./consts";
import { Empty } from "antd";
import Paginator from "../Paginator/Paginator";

const Table = ({ data, currentPage, totalItemsCount, setCurrentPage, pageSize }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: "SET_DATA_SOURCE", data: data });
    if (totalItemsCount > 50) {
      let dataPortion = state.dataSource.slice(
        (currentPage - 1) * 50,
        currentPage * 50
      );
      dispatch({ type: "SET_TABLE_DATA_PORTION", data: dataPortion });
    } else {
      dispatch({ type: "SET_TABLE_DATA_PORTION", data: data });
    }
  }, [currentPage, state.dataSource, data]);

  const sortId = () => {
    const key = "id";
    let newData;
    if (state.id === "increase") {
      newData = [...state.dataSource.sort((a, b) => a[key] - b[key])];

      dispatch({ type: "DEFAULT_SORT_ICONS" });
    } else {
      newData = [...state.dataSource.sort((a, b) => b[key] - a[key])];

      dispatch({ type: "DEFAULT_SORT_ICONS" });
      dispatch({ type: "SET_SORTING_ID_ICON" });
    }
    dispatch({ type: "SET_DATA_SOURCE", data: newData });
  };

  const sortPhone = () => {
    const key = "phone";
    if (state.phone === "increase") {
      let newData = [
        ...state.dataSource.sort((a, b) =>
          a[key].substring(1, a.length) < b[key].substring(1, b.length)
            ? -1
            : a[key].substring(1, a.length) > b[key].substring
            ? 1
            : 0
        ),
      ];
      dispatch({ type: "SET_DATA_SOURCE", data: newData });
      dispatch({ type: "DEFAULT_SORT_ICONS" });
    } else {
      let newData = [
        ...state.dataSource.sort((a, b) =>
          a[key].substring(1, a.length) < b[key].substring(1, b.length)
            ? 1
            : a[key].substring(1, a.length) > b[key].substring(1, b.length)
            ? -1
            : 0
        ),
      ];
      dispatch({ type: "SET_DATA_SOURCE", data: newData });
      dispatch({ type: "DEFAULT_SORT_ICONS" });
      dispatch({ type: "SET_SORTING_PHONE_ICON" });
    }
  };

  const sortStrings = (key) => {
    if (state[key] === "increase") {
      let newData = [
        ...state.dataSource.sort((a, b) =>
          a[key].toLowerCase() < b[key].toLowerCase()
            ? -1
            : a[key].toLowerCase() > b[key].toLowerCase()
            ? 1
            : 0
        ),
      ];
      dispatch({ type: "SET_DATA_SOURCE", data: newData });
      dispatch({ type: "DEFAULT_SORT_ICONS" });
    } else {
      let newData = [
        ...state.dataSource.sort((a, b) =>
          a[key].toLowerCase() < b[key].toLowerCase()
            ? 1
            : a[key].toLowerCase() > b[key].toLowerCase()
            ? -1
            : 0
        ),
      ];
      dispatch({ type: "SET_DATA_SOURCE", data: newData });
      dispatch({ type: "DEFAULT_SORT_ICONS" });
      if (key === "firstName") {
        dispatch({ type: "SET_SORTING_FIRSTNAME_ICON" });
      } else if (key === "lastName") {
        dispatch({ type: "SET_SORTING_LASTNAME_ICON" });
      } else if (key === "email") {
        dispatch({ type: "SET_SORTING_EMAIL_ICON" });
      }
    }
  };
  const sortFirstName = () => {
    sortStrings("firstName");
  };

  const sortLastName = () => {
    sortStrings("lastName");
  };

  const sortEmail = () => {
    sortStrings("email");
  };

  const handleBackdropClick = () => {
    dispatch({ type: "SET_SELECTED_ITEM", item: null });
    dispatch({ type: "SET_IS_VISIBLE_BACKDROP", payload: false });
  };

  const tableRows = state.tableDataPortion.map((item) => {
    const handleRowClick = (e) => {
      e.preventDefault();
      dispatch({ type: "SET_SELECTED_ITEM", item: item });
      dispatch({ type: "SET_IS_VISIBLE_BACKDROP", payload: true });
    };
    return (
      <tr
        key={item.key}
        className={classNames(style.row, {
          [style.activeRow]: state.selectedItem === item,
        })}
        onClick={handleRowClick}
      >
        <td className={style.cellNumber}>
          {(currentPage - 1) * 50 + state.tableDataPortion.indexOf(item) + 1}
        </td>
        <td className={style.cell}>{item.id}</td>
        <td className={style.cell}>{item.firstName}</td>
        <td className={style.cell}>{item.lastName}</td>
        <td className={style.cell}>{item.email}</td>
        <td className={style.cell}>{item.phone}</td>
      </tr>
    );
  });

  return (
    <>
      <div
        onClick={handleBackdropClick}
        className={classNames(style.backdrop, {
          [style.backdropActive]: state.isVisibleBackdrop === true,
        })}
      />
      <Paginator
          setCurrentPage={setCurrentPage}
          totalItemsCount={totalItemsCount}
          pageSize={pageSize}
          currentPage={currentPage}
      />
      {state.tableDataPortion.length === 0 ? (
        <Empty />
      ) : (
        <table className={style.table}>
          <thead className={style.titleRow}>
            <tr>
              <th className={style.cellNumber}>№</th>
              <th className={style.titleCell}>
                <ButtonBase condition={state.id} props={{ onClick: sortId }}>
                  Id
                </ButtonBase>
              </th>
              <th className={style.titleCell}>
                <ButtonBase
                  condition={state.firstName}
                  props={{ onClick: sortFirstName }}
                >
                  FirstName
                </ButtonBase>
              </th>
              <th className={style.titleCell}>
                <ButtonBase
                  condition={state.lastName}
                  props={{ onClick: sortLastName }}
                >
                  LastName
                </ButtonBase>
              </th>
              <th className={style.titleCell}>
                <ButtonBase
                  condition={state.email}
                  props={{ onClick: sortEmail }}
                >
                  Email
                </ButtonBase>
              </th>
              <th className={style.titleCell}>
                <ButtonBase
                  condition={state.phone}
                  props={{ onClick: sortPhone }}
                >
                  Phone
                </ButtonBase>
              </th>
            </tr>
          </thead>
          <tbody>{state.tableDataPortion && tableRows}</tbody>
        </table>
      )}
      {state.selectedItem && (
        <div className={style.selectedItemBlock}>
          <p>
            Выбран пользователь:{" "}
            <b>
              {" "}
              {state.selectedItem.firstName} {state.selectedItem.lastName}
            </b>
          </p>
          <p>Описание:</p>
          <textarea value={state.selectedItem.description} readOnly />
          <p>
            Адрес проживания: <b>{state.selectedItem.address.streetAddress}</b>
          </p>
          <p>
            Город: <b>{state.selectedItem.address.city}</b>
          </p>
          <p>
            Провинция/штат: <b>{state.selectedItem.address.state}</b>
          </p>
          <p>
            Индекс: <b>{state.selectedItem.address.zip}</b>
          </p>
        </div>
      )}
    </>
  );
};

export default Table;


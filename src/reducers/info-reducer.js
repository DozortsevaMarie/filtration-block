import { infoAPI } from "../api";

const SET_ITEMS = "SET_ITEMS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const ADD_NEW_ITEM = "ADD_NEW_ITEM";
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT";

const initialState = {
  items: [],
  currentPage: 1,
  totalItemsCount: 0,
  pageSize: 50,
};

const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return {
        ...state,
        items: action.data.map((item) => ({
          ...item,
          key: Math.random().toString(36).substr(2, 9),
        })),
        totalItemsCount: action.data.length,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case ADD_NEW_ITEM:
      return {
        ...state,
        items: [action.item, ...state.items],
      };
    case SET_TOTAL_ITEMS_COUNT:
      return {
        ...state,
        totalItemsCount: action.data,
      };
    default:
      return state;
  }
};

const setItems = (data) => ({ type: SET_ITEMS, data });
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const addNewItem = (item) => ({
  type: ADD_NEW_ITEM,
  item,
});
export const setTotalItemsCount = (data) => ({
  type: SET_TOTAL_ITEMS_COUNT,
  data,
});

export const getSmallDataThunk = (currentPage, pageCount) => (dispatch) => {
  return infoAPI.getSmallData(currentPage, pageCount).then((response) => {
    dispatch(setItems(response));
  });
};

export const getBigDataThunk = () => (dispatch) => {
  return infoAPI.getBigData().then((response) => {
    dispatch(setItems(response));
  });
};

export default infoReducer;

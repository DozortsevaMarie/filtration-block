export const initialState = {
  id: "decrease",
  firstName: "decrease",
  lastName: "decrease",
  email: "decrease",
  phone: "decrease",
  address: "decrease",
  description: "decrease",
  selectedItem: null,
  dataSource: [],
  tableDataPortion: [],
  isVisibleBackdrop: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "DEFAULT_SORT_ICONS":
      return {
        ...state,
        id: "decrease",
        firstName: "decrease",
        lastName: "decrease",
        email: "decrease",
        phone: "decrease",
        address: "decrease",
        description: "decrease",
      };
    case "SET_SORTING_ID_ICON":
      return {
        ...state,
        id: "increase",
      };
    case "SET_SORTING_FIRSTNAME_ICON":
      return {
        ...state,
        firstName: "increase",
      };
    case "SET_SORTING_LASTNAME_ICON":
      return {
        ...state,
        lastName: "increase",
      };
    case "SET_SORTING_EMAIL_ICON":
      return {
        ...state,
        email: "increase",
      };
    case "SET_SORTING_PHONE_ICON":
      return {
        ...state,
        phone: "increase",
      };
    case "SET_SORTING_ADDRESS_ICON":
      return {
        ...state,
        address: "increase",
      };
    case "SET_SORTING_DESCRIPTION_ICON":
      return {
        ...state,
        description: "increase",
      };
    case "SET_DATA_SOURCE":
      return {
        ...state,
        dataSource: action.data,
      };
    case "SET_TABLE_DATA_PORTION":
      return {
        ...state,
        tableDataPortion: action.data,
      };
    case "SET_SELECTED_ITEM":
      return {
        ...state,
        selectedItem: action.item,
      };
    case "SET_IS_VISIBLE_BACKDROP":
      return {
        ...state,
        isVisibleBackdrop: action.payload,
      };
    default: {
      return state;
    }
  }
};

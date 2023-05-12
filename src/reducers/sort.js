const initialState = {
  sortStatus: {
    all: true,
    noTransfer: true,
    oneTransfer: true,
    twoTransfer: true,
    threeTransfer: true,
  },
  isOpen: false,
};

const sort = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case "SORT_CHECKED":
      return {
        ...state,
        sortStatus: payload,
      };
    case "SORT_CHECKED_ALL":
      return {
        ...state,
        sortStatus: payload,
      };
    case "SORT_BTN_CHECKED":
      return {
        ...state,
        isOpen: payload,
      };

    default:
      return state;
  }
};

export default sort;

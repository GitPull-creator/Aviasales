const initialState = {
  activeFilter: "cheap",
};
const filter = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case "FILTER_CHECKED":
      return {
        ...state,
        activeFilter: payload,
      };

    default:
      return state;
  }
};

export default filter;

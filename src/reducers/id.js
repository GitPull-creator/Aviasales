const initialState = {
  searchId: "",
  searchIdLoadingStatus: "idle",
};
const id = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case "SEARCHID_FETCHING":
      return {
        ...state,
        searchIdLoadingStatus: "loading",
      };
    case "SEARCHID_FETCHED":
      return {
        ...state,
        searchId: payload,
        searchIdLoadingStatus: "idle",
      };
    case "SEARCHID_FETCHING_ERROR":
      return {
        ...state,
        searchIdLoadingStatus: "error",
      };

    default:
      return state;
  }
};

export default id;

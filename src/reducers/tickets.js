const initialState = {
  tickets: [],
  searchStatus: false,
  tiketsLoadingStatus: "",
};

const tickets = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case "TICKETS_FETCHED":
      return {
        ...state,
        tiketsLoadingStatus: "idle",
      };
    case "TICKETS_FETCHING":
      return {
        ...state,
        tickets: payload.tickets,
        searchStatus: payload.stop,
      };
    case "TICKETS_FETCHING_LOADING":
      return {
        ...state,
        tiketsLoadingStatus: "loading",
      };
    case "TICKETS_FETCHING_ERROR":
      return {
        ...state,
        tiketsLoadingStatus: "error",
      };
    default:
      return state;
  }
};

export default tickets;

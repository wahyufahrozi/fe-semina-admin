import {
  START_FETCHING_TRANSACTIONS,
  SUCCESS_FETCHING_TRANSACTIONS,
  ERROR_FETCHING_TRANSACTIONS,
  SET_KEYWORD,
  SET_PAGE,
  SET_EVENT,
  SET_DATE,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  keyword: "",
  event: "",
  page: 1,
  limit: 10,
  pages: 1,
  date: {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  },
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_TRANSACTIONS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_TRANSACTIONS:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_TRANSACTIONS:
      return {
        ...state,
        status: statuslist.success,
        data: action.transactions,
        pages: action.pages,
      };

    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    case SET_EVENT:
      return {
        ...state,
        event: action.event,
      };
    case SET_DATE:
      return {
        ...state,
        date: action.ranges,
      };

    default:
      return state;
  }
}

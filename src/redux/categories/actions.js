import {
  START_FETCHING_CATEGORIES,
  SUCCESS_FETCHING_CATEGORIES,
  ERROR_FETCHING_CATEGORIES,
} from "./constants";

import { getData } from "../../Utils/fetchData";
import debounce from "debounce-promise";
import { clearNotif } from "../notif/actions";

let debouncedFetchCategories = debounce(getData, 1000);

export const startFetchingCategories = () => {
  return {
    type: START_FETCHING_CATEGORIES,
  };
};

export const successFetchingCategories = ({ categories }) => {
  return {
    type: SUCCESS_FETCHING_CATEGORIES,
    categories,
  };
};

export const errorFetchingCategories = () => {
  return {
    type: ERROR_FETCHING_CATEGORIES,
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(startFetchingCategories());
    try {
      // let keyword = getState.categories.keyword;
      // const params = { keyword };
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);
      let res = await debouncedFetchCategories("api/v1/categories");

      dispatch(
        successFetchingCategories({
          categories: res.data.data,
        })
      );
      console.log(res);
    } catch (error) {
      dispatch(errorFetchingCategories());
    }
  };
};

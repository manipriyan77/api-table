import { configureStore } from "@reduxjs/toolkit";

export const Store = configureStore({
  reducer: {
    user: [],
    searchData: [],
    searchValue: "",
    currentPage: 1,
    eachPageData: [],
  },
});

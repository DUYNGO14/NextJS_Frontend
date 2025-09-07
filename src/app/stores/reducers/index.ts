import { combineReducers } from "@reduxjs/toolkit";

import { authSlice, authReducer } from "./auth";
import { notificationSlice, notificationReducer } from "./notification";
import { accountSlice, accountReducer } from "./account";
const rootReducer = combineReducers({
  [authSlice.name]: authReducer,
  [notificationSlice.name]: notificationReducer,
  [accountSlice.name]: accountReducer
});

export default rootReducer;
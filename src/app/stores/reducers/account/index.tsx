/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/app/stores";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  isCalling: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: any;
  data?: any;
  param?: any;
  // Update states
  isUpdating: boolean;
  updateSuccess: boolean;
  updateError?: any;
}

const initialState: AccountState = {
  isCalling: false,
  isSuccess: false,
  isError: false,
  error: null,
  data: null,
  param: null,
  // Update states
  isUpdating: false,
  updateSuccess: false,
  updateError: null
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // Get account actions
    accountAction: (state) => {
      state.isCalling = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.param = null;
    },
    accountSuccess: (state, action: PayloadAction<any>) => {
      state.isCalling = false;
      state.isSuccess = true;
      state.isError = false;
      state.error = null;
      state.data = action.payload;
    },
    accountError: (state, action: PayloadAction<any>) => {
      state.isCalling = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload;
    },

    // Update account actions
    accountUpdateAction: (state, action: PayloadAction<any>) => {
      state.isUpdating = true;
      state.updateSuccess = false;
      state.updateError = null;
      state.param = action.payload;
    },
    accountUpdateSuccess: (state, action: PayloadAction<any>) => {
      state.isUpdating = false;
      state.updateSuccess = true;
      state.updateError = null;
      state.data = action.payload; // Update data với response mới
    },
    accountUpdateError: (state, action: PayloadAction<any>) => {
      state.isUpdating = false;
      state.updateSuccess = false;
      state.updateError = action.payload;
    },

    // Reset update states
    accountUpdateReset: (state) => {
      state.isUpdating = false;
      state.updateSuccess = false;
      state.updateError = null;
    },

    // Reset all states
    accountReset: (state) => {
      state.isCalling = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.isUpdating = false;
      state.updateSuccess = false;
      state.updateError = null;
    }
  },
});

export const { 
  accountAction, 
  accountSuccess, 
  accountError,
  accountUpdateAction,
  accountUpdateSuccess,
  accountUpdateError,
  accountUpdateReset,
  accountReset
} = accountSlice.actions;

export const accountReducer = accountSlice.reducer;

const selectAccount = (state: RootState) => state.account;

export const makeSelectAccount = createSelector(
  selectAccount,
  (account: AccountState) => account
);
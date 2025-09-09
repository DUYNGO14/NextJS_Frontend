/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/app/stores";
import { MatchDataType } from '@common/validation/matches.schema';
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Pagination{
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
export interface MatchesState {
  isCalling: boolean;
  isSuccess: boolean;
  isCallingPage?: boolean;
  isError: boolean;
  error: any;
  match : MatchDataType | null;
  matches: MatchDataType[] | null;
  param: any;
  pagination: Pagination | null;
  type: string;
}

export const initialState: MatchesState = {
  isCalling: false,
  isCallingPage: false,
  isSuccess: false,
  isError: false,
  error: null,
  match: null,
  matches: null,
  param: null,
  pagination: null,
  type: "",
};

export const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    getMatchesAction: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      console.log(action.payload.page);
      if(action.payload.page>1){
        state.isCallingPage = true;
        state.isCalling = false;
      }else{
        state.isCallingPage = false;
        state.isCalling = true;
      }
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.type = "getMatches";
      state.param = action.payload;
    },
    getMatchDetailAction: (state, action: PayloadAction<any>) => {
      state.isCalling = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.type = "getMatchesById";
      state.param = action.payload;
    },
    createMatchAction: (state, action: PayloadAction<any>) => {
      state.isCalling = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.type = "createMatch";
      state.param = action.payload;
    },
    updateMatchAction: (state, action: PayloadAction<any>) => {
      state.isCalling = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.type = "updateMatch";
      state.param = action.payload;
    },
    deleteMatchAction: (state, action: PayloadAction<any>) => {
      state.isCalling = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.type = "deleteMatch";
      state.param = action.payload;
    },
    callSuccess: (state, action: PayloadAction<{type:string, data: any, pagination?: Pagination}>) => {
      state.isCalling = false;
      state.isSuccess = true;
      state.isCallingPage = false;
      state.isError = false;
      state.error = null;
      state.type = action.payload.type;
      switch (action.payload.type) {
        case "getMatches":
          state.matches = state.matches ? [...state.matches, ...action.payload.data] : action.payload.data;
          state.pagination = action.payload.pagination ?? null;
          break;
        case "getMatchesById":
          state.match = action.payload.data;
          break;
        case "createMatch":
          if (state.matches) {
            state.matches.push(action.payload.data);
          } else {
            state.matches = [action.payload.data];
          }
          break;
        case "updateMatch":
          if (state.matches) {
            const index = state.matches.findIndex(match => match.id === action.payload.data.id);
            if (index !== -1) {
              state.matches[index] = action.payload.data;
            }
          }
          state.match = action.payload.data;
        case "deleteMatch":
          if (state.matches) {
            state.matches = state.matches.filter(match => match.id !== action.payload.data);
          }
          break;
        default:
          break;
      }
    },
    callFailed: (state, action: PayloadAction<{ type: string; error: any }>) => {
      state.isCalling = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload.error;
      state.type = action.payload.type;
    },
    reset: (state) => {
      state.isCalling = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.match = null;
      state.matches = null;
      state.param = null;
      state.type = "";
    },
    resetMatch: (state) => {
      state.match = null;
    }
  },
});
export const {
  getMatchesAction, 
  getMatchDetailAction, 
  createMatchAction, 
  updateMatchAction, 
  deleteMatchAction, 
  callSuccess, 
  callFailed, 
  reset, 
  resetMatch 
} = matchesSlice.actions;

export const matchesReducer = matchesSlice.reducer

const selectState = (state: RootState) => state.matches;

export const makeSelectMatches = createSelector(
  selectState,
  (state: MatchesState) => state
);
export const makeSelectMatchesData = createSelector(
  selectState,
  (state: MatchesState) => state.matches || []
);

export const makeSelectMatch = createSelector(
  selectState,
  (state: MatchesState) => state.match || null
);
import {all} from "redux-saga/effects";
import authSaga from "./auth";
import accountSaga from "./account";
import matchesSaga from "./matches";
export default function* rootSaga() {
  yield all([authSaga(), accountSaga(), matchesSaga()]);
}
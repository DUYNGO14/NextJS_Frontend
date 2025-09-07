import {all} from "redux-saga/effects";
import authSaga from "./auth";
import accountSaga from "./account";
export default function* rootSaga() {
  yield all([authSaga(), accountSaga()]);
}
/* eslint-disable @typescript-eslint/no-explicit-any */
// matches.saga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getMatchesAction,
  getMatchDetailAction,
  createMatchAction,
  updateMatchAction,
  deleteMatchAction,
  callSuccess,
  callFailed
} from "@/app/stores/reducers/matches";
import { get, post, put as update, del } from "@/app/common/client";
// Giả sử bạn có các API service

function* callApiGetListMatches(action: ReturnType<typeof getMatchesAction>): Generator<any, void, unknown> {
  try {
    console.warn("======SAGA MATCHES======");
    console.log("action.payload", action.payload);
     const params = action.payload;
     console.log("params", params);
    const response: any = yield call(get,'/matches', params as Record<string, unknown>);
    console.log("callApiGetListMatches response:", response);
    yield put(callSuccess({ type: "getMatches", data: response.data, pagination: response.pagination }));
  } catch (error: any) {
    yield put(callFailed({ type: "getMatches", error: error.message }));
  }
}

function* callApiGetMatchDetail(action: ReturnType<typeof getMatchDetailAction>): Generator<any, void, unknown> {
  try {
    const response: any = yield call(get,'/matches', action.payload);
    yield put(callSuccess({ type: "getMatchesById", data: response.data }));
  } catch (error: any) {
    yield put(callFailed({ type: "getMatchesById", error: error.message }));
  }
}

function* callApiCreateMatch(action: ReturnType<typeof createMatchAction>): Generator<any, void, unknown> {
  try {
    const response: any = yield call(post,'', action.payload);
    yield put(callSuccess({ type: "createMatch", data: response.data }));
  } catch (error: any) {
    yield put(callFailed({ type: "createMatch", error: error.message }));
  }
}

function* callApiUpdateMatch(action: ReturnType<typeof updateMatchAction>): Generator<any, void, unknown> {
  try {
    const response: any = yield call(update,'', action.payload.id, action.payload.data);
    yield put(callSuccess({ type: "updateMatch", data: response.data }));
  } catch (error: any) {
    yield put(callFailed({ type: "updateMatch", error: error.message }));
  }
}

function* callApiDeleteMatch(action: ReturnType<typeof deleteMatchAction>): Generator<any, void, unknown> {
  try {
    yield call(del,'', action.payload);
    yield put(callSuccess({ type: "deleteMatch", data: action.payload }));
  } catch (error: any) {
    yield put(callFailed({ type: "deleteMatch", error: error.message }));
  }
}

export default function* matchesSaga() {
  yield takeLatest(getMatchesAction.type, callApiGetListMatches);
  yield takeLatest(getMatchDetailAction.type, callApiGetMatchDetail);
  yield takeLatest(createMatchAction.type, callApiCreateMatch);
  yield takeLatest(updateMatchAction.type, callApiUpdateMatch);
  yield takeLatest(deleteMatchAction.type, callApiDeleteMatch);
}
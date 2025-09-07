/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, put as update } from "@/app/common/client";
import { UpdateMeBodyType } from "@/app/common/validation/account.schema";
import { accountAction, accountError, accountSuccess, accountUpdateAction, accountUpdateError, accountUpdateSuccess } from "@/app/stores/reducers/account";
import { showNotification } from "@/app/stores/reducers/notification";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
function* callApiGetAccount(
  action: PayloadAction<any>
): Generator<any, void, unknown> {
  try {
    const response: any = yield call(get, "/account", action.payload);
    console.log("Account response saga:", response);
    if (response.code >= 200 && response.code < 300) {
      yield put(accountSuccess(response.data || {}));
    } else {
      yield put(accountError(response.message || "Get account failed!!!"));
    }
  } catch (error: any) {
    yield put(accountError(error.message));
  }
}
function* callApiUpdateAccount(action: PayloadAction<UpdateMeBodyType>): Generator<any, void, unknown> {
  try {
    const response: any = yield call(update, "/account", action.payload);
    console.log("Account response saga:", response);
    if (response.code >= 200 && response.code < 300) {
      yield put(accountUpdateSuccess(response.data || {}));
      yield put(showNotification({ message: "Update successfully!!", severity: "success" }));
    } else {
      yield put(accountUpdateError(response.message || "Update failed!!!"));
        yield put(showNotification({ message: "Update failed!!", severity: "error" }));
    }
  } catch (error: any) {
    yield put(accountUpdateError(error.message));
    yield put(showNotification({ message: "Something went wrong!!", severity: "error" }));
  }
}
export default function* authSaga() {
  yield takeLatest(accountAction.type, callApiGetAccount);
  yield takeLatest(accountUpdateAction.type, callApiUpdateAccount);
}
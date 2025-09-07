/* eslint-disable @typescript-eslint/no-explicit-any */
import { post } from "@/app/common/client";
import {
  loginAction,
  loginError,
  loginSuccess,
  logoutAction,
  logoutError,
  logoutSuccess,
  registerAction,
  registerError,
  registerSuccess,
} from "@stores/reducers/auth";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { showNotification } from "@stores/reducers/notification";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
function* callApiLogin(
  action: PayloadAction<LoginPayload>
): Generator<any, void, unknown> {
  try {
    const payload = action.payload;

    const response: any = yield call(post, "/auth/login", payload);
    if (response.code >= 200 && response.code < 300) {
      yield put(loginSuccess(response.data));
      yield put(
        showNotification({ message: "Login successfully", severity: "success" })
      );
    } else if (response.code === 422) {
      const errorMessage =
        response.errors?.[0]?.message ||
        response.message ||
        "Email hoặc mật khẩu không đúng";
      yield put(loginError(errorMessage));
    } else {
      // Lỗi khác
      yield put(loginError(response.message || "Đăng nhập thất bại"));
    }
  } catch (error: any) {
    console.error("Login saga error:", error);

    // ✅ Xử lý different types of errors
    let errorMessage = "Đã xảy ra lỗi khi đăng nhập";

    if (error.response?.data) {
      // Error từ API response
      const apiError = error.response.data;
      errorMessage =
        apiError.errors?.[0]?.message || apiError.message || errorMessage;
    } else if (error.message) {
      errorMessage = error.message;
    }

    yield put(loginError(errorMessage));
    yield put(
      showNotification({ message: "Something went wrong", severity: "error" })
    );
  }
}

function* callApiRegister(
  action: PayloadAction<RegisterPayload>
): Generator<any, void, unknown> {
  try {
    const payload = action.payload;
    console.log("Register payload saga:", payload);

    const response: any = yield call(post, "/auth/register", payload);
    console.log("Register response saga:", response);

    if (response.code >= 200 && response.code < 300) {
      yield put(registerSuccess(response.data));
      yield put(
        showNotification({
          message: "Register successfully",
          severity: "success",
        })
      );
      
    } else if (response.code === 422) {
      // Lỗi validation - hiển thị thông báo cụ thể
      const errorMessage =
        response.errors?.[0]?.message ||
        response.message ||
        "Thông tin nhập vào ko chính xác";
      yield put(registerError(errorMessage));
    } else {
      // Lỗi khác
      yield put(registerError(response.message || "Đăng kí thất bại"));
      yield put(
        showNotification({ message: "Something went wrong", severity: "error" })
      );
    }
  } catch (error: any) {
    console.error("Register saga error:", error);

    // ✅ Xử lý different types of errors
    let errorMessage = "Đã xảy ra lỗi khi đăng ki";

    if (error.response?.data) {
      // Error từ API response
      const apiError = error.response.data;
      errorMessage =
        apiError.errors?.[0]?.message || apiError.message || errorMessage;
    } else if (error.message) {
      errorMessage = error.message;
    }

    yield put(loginError(errorMessage));
  }
}

function* callApiLogout(): Generator<any, void, unknown> {
  try {
    const response: any = yield call(post, "/auth/logout", {});
    console.log("Logout response saga:", response);
    if (response.code >= 200 && response.code < 300) {
      yield put(logoutSuccess());
      yield put(
        showNotification({ message: "Logout successfully", severity: "success" })
      );
      window.location.href = "/auth/login";
    } else {
      yield put(logoutError(response.message || "Đăng xuat that bai"));
    }
  } catch (error: any) {
    console.error("Logout saga error:", error);
    yield put(logoutError(error.message || "Đăng xuat that bai"));
  }
}

export default function* authSaga() {
  yield takeLatest(loginAction.type, callApiLogin);
  yield takeLatest(registerAction.type, callApiRegister);
  yield takeLatest(logoutAction.type, callApiLogout);
}

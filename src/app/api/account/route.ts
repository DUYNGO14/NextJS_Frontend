/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, put } from "@/app/common/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // ✅ Gọi API để lấy thông tin account
    const response: any = await get("/account/me");

    // ✅ Xử lý response từ API
    if (response?.code >= 400) {
      return NextResponse.json(
        {
          message: response.data?.message || "Authentication failed",
          errors: response.data?.errors || [],
          code: response.code,
        },
        { status: response.code }
      );
    }

    // ✅ Trả về thông tin account
    return NextResponse.json(
      {
        code: 200,
        message: "Get account info successfully",
        data: response.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get account info error:", error);

    // ✅ Xử lý lỗi chi tiết hơn
    if (error.response?.status === 401) {
      return NextResponse.json(
        {
          code: 401,
          message: "Unauthorized - Please login again",
          data: null,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        code: 500,
        message: "Internal server error",
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    // ✅ Gọi API để lấy thông tin account
    const response: any = await put("/account/me", body);

    // ✅ Xử lý response từ API
    if (response?.code >= 400) {
      return NextResponse.json(
        {
          message: response.data?.message || "Authentication failed",
          errors: response.data?.errors || [],
          code: response.code,
        },
        { status: response.code }
      );
    }

    // ✅ Trả về thông tin account
    return NextResponse.json(
      {
        code: 200,
        message: "Get account info successfully",
        data: response.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get account info error:", error);

    // ✅ Xử lý lỗi chi tiết hơn
    if (error.response?.status === 401) {
      return NextResponse.json(
        {
          code: 401,
          message: "Unauthorized - Please login again",
          data: null,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        code: 500,
        message: "Internal server error",
        data: null,
      },
      { status: 500 }
    );
  }
}

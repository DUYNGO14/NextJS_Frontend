/* eslint-disable @typescript-eslint/no-explicit-any */
import { post } from "@/app/common/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res: any = await post("/auth/register", body);


    // ✅ SỬA: Kiểm tra code thay vì data
    if (res?.code >= 400) {
      // Trả về error response từ API
      return Response.json(
        {
          message: res.data?.message || "Authentication failed",
          errors: res.data?.errors || [],
          code: res.code,
        },
        { status: res.code }
      );
    }
    // const cookieStore = await cookies();
    // if (res?.code === 200 && res.data?.token) {
    //   cookieStore.set("token", res.data.token, {
    //     httpOnly: true,
    //     path: "/",
    //     expires: new Date(res.data.expiresAt),
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "lax",
    //   });
    // }

    return Response.json(res || {}, { status: 200 });
  } catch (error: any) {
    console.error("Error login route:", error);

    // ✅ Xử lý lỗi khác (network error, etc.)
    return Response.json(
      {
        message: "Internal server error",
        code: 500,
      },
      { status: 500 }
    );
  }
}

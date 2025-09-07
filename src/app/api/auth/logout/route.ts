
import { post } from "@/app/common/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { code: 400, message: "Token không tồn tại" },
        { status: 400 }
      );
    }

    // ✅ Gọi API backend để xóa token (nếu cần)
    try {
      await post("/auth/logout", {});
    } catch (err) {
      console.error("Backend logout error:", err);
    }

    // ✅ Tạo response thành công
    const response = NextResponse.json(
      { 
        code: 200, 
        message: "Đăng xuất thành công",
        data: null 
      },
      { status: 200 }
    );

    // ✅ Xóa tất cả cookies liên quan đến auth
      cookiesStore.delete("token");

    return response;

  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { 
        code: 500, 
        message: "Lỗi server khi đăng xuất",
        data: null 
      },
      { status: 500 }
    );
  }
}

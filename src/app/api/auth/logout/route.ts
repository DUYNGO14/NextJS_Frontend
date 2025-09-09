import { post } from "@/app/common/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    console.log("token", token);

    // ✅ Luôn gọi API backend để xóa token (dù có token hay không)
    try {
      // Truyền token vào header nếu có
      await post("/auth/logout", {});
    } catch (err) {
      console.error("Backend logout error:", err);
      // Vẫn tiếp tục xóa cookie dù backend có lỗi
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

    // ✅ Xóa tất cả cookies liên quan đến auth trong response
    response.cookies.delete("token");
    response.cookies.delete("refreshToken"); // Nếu có
    response.cookies.delete("session"); // Nếu có

    return response;

  } catch (error) {
    console.error("Logout error:", error);
    
    // ✅ Vẫn xóa cookie ngay cả khi có lỗi
    const errorResponse = NextResponse.json(
      { 
        code: 500, 
        message: "Đã xóa session local",
        data: null 
      },
      { status: 500 }
    );
    
    errorResponse.cookies.delete("token");
    errorResponse.cookies.delete("refreshToken");
    
    return errorResponse;
  }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosCommon, { AxiosOptions } from "@/app/common/Axios";
import { cookies, headers } from "next/headers";

// Danh sách API không cần token (nên đưa vào biến môi trường hoặc config riêng)
const API_NOT_TOKEN = process.env.API_NOT_TOKEN?.split(",") || [
  "auth/login",
  "auth/register",
];

class ServerService extends AxiosCommon {
  constructor(options: AxiosOptions) {
    super(options);

    this.setupRequestInterceptor();
    // Trong class ServerService
    this.axiosInstance.interceptors.response.use(
      (response: any) => {
        const data = {
          ...response.data,
          pagination: response.data?.pagination || null,
          code: response.status,
        };
        return data;
      },
      (error: any) => {
        // ✅ SỬA: Trả về error response thay vì reject
        if (error.response) {
          console.error("Response Interceptor Error:", error.response.data);

          // Trả về error response để xử lý trong route
          return Promise.resolve({
            data: error.response.data,
            code: error.response.status,
            status: error.response.status,
            message: error.response.data?.message || "Request failed",
          });
        }

        console.error("Response Interceptor Error:", error);
        return Promise.reject(error);
      }
    );
  }

  private setupRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          await this.addAuthHeader(config);
          await this.addCommonHeaders(config);
          return config;
        } catch (error) {
          return Promise.reject(error);
        }
      },
      (error) => {
        // Xử lý lỗi request
        console.error("Request Interceptor Error:", error);
        return Promise.reject(error);
      }
    );
  }

  private async addAuthHeader(config: any) {
    const isMatchApiNotToken = API_NOT_TOKEN.some((api) =>
      config.url?.includes(api)
    );

    if (!isMatchApiNotToken) {
      const cookieStorage = await cookies();
      const token = cookieStorage.get("token")?.value || "";

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("No token found for authenticated API:", config.url);
      }
    }
  }

  private async addCommonHeaders(config: any) {
    const headerLst = await headers();

    config.headers["User-Agent"] = headerLst.get("user-agent") || "";
    config.headers["Content-Type"] = "application/json";
    config.headers["address-ip"] = headerLst.get("cf-connecting-ip") || "";
    config.headers["x-forwarded-for"] =
      headerLst.get("x-forwarded-for") ||
      headerLst.get("connection.remoteAddress") ||
      "";
  }

  private logRequest(config: any) {
    console.log("🌐 API Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
    });
  }
}

export default ServerService;

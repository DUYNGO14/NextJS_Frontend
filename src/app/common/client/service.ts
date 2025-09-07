import { error } from './../../../../../server/node_modules/effect/src/Brand';
import AxiosCommon , { AxiosOptions} from "@/app/common/Axios";

class ClientService extends AxiosCommon {
  constructor(options: AxiosOptions) {
    super(options);
    this.axiosInstance.interceptors.response.use(
      async (response) => {
        console.log("API Response client:", response);
        return {...response.data, code: response.status};
      },
      async function (error) {
        console.error("Response Interceptor Error client:", error.response);
        return {
          code: error.response.status ||error.response.data?.code || 500,
          message: error.response.data?.errors[0].message|| error.response.data?.message || "Request failed",
          data: error?.response?.data || error?.data || error,
        };
      }
    );
  }
}

export default ClientService;
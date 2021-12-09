import Axios, { AxiosInstance } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import appConfig from "../../appConfig";

export interface IAPIClient {
  get<TResponse>(path: string): Promise<TResponse>;
  post<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  put<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  delete<TResponse>(path: string): Promise<TResponse>;
}

export default class APIClient implements IAPIClient {
  private client: AxiosInstance;

  refreshToken = async (): Promise<void> => {
    try {
      await this.client.get(`${appConfig.wauthBase}/api/set_token`);
      Promise.resolve();
    } catch (error: unknown) {
      // The user is likely to have no JWT, so send them to login
      window.location.href = `${process.env.REACT_APP_SECURITY_BASEURL}/login?callback=${window.location.href}`;
      Promise.reject(error);
    }
  };

  constructor(baseURL: string) {
    this.client = Axios.create({
      baseURL,
      responseType: "json" as const,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10 * 1000,
      withCredentials: true,
    });

    createAuthRefreshInterceptor(this.client, this.refreshToken, {
      statusCodes: [400, 401, 403],
    });
  }

  async get<TResponse>(path: string): Promise<TResponse> {
    const response = await this.client.get<TResponse>(path);
    return response.data;
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    const response = await this.client.post<TResponse>(path, payload);
    return response.data;
  }

  async put<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    const response = await this.client.put<TResponse>(path, payload);
    return response.data;
  }

  async delete<TResponse>(path: string): Promise<TResponse> {
    const response = await this.client.delete<TResponse>(path);
    return response.data;
  }
}

import Axios, { AxiosError, AxiosInstance } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import appConfig from "../../appConfig";

interface SetToken {
  token: string;
}

export interface IAPIClient {
  get<TResponse>(path: string): Promise<TResponse>;
  post<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  put<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  delete<TResponse>(path: string): Promise<TResponse>;
}

export default class APIClient implements IAPIClient {
  private readonly client: AxiosInstance;

  // eslint-disable-next-line class-methods-use-this
  refreshToken = async (failedRequest: AxiosError): Promise<void> => {
    try {
      const res = await Axios.get<SetToken>(
        `${appConfig.wauthBase}/api/set_token`,
        { withCredentials: true }
      );
      if (failedRequest.response) {
        if (!failedRequest.response.config.headers) {
          // eslint-disable-next-line no-param-reassign
          failedRequest.response.config.headers = {};
        }
        // eslint-disable-next-line no-param-reassign
        failedRequest.response.config.headers.Authorization = `Bearer ${res.data.token}`;
        sessionStorage.setItem("token", res.data.token);
        Promise.resolve();
      }
    } catch (error: unknown) {
      // The user is likely to have no JWT, so send them to login
      window.location.href = `${process.env.REACT_APP_SECURITY_BASEURL}/login?callback=${window.location.href}`;
      await Promise.reject(error);
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
    });

    const apiKey = process.env.REACT_APP_API_KEY;
    if (apiKey) {
      sessionStorage.setItem("token", apiKey);
    }

    this.client.interceptors.request.use(
      (config) => {
        const token = sessionStorage.getItem("token");
        if (token && config) {
          if (!config.headers) {
            // eslint-disable-next-line no-param-reassign
            config.headers = {};
          }
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

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

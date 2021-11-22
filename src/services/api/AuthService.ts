import { IAPIClient } from "./ApiClient";

export interface IAuthAPIClient {
  getToken(): Promise<boolean>;
  checkToken(): Promise<boolean>;
}

export class AuthAPIClient implements IAuthAPIClient {
  apiClient: IAPIClient;

  constructor(apiClient: IAPIClient) {
    this.apiClient = apiClient;
  }

  async getToken(): Promise<boolean> {
    await this.apiClient.get(`/api/set_token`);
    return true;
  }

  async checkToken(): Promise<boolean> {
    await this.apiClient.get("/api/test");
    return true;
  }
}

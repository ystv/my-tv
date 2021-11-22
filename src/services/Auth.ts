import Cookies from "js-cookie";
import APIToken from "../components/types/apiToken";
import { IAuthAPIClient } from "./api/AuthService";

export default class AuthService {
  authApiClient: IAuthAPIClient;

  constructor(authAPIClient: IAuthAPIClient) {
    this.authApiClient = authAPIClient;
  }

  async getToken(): Promise<APIToken> {
    return new Promise<APIToken>((resolve, reject) => {
      let jwt = Cookies.get("token");
      if (!jwt) {
        try {
          this.authApiClient.getToken();
        } catch (err) {
          return reject(err);
        }
        jwt = Cookies.get("token");
      }
      try {
        if (jwt) {
          const base64Url = jwt.split(".")[1];
          const base64 = base64Url.replace("-", "+").replace("_", "/");
          const token: APIToken = JSON.parse(window.atob(base64));

          if (Date.now() >= token.exp * 1000) {
            return reject(new Error("expired token"));
          }
          return resolve(token);
        }
      } catch (error) {
        return reject(new Error(`failed to get token: ${error}`));
      }
      return reject(new Error("failed to get token"));
    });
  }

  async checkToken(): Promise<boolean> {
    return this.authApiClient.checkToken();
  }
}

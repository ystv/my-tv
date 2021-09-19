import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import APIToken from "../components/types/apiToken";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SECURITY_BASEURL,
  withCredentials: true,
});

const resBody = (res: AxiosResponse) => res.data;

const reqs = {
  get: (path: string) => instance.get(path).then(resBody),
  post: <T>(path: string, body: T) => instance.post(path, body).then(resBody),
  put: <T>(path: string, body: T) => instance.put(path, body).then(resBody),
  delete: (path: string) => instance.delete(path).then(resBody),
};

const getToken = (): Promise<APIToken> =>
  new Promise<APIToken>((resolve, reject) => {
    let jwt = Cookies.get("token");
    if (!jwt) {
      try {
        reqs.get("/api/set_token");
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

export default getToken;

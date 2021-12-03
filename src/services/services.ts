import appConfig from "../appConfig";
import APIClient from "./api/ApiClient";
import { AuthAPIClient } from "./api/AuthService";
import { ClapperAPIClient } from "./api/ClapperService";
import { MiscAPIClient } from "./api/MiscService";
import AuthService from "./Auth";
import ClapperService from "./Clapper";
import MiscService from "./Misc";

const clapperApiClient = new ClapperAPIClient(
  new APIClient(appConfig.wapiBase)
);
export const clapper = new ClapperService(clapperApiClient);

const authAPIClient = new AuthAPIClient(new APIClient(appConfig.wauthBase));
export const auth = new AuthService(authAPIClient);

const miscAPIClient = new MiscAPIClient(new APIClient(appConfig.wapiBase));
export const misc = new MiscService(miscAPIClient);

import appConfig from "../../appConfig";
import { User } from "../../components/types/people";
import { IAPIClient } from "./ApiClient";

export interface IPeopleAPIClient {
  getUserByToken(): Promise<User>;
  getUserByUserID(userID: number): Promise<User>;
}

export class PeopleAPIClient implements IPeopleAPIClient {
  peopleBase: string;

  apiClient: IAPIClient;

  constructor(apiClient: IAPIClient) {
    this.peopleBase = appConfig.peopleBase;
    this.apiClient = apiClient;
  }

  async getUserByToken(): Promise<User> {
    return this.apiClient.get<User>(`${this.peopleBase}/user`);
  }

  async getUserByUserID(userID: number): Promise<User> {
    return this.apiClient.get<User>(`${this.peopleBase}/user/${userID}`);
  }
}

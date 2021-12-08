import appConfig from "../../appConfig";
import { UserInterface } from "../../components/types/people";
import { IAPIClient } from "./ApiClient";

export interface IPeopleAPIClient {
  getUserByToken(): Promise<UserInterface>;
  getUserByUserID(userID: number): Promise<UserInterface>;
}

export class PeopleAPIClient implements IPeopleAPIClient {
  peopleBase: string;

  apiClient: IAPIClient;

  constructor(apiClient: IAPIClient) {
    this.peopleBase = appConfig.peopleBase;
    this.apiClient = apiClient;
  }

  async getUserByToken(): Promise<UserInterface> {
    return this.apiClient.get<UserInterface>(`${this.peopleBase}/user`);
  }

  async getUserByUserID(userID: number): Promise<UserInterface> {
    return this.apiClient.get<UserInterface>(
      `${this.peopleBase}/user/${userID}`
    );
  }
}

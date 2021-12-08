import { UserInterface } from "../components/types/people";
import { IPeopleAPIClient } from "./api/PeopleService";

export default class PeopleService {
  peopleApiClient: IPeopleAPIClient;

  constructor(peopleAPIClient: IPeopleAPIClient) {
    this.peopleApiClient = peopleAPIClient;
  }

  async getUserByToken(): Promise<UserInterface> {
    return this.peopleApiClient.getUserByToken();
  }

  async getUserByUserID(userID: number): Promise<UserInterface> {
    return this.peopleApiClient.getUserByUserID(userID);
  }
}

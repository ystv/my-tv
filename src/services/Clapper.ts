import { Event, Group, NewGroup, Position } from "../components/types/clapper";
import { IClapperAPIClient } from "./api/ClapperService";

export default class ClapperService {
  clapperApiClient: IClapperAPIClient;

  constructor(clapperAPIClient: IClapperAPIClient) {
    this.clapperApiClient = clapperAPIClient;
  }

  async getEvent(eventID: number): Promise<Event> {
    return this.clapperApiClient.getEvent(eventID);
  }

  async getPositions(): Promise<Position[]> {
    return this.clapperApiClient.getPositions();
  }

  async getGroups(): Promise<Group[]> {
    return this.clapperApiClient.getGroups();
  }

  async newGroup(group: NewGroup): Promise<number> {
    return this.clapperApiClient.newGroup(group);
  }

  async watchPosition(positionID: number): Promise<boolean> {
    return this.clapperApiClient.watchPosition(positionID);
  }

  async unwatchPosition(positionID: number): Promise<boolean> {
    return this.clapperApiClient.unwatchPosition(positionID);
  }
}

import { Event, Group, Position } from "../components/types/clapper";
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
    return this.getGroups();
  }

  async watchPosition(positionID: number): Promise<boolean> {
    return this.watchPosition(positionID);
  }

  async unwatchPosition(positionID: number): Promise<boolean> {
    return this.unwatchPosition(positionID);
  }
}

import { Group, Position, RichPosition } from "./api/clapper";
import { IClapperAPIClient } from "./api/ClapperService";

export default class ClapperService {
  clapperApiClient: IClapperAPIClient;

  constructor(clapperAPIClient: IClapperAPIClient) {
    this.clapperApiClient = clapperAPIClient;
  }

  async getPositions(): Promise<Position[]> {
    return this.clapperApiClient.getPositions();
  }

  async getRichPositions(): Promise<RichPosition[]> {
    return this.clapperApiClient.getRichPositions();
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

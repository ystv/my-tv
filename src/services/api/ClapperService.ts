import appConfig from "../../appConfig";
import { IAPIClient } from "./ApiClient";
import { Group, Position, RichPosition } from "./clapper";

export interface IClapperAPIClient {
  getPositions(): Promise<Position[]>;
  getRichPositions(): Promise<RichPosition[]>;
  getGroups(): Promise<Group[]>;
  watchPosition(positionID: number): Promise<boolean>;
  unwatchPosition(positionID: number): Promise<boolean>;
}

export class ClapperAPIClient implements IClapperAPIClient {
  clapperBase: string;

  apiClient: IAPIClient;

  constructor(apiClient: IAPIClient) {
    this.clapperBase = appConfig.clapperBase;
    this.apiClient = apiClient;
  }

  async getPositions(): Promise<Position[]> {
    return this.apiClient.get<Position[]>(`${this.clapperBase}/position`);
  }

  async getRichPositions(): Promise<RichPosition[]> {
    return this.apiClient.get<RichPosition[]>(
      `${this.clapperBase}/position/rich`
    );
  }

  async getGroups(): Promise<Group[]> {
    return this.apiClient.get<Group[]>(`${this.clapperBase}/position/group`);
  }

  async watchPosition(positionID: number): Promise<boolean> {
    await this.apiClient.get(
      `${this.clapperBase}/position/${positionID}/watch`
    );
    return true;
  }

  async unwatchPosition(positionID: number): Promise<boolean> {
    await this.apiClient.get(
      `${this.clapperBase}/position/${positionID}/unwatch`
    );
    return true;
  }
}

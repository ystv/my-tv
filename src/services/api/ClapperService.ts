import appConfig from "../../appConfig";
import { Event, Group, Position } from "../../components/types/clapper";
import { IAPIClient } from "./ApiClient";

export interface IClapperAPIClient {
  getEvent(eventID: number): Promise<Event>;
  getPositions(): Promise<Position[]>;
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

  async getEvent(): Promise<Event> {
    return this.apiClient.get<Event>(`${this.clapperBase}/event`);
  }

  async getPositions(): Promise<Position[]> {
    return this.apiClient.get<Position[]>(`${this.clapperBase}/positions`);
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

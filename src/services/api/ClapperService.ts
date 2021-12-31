import appConfig from "../../appConfig";
import {
  Event,
  Group,
  NewGroup,
  Position,
} from "../../components/types/clapper";
import { IAPIClient } from "./ApiClient";

export interface IClapperAPIClient {
  getEvent(eventID: number): Promise<Event>;
  getEventsByMonth(month: number, year: number): Promise<Array<Event>>;
  getPositions(): Promise<Position[]>;
  getGroups(): Promise<Group[]>;
  newGroup(group: NewGroup): Promise<number>;
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

  async getEventsByMonth(month: number, year: number): Promise<Array<Event>> {
    return this.apiClient.get<Array<Event>>(
      `${this.clapperBase}/calendar/monthly/${year}/${month}`
    );
  }

  async getEvent(eventID: number): Promise<Event> {
    return this.apiClient.get<Event>(`${this.clapperBase}/event/${eventID}`);
  }

  async getPositions(): Promise<Position[]> {
    return this.apiClient.get<Position[]>(`${this.clapperBase}/positions`);
  }

  async getGroups(): Promise<Group[]> {
    return this.apiClient.get<Group[]>(`${this.clapperBase}/position/group`);
  }

  async newGroup(group: NewGroup): Promise<number> {
    return this.apiClient.post<NewGroup, number>(
      `${this.clapperBase}/position/group`,
      group
    );
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

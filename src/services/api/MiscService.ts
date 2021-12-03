import appConfig from "../../appConfig";
import { QuoteInterface, QuotesInterface } from "../../components/types/quotes";
import { Webcam } from "../../components/types/webcams";
import { IAPIClient } from "./ApiClient";

export interface IMiscAPIClient {
  getQuotes(amount: number, page: number): Promise<QuotesInterface>;
  newQuote(quote: QuoteInterface): Promise<boolean>;
  updateQuote(quote: QuoteInterface): Promise<boolean>;
  deleteQuote(quoteID: number): Promise<boolean>;
  getWebcams(): Promise<Webcam[]>;
  getWebcam(webcamID: number): Promise<ImageData>;
}

export class MiscAPIClient implements IMiscAPIClient {
  miscBase: string;

  apiClient: IAPIClient;

  constructor(apiClient: IAPIClient) {
    this.miscBase = appConfig.miscBase;
    this.apiClient = apiClient;
  }

  async getQuotes(amount: number, page: number): Promise<QuotesInterface> {
    return this.apiClient.get<QuotesInterface>(
      `${this.miscBase}/quotes/${amount}/${page}`
    );
  }

  async newQuote(quote: QuoteInterface): Promise<boolean> {
    await this.apiClient.post(`${this.miscBase}/quotes`, quote);
    return true;
  }

  async updateQuote(quote: QuoteInterface): Promise<boolean> {
    await this.apiClient.put(`${this.miscBase}/quotes`, quote);
    return true;
  }

  async deleteQuote(quoteID: number): Promise<boolean> {
    await this.apiClient.delete(`${this.miscBase}/quotes/${quoteID}`);
    return true;
  }

  async getWebcams(): Promise<Webcam[]> {
    return this.apiClient.get(`${this.miscBase}/webcams`);
  }

  async getWebcam(cameraID: number): Promise<ImageData> {
    return this.apiClient.get(`${this.miscBase}/webcams/${cameraID}`);
  }
}

import { QuoteInterface, QuotesInterface } from "../components/types/quotes";
import { IMiscAPIClient } from "./api/MiscService";

export default class MiscService {
  miscApiClient: IMiscAPIClient;

  constructor(miscAPIClient: IMiscAPIClient) {
    this.miscApiClient = miscAPIClient;
  }

  async getQuotes(amount: number, page: number): Promise<QuotesInterface> {
    return this.miscApiClient.getQuotes(amount, page);
  }

  async newQuote(quote: QuoteInterface): Promise<boolean> {
    return this.miscApiClient.newQuote(quote);
  }

  async updateQuote(quote: QuoteInterface): Promise<boolean> {
    return this.miscApiClient.updateQuote(quote);
  }

  async deleteQuote(quoteID: number): Promise<boolean> {
    return this.miscApiClient.deleteQuote(quoteID);
  }
}

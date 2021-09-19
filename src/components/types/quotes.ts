export interface QuotesInterface {
  Quotes: QuoteInterface[];
}

export interface QuoteInterface {
  id: number;
  quote: string;
  description: string;
}

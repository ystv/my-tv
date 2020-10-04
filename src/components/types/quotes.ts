export interface quotesInterface {
  Quotes: quoteInterface[];
}

export interface quoteInterface {
  id: number;
  quote: string;
  description: string;
}

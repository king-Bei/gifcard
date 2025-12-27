
export interface LoveMessage {
  text: string;
  category: 'romantic' | 'friendly' | 'inspirational';
}

export interface TravelDestination {
  month: string;
  city: string;
  country: string;
  description: string;
  image: string;
}

export enum CardState {
  CLOSED = 'CLOSED',
  OPENING = 'OPENING',
  OPENED = 'OPENED'
}

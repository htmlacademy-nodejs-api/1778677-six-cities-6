import { City } from './city.enum.js';
import { Good } from './good.enum.js';
import { OfferLocation } from './offer-location.type.js';
import { OfferType } from './offer-type.enum.js';
import { User } from './user.type.js';


export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorites: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Good[];
  user: User;
  comment: number;
  location: OfferLocation;

}

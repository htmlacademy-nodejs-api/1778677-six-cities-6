import { City } from './city.type.js';
import { Good } from './good.type.js';
import { OfferLocation } from './offer-location.type.js';
import { OfferType } from './offer-type.type.js';
import { User } from './user.type.js';


export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Good[];
  user: User;
  location: OfferLocation;

}

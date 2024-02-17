import { City, Good, OfferLocation, OfferType } from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: City;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public isFavorites?: boolean;
  public rating?: number;
  public type?: OfferType;
  public bedrooms?: number;
  public maxAdults?: number;
  public price?: number;
  public goods?: Good[];
  public comment?: number;
  public location?: OfferLocation;
}

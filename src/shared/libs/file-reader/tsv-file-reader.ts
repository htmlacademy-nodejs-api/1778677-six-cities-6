import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { City, Good, Offer, OfferType, UserType} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, postDate, city, previewImage, images, isPremium, isFavorites, rating, type, bedrooms, maxAdults, price, goods, name, email, avatar, password, userType, comment, latitude, longitude]) => ({
        title,
        description,
        postDate: new Date(postDate),
        city: City[city as 'Hamburg' | 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Dusseldorf'],
        previewImage,
        images: images.split(',')
          .map((image) => ({image})),
        isPremium: Boolean(isPremium),
        isFavorites: Boolean(isFavorites),
        rating: Number.parseInt(rating, 10),
        type: OfferType[type as 'apartment' | 'house' | 'room' | 'hotel'],
        bedrooms: Number.parseInt(bedrooms, 10),
        maxAdults: Number.parseInt(maxAdults, 10),
        price: Number.parseInt(price, 10),
        goods: goods.split(',')
          .map((good) => Good[good.trim() as 'Breakfast' | 'AirConditioning' | 'Laptop' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge']),
        user: { name, email, avatar, password, userType: UserType[userType as 'Pro' | 'Regular']},
        comment: Number.parseInt(comment, 10),
        location: { latitude: parseFloat(latitude), longitude: parseFloat(longitude)},
      }));
  }
}

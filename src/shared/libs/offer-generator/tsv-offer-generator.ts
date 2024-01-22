import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { City, Good, MockServerData, OfferType, UserType } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 5;

const MIN_ADULTS = 1;
const MAX_ADULTS = 5;

const MIN_COMMENT = 0;
const MAX_COMMENT = 10;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem(Object.values(City));
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItem<string[]>(this.mockData.images).join(',');
    const isPremium = getRandomItem<boolean>(this.mockData.isPremium);
    const isFavorites = getRandomItem<boolean>(this.mockData.isFavorites);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const type = getRandomItem(Object.values(OfferType));
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS).toString();
    const maxAdults = generateRandomValue(MIN_ADULTS, MAX_ADULTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const goods = getRandomItems<string>(Object.values(Good)).join(',');
    const name = getRandomItem(this.mockData.names);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const password = getRandomItem(this.mockData.passwords);
    const userType = getRandomItem(Object.values(UserType));
    const comment = generateRandomValue(MIN_COMMENT, MAX_COMMENT).toString();
    const latitude = getRandomItem<string>(this.mockData.latitudes);
    const longitude = getRandomItem<string>(this.mockData.longitudes);

    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title, description, postDate, city,
      previewImage, images, isPremium, isFavorites,
      rating, type, bedrooms, maxAdults, price, goods,
      name, email, avatar, password, userType, comment,
      latitude, longitude
    ].join('\t');
  }
}

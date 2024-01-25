import { City, Good, Offer, OfferType, UserType} from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    previewImage,
    images,
    isPremium,
    isFavorites,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    name,
    email,
    avatar,
    password,
    userType,
    comment,
    latitude,
    longitude
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: city as City,
    previewImage,
    images: images.split(',')
      .map((image) => image.trim()),
    isPremium: Boolean(isPremium),
    isFavorites: Boolean(isFavorites),
    rating: Number.parseInt(rating, 10),
    type: type as OfferType,
    bedrooms: Number.parseInt(bedrooms, 10),
    maxAdults: Number.parseInt(maxAdults, 10),
    price: Number.parseInt(price, 10),
    goods: goods.split(',')
      .map((good) => good.trim() as Good),
    user: { name, email, avatar, password, userType: userType as UserType },
    comment: Number.parseInt(comment, 10),
    location: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
  };
}


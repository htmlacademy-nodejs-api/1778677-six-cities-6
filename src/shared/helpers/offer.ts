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
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    name,
    email,
    avatar,
    userType,
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
    isPremium: isPremium === 'true',
    type: type as OfferType,
    bedrooms: Number.parseInt(bedrooms, 10),
    maxAdults: Number.parseInt(maxAdults, 10),
    price: Number.parseInt(price, 10),
    goods: goods.split(',')
      .map((good) => good.trim() as Good),
    user: { name, email, avatar, userType: userType as UserType },
    location: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
  };
}


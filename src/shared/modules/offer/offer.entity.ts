import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { City, Good, OfferType, OfferLocation } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true, minlength: [10,'Min length for title is 10'], maxlength: [100,'Max length for title is 100'] })
  public title!: string;

  @prop({trim: true, required: true, minlength: [20,'Min length for description is 20'], maxlength: [1024,'Max length for description is 1024'] })
  public description!: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({ required: true, type: () => String, enum: Object.values(City)})
  public city: City;

  @prop({required: true})
  public previewImage!: string;

  @prop({required: true, type: () => [String], validate: [(images: string[]) => images.length === 6, 'Должно быть ровно 6 фотографий']
  })
  public images!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public isFavorites: boolean;

  @prop({ required: true, min: 1, max: 5 })
  public rating!: number;

  @prop({ required: true, type: () => String, enum: Object.values(OfferType) })
  public type!: OfferType;

  @prop({ required: true, min: 1, max: 8 })
  public bedrooms!: number;

  @prop({ required: true, min: 1, max: 10 })
  public maxAdults!: number;

  @prop({ required: true, min: 100, max: 100000 })
  public price!: number;

  @prop({ required: true, type: () => [String], enum: Object.values(Good)})
  public goods!: Good[];

  @prop({ref: UserEntity, required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({default: 0})
  public comment!: number;

  @prop({ required: true, type: () => OfferLocation })
  public location!: OfferLocation;

}

export const OfferModel = getModelForClass(OfferEntity);

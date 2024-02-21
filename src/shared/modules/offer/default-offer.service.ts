import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_OFFER_COUNT } from './offer.constant.js';
import { SortOrder } from '../../types/sort-order.enum.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  private commentsPipeline = [
    {
      $lookup: {
        from: 'comments',
        let: { offerId: '$_id' },
        pipeline: [{ $match: { $expr: { $eq: ['$$offerId', '$offerId'] } } }, { $project: { _id: 0, rating: 1 } }],
        as: 'comments',
      },
    },
    {
      $addFields: {
        commentsCount: { $size: '$comments' },
        rating: { $avg: '$comments.rating' },
      },
    },
    { $unset: ['comments'] },
  ];

  private favoritesPipeline = [
    {
      $lookup: {
        from: 'users',
        let: { offerId: '$_id' },
        pipeline: [{ $match: { $expr: { $in: ['$$offerId', '$favorites'] } } }, { $project: { _id: 1 } }],
        as: 'isFavorite',
      },
    },
  ];

  private authorPipeline = [
    {
      $lookup: {
        from: 'users',
        localField: 'authorId',
        foreignField: '_id',
        as: 'author',
      },
    },
  ];

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .aggregate([
        {
          $match: {
            $expr: {
              $eq: ['$_id', { $toObjectId: offerId }],
            },
          },
        },
        ...this.commentsPipeline,
        ...this.authorPipeline,
        ...this.favoritesPipeline,
      ])
      .exec()
      .then(([result]) => result ?? null);
  }

  public async find(count?: number, sort: Record<string, SortOrder> = { postDate: SortOrder.Desc },): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .aggregate([
        ...this.commentsPipeline,
        ...this.authorPipeline,
        ...this.favoritesPipeline,
        { $limit: limit },
        { $sort: sort },
      ])
      .exec();

  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        comment: 1,
      }}).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async findPremium(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_PREMIUM_OFFER_COUNT;
    return this.offerModel
      .aggregate([
        {
          $match: {
            $and: [{ isPremium: true }],
          },
        },
        ...this.commentsPipeline,
        ...this.authorPipeline,
        ...this.favoritesPipeline,
        { $limit: limit },
        { $sort: { postDate: SortOrder.Desc } },
      ])
      .exec();
  }

  public async findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        ...this.favoritesPipeline,
        { $match: { $expr: { $in: [{ _id: { $toObjectId: userId } }, '$isFavorite'] } } },
        ...this.commentsPipeline,
        ...this.authorPipeline,
        { $sort: { postDate: SortOrder.Desc } },
      ])
      .exec();
  }

}

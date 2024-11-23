import { Offer } from '../../types/offer.type.js';
import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Appartament } from '../../types/appartament.type.js';
import { Rating } from '../../types/rating.type.js';
import { User } from '../../types/user.type.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): Offer[] {
    if (!this.rawData){
      throw new Error('File was not read');
    }
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, createdDate, city, previewImage, images, premiumFlag, favoritesFlag, rating, type,
        rooms, guests, price, convenience, UserName, email, avatarPath, UserPassword, UserType, countComments, latitude, longitude]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        city,
        previewImage,
        images: Array.isArray(images) ? images : [images], // Убедитесь, что images - это массив
        premiumFlag: premiumFlag === 'true', // Преобразуем строку в boolean
        favoritesFlag: favoritesFlag === 'true', // Преобразуем строку в boolean
        rating: Number.parseFloat(rating) as Rating,
        type: Appartament[type as 'apartment' | 'house'],
        rooms: Number.parseInt(rooms, 10),
        guests: Number.parseInt(guests, 10),
        price: Number.parseInt(price, 10),
        convenience: convenience.split(';')
          .map((name) => ({name})),
        authorOffer: { UserName, email, avatarPath, UserPassword, UserType } as unknown as User,
        comments: Number.parseInt(countComments, 10), // Убедитесь, что это правильное значение для comments
        location: {latitude: Number.parseFloat(latitude), longitude: Number.parseFloat(longitude)}
      }));
  }
}

import { Appartament } from './appartament.type.js';
import { City } from './city.type.js';
import { Convenience } from './convenience.type.js';
import { Location } from './location.type.js';
import { Rating } from './rating.type.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  premiumFlag: boolean;
  favoritesFlag: boolean;
  rating: Rating;
  type:Appartament;
  rooms: number;
  guests: number;
  price: number;
  convenience: Convenience[];
  authorOffer: User;
  comments: number;
  location: Location;
}

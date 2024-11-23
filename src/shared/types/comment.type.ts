import { Rating } from './rating.type.js';
import { User } from './user.type.js';

export type Comment = {
  text: string;
  postDate: Date;
  rating: Rating;
  author: User;
}

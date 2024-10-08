import { List } from '../list/list.entity';
import { Progress } from '../progress/progress.entity';
import { Rating } from '../rating/rating.entity';
import { Review } from '../review/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column({unique: true})
  email: string;

  @Column()
  photo: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  @Column()
  isOnboarded: boolean;

  @OneToMany(type => List, list => list.user)
  lists: List[]

  @OneToMany(type => Progress, progress => progress.user)
  progress: Progress[];

  @OneToMany(type => Rating, rating => rating.user)
  ratings: Rating[];

  @OneToMany(type => Review, review => review.user)
  reviews: Review[];
}
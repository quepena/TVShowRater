import { List } from 'src/list/list.entity';
import { Progress } from 'src/progress/progress.entity';
import { Rating } from 'src/rating/rating.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  photo: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  @OneToMany(type => List, list => list.user)
  lists: List[]

  @OneToMany(type => Progress, progress => progress.user)
  progress: Progress[];

  @OneToMany(type => Rating, rating => rating.user)
  ratings: Rating[];
}
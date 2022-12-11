import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  photo: string;

  @Column()
  biography: string;
}
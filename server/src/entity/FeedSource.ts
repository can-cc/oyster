import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FeedSource {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public username: string;
}

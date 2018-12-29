import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,JoinColumn, OneToOne, UpdateDateColumn } from 'typeorm';
import { FeedData } from '../typing/feed';
import { Feed } from './Feed';

@Entity()
export class FeedMark {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @OneToOne(() => Feed)
  @JoinColumn()
  public feed: Feed;

  @Column()
  public type: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}

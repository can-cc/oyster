import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
  ManyToOne,
  Unique,
  Index
} from 'typeorm';
import { Feed } from './feed';
import { User } from './app-user';

@Entity()
@Unique(['user', 'feed'])
export class FeedMark {
  @PrimaryGeneratedColumn()
  public id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  public user: User;

  @Index()
  @ManyToOne(() => Feed)
  @JoinColumn()
  public feed: Feed;

  @Column()
  public type: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  constructor(markData) {
    if (markData) {
      this.user = markData.user;
      this.feed = markData.feed;
      this.type = markData.type;
    }
  }
}

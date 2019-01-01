import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,JoinColumn, OneToOne, UpdateDateColumn, ManyToOne, Unique, ManyToMany, OneToMany } from 'typeorm';
import { Feed } from './Feed';
import { User } from './User';

@Entity()
@Unique(["user", "feed"])
export class FeedMark {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  public user: User;

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

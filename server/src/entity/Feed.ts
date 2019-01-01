import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { FeedData } from '../typing/feed';
import { FeedSource } from './FeedSource';
import { FeedMark } from './FeedMark';

@Entity({ name: 'feed' })
export class Feed {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @ManyToOne(() => FeedSource)
  @JoinColumn()
  public source: FeedSource;

  @Column()
  public originHref: string;

  @Column()
  public author: string;

  @CreateDateColumn()
  public publishedDate: Date;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => FeedMark, mark => mark.feed)
  public marks: FeedMark[];

  constructor(feedData: FeedData) {
    if (!feedData) {
      return;
    }
    this.title = feedData.title;
    this.content = feedData.content;
    this.source = feedData.source;
    this.originHref = feedData.originHref;
    this.author = feedData.author;
  }
}

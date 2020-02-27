import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index
} from 'typeorm';
import { FeedData } from '../typing/feed';
import { FeedSource } from './feed-source';
import { FeedMark } from './feed-mark';

// make sure filename `feed.ts`
@Entity()
export class Feed {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: true })
  public guid: string;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Index()
  @ManyToOne(() => FeedSource, { nullable: true })
  @JoinColumn()
  public source: FeedSource;

  @Column()
  public originHref: string;

  @Column()
  public author: string;

  @CreateDateColumn()
  public publishedDate: Date;

  @Index()
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
    this.guid = feedData.guid;
    this.title = feedData.title;
    this.content = feedData.content;
    this.source = feedData.source;
    this.originHref = feedData.originHref;
    this.author = feedData.author;
  }
}

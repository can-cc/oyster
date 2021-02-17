import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
  PrimaryColumn
} from 'typeorm';
import { FeedData } from '../typing/feed';
import { FeedSource } from './feed-source';
import { FeedMark } from './feed-mark';

@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true })
  public globalID: string;

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

  @Column()
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
    this.globalID = feedData.globalID;
    this.title = feedData.title;
    this.content = feedData.content;
    this.source = feedData.source;
    this.originHref = feedData.originHref;
    this.publishedDate = feedData.publishedDate;
    this.author = feedData.author;
  }
}

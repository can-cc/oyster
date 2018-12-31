import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FeedData } from '../typing/feed';
import { FeedSource } from './FeedSource';

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

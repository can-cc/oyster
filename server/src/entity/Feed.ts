import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { FeedData } from '../typing/feed';

@Entity({ name: 'feed' })
export class Feed {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column()
  public sourceId: string;

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
    this.sourceId = feedData.sourceId;
    this.originHref = feedData.originHref;
    this.author = feedData.author;
    this.sourceId = '123';
  }
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  constructor(feedData: any) {
    this.title = feedData.title;
    this.content = feedData.content;
    this.sourceId = feedData.sourceId;
    this.originHref = feedData.originHref;
    this.author = feedData.author;
  }
}

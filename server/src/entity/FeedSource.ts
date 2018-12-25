import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class FeedSource {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public url: string;

  @Column({ nullable: true })
  public logoUrl: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  constructor(feedSourceData) {
    if (!feedSourceData) {
      return;
    }
    this.name = feedSourceData.name;
    this.url = feedSourceData.url;
  }
}

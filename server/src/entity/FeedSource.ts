import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Feed } from './Feed';

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

  @Column({
    default: false
  })
  public isDeleted: boolean;

  constructor(feedSourceData?: any) {
    if (!feedSourceData) {
      return;
    }
    this.name = feedSourceData.name;
    this.url = feedSourceData.url;
  }
}

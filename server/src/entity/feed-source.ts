import { Entity, Index, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class FeedSource {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Index()
  @Column()
  public url: string;

  @Column({ nullable: true })
  public logoUrl: string;

  @Column({ type: 'bytea', nullable: true })
  public favicon?: any;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column({
    default: false,
  })
  public isDeleted: boolean;

  constructor(feedSourceData?: any) {
    if (!feedSourceData) {
      return;
    }
    this.name = feedSourceData.name;
    this.url = feedSourceData.url;
    this.favicon = feedSourceData.favicon;
  }
}

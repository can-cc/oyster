import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,JoinColumn, OneToOne, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Feed } from './Feed';
import { User } from './User';

@Entity()
export class FeedMark {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  public user: User;

  @OneToOne(() => Feed)
  @JoinColumn()
  public feed: Feed;

  @Column()
  public type: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}

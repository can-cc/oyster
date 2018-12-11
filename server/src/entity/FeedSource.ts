import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FeedSource {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public url: string;
  
  @Column({name: 'created_at'})
  public createdAt: Date;

  @Column({name: 'updated_at'})
  public updatedAt: Date;
}

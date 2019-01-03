import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class WebpushSubscriber {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public serialization: string;

  @Column()
  public useragent: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}

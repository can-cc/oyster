import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'rss-atom' })
export class Atom {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public sourceId: string;

  @Column()
  public originHref: string;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column()
  public hash: string;

  @Column()
  public author: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}

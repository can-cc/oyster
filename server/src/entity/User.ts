import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public username: string;

  @Column()
  public hash: string;

  @Column({name: 'created_at'})
  public createdAt: Date;

  @Column({name: 'updated_at'})
  public updatedAt: Date;
}

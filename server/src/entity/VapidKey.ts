import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class VapidKey {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public publicKey: string;

  @Column()
  public privateKey: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}

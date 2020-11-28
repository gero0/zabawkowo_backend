import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ToyType } from "./ToyType";
import { User } from "./User";

enum Status {
  Active='Active',
  Closed='Closed'
}

@Entity()
export class Toy extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', nullable: false})
  name: string;

  @Column({type: 'varchar', nullable: false})
  description: string;

  @Column({type: 'decimal', nullable: false})
  price: number;

  @Column({type: 'varchar', nullable: true})
  age: number;

  @Column({type: 'varchar', nullable: true})
  photo: string;

  @Column({type: 'enum', enum: Status, nullable: false})
  status: string;

  @ManyToOne(() => User, (user) => user.toys)
  user_id: User;

  @ManyToMany(() => ToyType)
  @JoinTable({name: 'toyTypeXRef'})
  types: ToyType[];
}
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
  Name: string;

  @Column({type: 'varchar', nullable: false})
  Description: string;

  @Column({type: 'decimal', nullable: false})
  Price: number;

  @Column({type: 'varchar', nullable: true})
  Age: number;

  @Column({type: 'varchar', nullable: true})
  Photo: string;

  @Column({type: 'enum', enum: Status, nullable: false})
  Status: string;

  @ManyToOne(() => User, (user) => user.toys)
  User_id: User;

  @ManyToMany(() => ToyType)
  @JoinTable({name: 'toyTypeXRef'})
  types: ToyType[];
}
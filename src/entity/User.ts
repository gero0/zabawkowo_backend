import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Toy } from "./Toy";

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', nullable: false})
  First_name: string;

  @Column({type: 'varchar', nullable: false})
  Last_Name: string;

  @Column({type: 'varchar', nullable: false})
  Creation_date: Date;

  @Column({type: 'varchar', nullable: false, unique: true})
  email: string;

  @Column({type: 'varchar', nullable: false})
  password: string;

  @Column({type: 'varchar', nullable: false})
  Phone_number: string;

  @Column({type: 'varchar', nullable: false})
  Address_id: number;

  @OneToMany(() => Toy, (toy) => toy.User_id)
  toys: Toy[];
}

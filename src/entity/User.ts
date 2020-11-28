import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Toy } from "./Toy";

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', nullable: false, unique: true})
  username: string;

  @Column({type: 'varchar', nullable: false, unique: true})
  email: string;

  @Column({type: 'varchar', nullable: false})
  password: string;

  @Column({type: 'varchar', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  creation_date: Date;

  @Column({type: 'varchar', nullable: false})
  first_name: string;

  @Column({type: 'varchar', nullable: false})
  last_name: string;

  @Column({type: 'varchar', nullable: true})
  phone_number: string;

  @OneToMany(() => Toy, (toy) => toy.user_id)
  toys: Toy[];
}

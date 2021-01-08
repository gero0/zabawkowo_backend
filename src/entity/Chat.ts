import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./Message";

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  user_id_1: number;

  @Column({ type: "int", nullable: false })
  user_id_2: number;

  @Column({ type: "boolean", nullable: false, default: false })
  user_notification_1: boolean;

  @Column({ type: "boolean", nullable: false, default: false })
  user_notification_2: boolean;

  @OneToMany(() => Message, (message) => message.chat_id)
  messages: Message[];
}

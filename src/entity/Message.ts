import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./Chat";

enum MessageStatus {
  Seen = "Seen",
  Not_seen = "Not_seen",
}

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat_id: number;

  @Column({ type: "int", nullable: false })
  sender_id: number;

  @Column({ type: "varchar", nullable: false })
  text: string;

  @Column({ type: "timestamp", nullable: false })
  send_date: Date;

  @Column({ type: "enum", enum: MessageStatus, nullable: false })
  message_status: string;
}

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum MessageStatus {
  Seen = 'Seen',
  Not_seen = 'Not_seen',
}

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  chat_id: number;

  @Column({ type: "int", nullable: false })
  sender_id: number;

  @Column({ type: "varchar", nullable: false })
  text: string;

  @Column({ type: "date", nullable: false })
  send_date: Date;

  @Column({ type: "enum", enum: MessageStatus, nullable: false })
  message_status: string;
}

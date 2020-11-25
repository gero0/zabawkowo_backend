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
  Chat_id: number;

  @Column({ type: "int", nullable: false })
  Sender_id: number;

  @Column({ type: "varchar", nullable: false })
  text: string;

  @Column({ type: "date", nullable: false })
  Send_date: Date;

  @Column({ type: "enum", enum: MessageStatus, nullable: false })
  Message_status: string;
}

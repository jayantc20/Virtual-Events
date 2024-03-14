import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "varchar" })
  time: string;

  @Column({ type: "varchar" })
  description: string;

  @ManyToOne(() => User, (user) => user.organizedEvents)
  organizer: User;

  @ManyToMany(() => User, (user) => user.registeredEvents)
  @JoinTable() // Specify the join table for the many-to-many relationship
  participants: User[];

  constructor(
    id: number,
    date: string,
    time: string,
    description: string,
    organizer: User,
    participants: User[]
  ) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.description = description;
    this.organizer = organizer;
    this.participants = participants;
  }
}

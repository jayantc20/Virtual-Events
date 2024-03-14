import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from "typeorm";
import { Event } from "./Event";

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  username: string;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "boolean", default: false })
  isOrganizer: boolean;

  @OneToMany(() => Event, (event) => event.organizer)
  organizedEvents: Event[];

  @OneToMany(() => Event, (event) => event.participants)
  registeredEvents: Event[];

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    isOrganizer: boolean = false,
    organizedEvents: Event[],
    registeredEvents: Event[]
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.isOrganizer = isOrganizer;
    this.organizedEvents = organizedEvents;
    this.registeredEvents = registeredEvents;
  }
}

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventType } from "../shared_models/types/sharedTypes";
import { User } from "./User";

@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ default: () => "now()", type: "timestamptz" })
    creationDate: Date;

    @Column({ type: "text" })
    type: EventType;

    @Column()
    isFulfilled: boolean;

    @Column()
    data: string;

    @Column()
    userId: number;

    @JoinColumn({ name: "user_id" })
    @ManyToOne(_ => User, x => x.events)
    user: User;
}
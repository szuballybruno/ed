import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EventType } from "../shared_models/types/sharedTypes";

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
}
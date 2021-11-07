import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SessionActivityType } from "../shared_models/types/sharedTypes";
import { User } from "./User";

@Entity()
export class UserSessionActivity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    creationDate: Date;

    @Column({ type: "text" })
    type: SessionActivityType;

    // user
    @Column()
    userId: number;

    @ManyToOne(_ => User, x => x.sessionActivity)
    @JoinColumn({ name: "userId" })
    user: User;
}
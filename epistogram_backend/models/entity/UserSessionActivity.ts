import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SessionActivityType } from "../shared_models/types/sharedTypes";
import { ActivitySession } from "./ActivitySession";
import { CoinTransaction } from "./CoinTransaction";
import { User } from "./User";

@Entity()
export class UserSessionActivity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ default: () => "now()", type: "timestamptz" })
    creationDate: Date;

    @Column({ type: "text" })
    type: SessionActivityType;

    // user
    @Column()
    activitySessionId: number;

    @ManyToOne(_ => ActivitySession, x => x.activities)
    @JoinColumn({ name: "activity_session_id" })
    activitySession: ActivitySession;
}
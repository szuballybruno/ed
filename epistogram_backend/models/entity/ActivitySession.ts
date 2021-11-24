import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { UserSessionActivity } from "./UserSessionActivity";

@Entity()
export class ActivitySession {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamptz" })
    startDate: Date;

    @Column({ type: "timestamptz" })
    endDate: Date;

    @Column()
    isFinalized: boolean;

    // user 
    userId: number;

    @ManyToOne(_ => User, x => x.activitySessions)
    @JoinColumn({ name: "user_id" })
    user: User;

    // activities 
    @OneToMany(_ => UserSessionActivity, x => x.activitySession)
    @JoinColumn()
    activities: UserSessionActivity[];
}
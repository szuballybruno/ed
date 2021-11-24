import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SessionActivityType } from "../shared_models/types/sharedTypes";
import { CoinAcquire } from "./CoinAcquire";
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
    userId: number;

    @ManyToOne(_ => User, x => x.sessionActivity)
    @JoinColumn({ name: "userId" })
    user: User;

    // coin acquires 
    @JoinColumn()
    @OneToMany(_ => CoinAcquire, x => x.sessionActivity)
    coinAcquires: CoinAcquire[];
}
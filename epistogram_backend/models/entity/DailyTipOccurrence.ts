import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DailyTip } from "./DailyTip";

@Entity()
export class DailyTipOccurrence {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ default: () => "timezone('utc'::text, now())" })
    creationDate: Date;

    // daily tip
    @Column()
    dailyTipId: number;

    @ManyToOne(_ => DailyTip, x => x.occurrences)
    @JoinColumn({ name: "dailyTip_id" })
    dailyTip: DailyTip;
}
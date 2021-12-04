import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DailyTipOccurrence } from "./DailyTipOccurrence";
import { StorageFile } from "./StorageFile";

@Entity()
export class DailyTip {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    // video file
    @Column()
    videoFileId: number;

    @OneToOne(_ => StorageFile)
    @JoinColumn({ name: "video_file_id" })
    videoFile: StorageFile;

    // occurrances
    @OneToMany(_ => DailyTipOccurrence, x => x.dailyTip)
    @JoinColumn()
    occurrences: DailyTipOccurrence[];
}
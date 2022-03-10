import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskCodeType } from "../Types";

@Entity()
export class TaskLock {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    taskCode: TaskCodeType;
    
    @CreateDateColumn({ default: () => "now()", type: "timestamptz" })
    creationDate: Date;
}
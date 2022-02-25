import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exam } from "./Exam";
import { User } from "./User";

@Entity()
export class UserExamProgressBridge {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: "timestamptz" })
    completionDate: Date;

    // user 
    @Column()
    userId: number;

    @JoinColumn({ name: "user_id" })
    @ManyToOne(_ => User, x => x.examProgressBridges)
    user: User;

    // video 
    @Column()
    examId: number;

    @JoinColumn({ name: "exam_id" })
    @ManyToOne(_ => Exam, x => x.userProgressBridges)
    exam: Exam;
}
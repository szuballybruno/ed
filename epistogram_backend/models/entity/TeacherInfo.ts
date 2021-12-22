import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class TeacherInfo {

    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn()
    @OneToOne(_ => User, x => x.teacherInfo)
    user: User;
}
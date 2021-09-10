import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CourseTag} from "./CourseTag";

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // Tag's courses
    @OneToMany(() => CourseTag, co => co.tag)
    @JoinColumn()
    courseTags: CourseTag[]

}
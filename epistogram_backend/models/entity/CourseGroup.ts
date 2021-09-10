import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Course} from "./Course";
import {Group} from "./Group";

@Entity()
export class CourseGroup {

    @PrimaryGeneratedColumn()
    id: number;

    // course
    @Column()
    courseId: number;

    @ManyToOne(type => Course, course => course.courseGroups)
    @JoinColumn({ name: "courseId" })
    course: Course;

    // group
    @Column()
    groupId: number;

    @ManyToOne(type => Group, group => group.courseGroups)
    @JoinColumn({ name: "groupId" })
    group: Group

}
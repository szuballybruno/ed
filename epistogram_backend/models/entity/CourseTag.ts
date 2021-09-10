import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Course} from "./Course";
import {Tag} from "./Tag";

@Entity()
export class CourseTag {

    @PrimaryGeneratedColumn()
    id: number;

    // course
    @Column()
    courseId: number;

    @ManyToOne(type => Course, course => course.courseTags)
    @JoinColumn({ name: "courseId" })
    course: Course;

    // teacher
    @Column()
    tagId: number;

    @ManyToOne(type => Tag, tag => tag.courseTags)
    @JoinColumn({ name: "tagId" })
    tag: Tag;


}
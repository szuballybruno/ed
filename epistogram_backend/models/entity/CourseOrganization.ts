import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Organization} from "./Organization";
import {Course} from "./Course";
import {Group} from "./Group";
import {User} from "./User";
import {Tag} from "./Tag";

@Entity()
export class CourseOrganization {

    @PrimaryGeneratedColumn()
    id: number;

    // course
    @Column()
    courseId: number;

    @ManyToOne(type => Course, course => course.courseOrganizations)
    @JoinColumn({ name: "courseId" })
    course: Course;

    // organization
    @Column()
    organizationId: number;

    @ManyToOne(type => Organization, organization => organization.courseOrganizations)
    @JoinColumn({ name: "organizationId" })
    organization: Organization;




}
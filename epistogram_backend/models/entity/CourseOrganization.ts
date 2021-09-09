import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from "./Organization";
import { Course } from "./Course";
import { Group } from "./Group";
import { User } from "./User";
import { Tag } from "./Tag";

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

    // group
    @Column()
    groupId: number;

    @ManyToOne(type => Group, group => group.courseOrganizations)
    @JoinColumn({ name: "groupId" })
    group: Group;

    // teacher
    @Column()
    tagId: number;

    @ManyToOne(type => Tag, tag => tag.courseOrganizations)
    @JoinColumn({ name: "tagId" })
    tag: Tag;
}
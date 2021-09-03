import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exam } from "./Exam";
import { User } from "./User";
import { Video } from "./Video";
import { Organization } from "./Organization";

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    category: string;

    @Column()
    courseGroup: string;

    @Column()
    permissionLevel: string;

    @Column()
    colorOne: string;

    @Column()
    colorTwo: string;

    @Column()
    organizationId: number;

    // organization
    @ManyToOne(() => Organization, organization => organization.courses)
    @JoinColumn({ name: 'organizationId' })
    organization: Organization;

    // videos 
    @OneToMany(type => Video, video => video.course, { cascade: true })
    @JoinColumn()
    videos: Video[];

    // exams
    @OneToMany(type => Exam, exam => exam.course, { cascade: true })
    @JoinColumn()
    exams: Exam[];
}
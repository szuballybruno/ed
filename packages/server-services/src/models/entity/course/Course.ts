import { DeleteDateColumn, Entity, PrimaryGeneratedColumn } from '../../MyORM';
import { DeletionDateColumn, XOneToMany, XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';
import { PermissionAssignmentBridge } from '../authorization/PermissionAssignmentBridge';
import { CourseAccessBridge } from '../misc/CourseAccessBridge';
import { CourseRatingQuestionUserAnswer } from '../courseRating/CourseRatingQuestionUserAnswer';
import { PrequizUserAnswer } from '../prequiz/PrequizUserAnswer';
import { ShopItem } from '../misc/ShopItem';
import { UserCourseBridge } from '../misc/UserCourseBridge';
import { CourseVersion } from './CourseVersion';

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'Course'>;

    // deleted flag - deletion is associated 
    // with the high level course entity,
    // if an old version of the course is referenced,
    // deletion date is ignored,
    // but when looking at the latest state, 
    // it will not be shown 
    @DeletionDateColumn()
    @DeleteDateColumn()
    deletionDate: Date | null;

    // TO MANY

    // shop items
    @XOneToMany<Course>()(() => ShopItem, x => x.course)
    shopItems: ShopItem[];

    // user course bridges 
    @XOneToMany<Course>()(() => UserCourseBridge, x => x.course)
    userCourseBridges: UserCourseBridge[];

    // courseAccessBridges
    @XOneToMany<Course>()(() => CourseAccessBridge, x => x.course)
    userAccessBridges: CourseAccessBridge[];

    // contextPermissionAssignmentBridges
    @XOneToMany<Course>()(() => PermissionAssignmentBridge, x => x.contextCourse)
    contextPermissionAssignmentBridges: PermissionAssignmentBridge[];

    // prequiz questions
    @XOneToMany<Course>()(() => PrequizUserAnswer, x => x.course)
    prequizUserAnswers: PrequizUserAnswer[];

    // courseRatingUserAnswers
    @XOneToMany<Course>()(() => CourseRatingQuestionUserAnswer, x => x.course)
    courseRatingUserAnswers: CourseRatingQuestionUserAnswer[];

    // courseRatingUserAnswers
    @XOneToMany<Course>()(() => CourseVersion, x => x.course)
    courseVersions: CourseVersion[];
}
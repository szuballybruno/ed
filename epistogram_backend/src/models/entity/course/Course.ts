import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XOneToMany } from '../../../services/XORM/XORMDecorators';
import { PermissionAssignmentBridge } from '../authorization/PermissionAssignmentBridge';
import { CourseAccessBridge } from '../CourseAccessBridge';
import { CourseRatingQuestionUserAnswer } from '../courseRating/CourseRatingQuestionUserAnswer';
import { PrequizUserAnswer } from '../prequiz/PrequizUserAnswer';
import { ShopItem } from '../ShopItem';
import { UserCourseBridge } from '../UserCourseBridge';
import { CourseVersion } from './CourseVersion';

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number;
    
    // shop items
    @XOneToMany<Course>()(ShopItem, x => x.course)
    shopItems: ShopItem[];

    // user course bridges 
    @XOneToMany<Course>()(UserCourseBridge, x => x.course)
    userCourseBridges: UserCourseBridge[];

    // courseAccessBridges
    @XOneToMany<Course>()(CourseAccessBridge, x => x.course)
    userAccessBridges: CourseAccessBridge[];
    
    // contextPermissionAssignmentBridges
    @XOneToMany<Course>()(PermissionAssignmentBridge, x => x.contextCourse)
    contextPermissionAssignmentBridges: PermissionAssignmentBridge[];
    
    // prequiz questions
    @XOneToMany<Course>()(PrequizUserAnswer, x => x.course)
    prequizUserAnswers: PrequizUserAnswer[];

    // courseRatingUserAnswers
    @XOneToMany<Course>()(CourseRatingQuestionUserAnswer, x => x.course)
    courseRatingUserAnswers: CourseRatingQuestionUserAnswer[];

    // courseRatingUserAnswers
    @XOneToMany<Course>()(CourseVersion, x => x.course)
    courseVersions: CourseVersion[];
}
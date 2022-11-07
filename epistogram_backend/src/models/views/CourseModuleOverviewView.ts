import { XViewColumn } from '../../services/XORM/XORMDecorators';


export class CourseModuleOverviewView {

    @XViewColumn()
    courseId: number;

    @XViewColumn()
    moduleId: number;

    @XViewColumn()
    moduleName: string;

    @XViewColumn()
    videoTitle: string;

    @XViewColumn()
    videoLengthSeconds: number;
}
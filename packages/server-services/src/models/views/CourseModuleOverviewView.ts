import { XViewColumn } from '@episto/xorm';


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
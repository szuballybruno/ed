import { JoinColumn, OneToOne, ViewColumn, ViewEntity } from 'typeorm';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserActivityFlatView {

    @ViewColumn()
    userId: boolean;

    @ViewColumn()
    canSetInvitedUserCompany: boolean;

    @ViewColumn()
    canAccessCourseAdministration: boolean;

    @ViewColumn()
    canAccessAdministration: boolean;

    @ViewColumn()
    canAccessApplication: boolean;

    @ViewColumn()
    canAccessShopAdministration: boolean;

    @ViewColumn()
    canChangeCourseMode: boolean;

    // user
    @OneToOne(_ => User, x => x.userActivity)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
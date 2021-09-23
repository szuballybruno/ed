import { JoinColumn, OneToOne, ViewColumn, ViewEntity } from "typeorm";
import { User } from "../entity/User";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class UserActivityFlatView {

    @ViewColumn()
    userId: boolean;

    @ViewColumn()
    canSetInvitedUserOrganization: boolean;

    @ViewColumn()
    canAccessCourseAdministration: boolean;

    @ViewColumn()
    canAccessAdministration: boolean;

    // user
    @OneToOne(_ => User, x => x.userActivity)
    @JoinColumn({ name: "userId" })
    user: User;
}
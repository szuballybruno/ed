import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XJoinColumn, XManyToOne, XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';
import { User } from './User';
import { VideoVersion } from '../video/VideoVersion';

@Entity()
export class UserVideoProgressBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'UserVideoProgressBridge'>;

    @Column({ type: 'double precision' })
    @XViewColumn()
    cursorSeconds: number;

    @Column()
    @XViewColumn()
    completedPercentage: number;

    // TO ONE 

    // user 
    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @JoinColumn({ name: 'user_id' })
    @ManyToOne(_ => User, x => x.videoProgressBridges)
    user: Relation<User>;

    // video version 
    @Column()
    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;
    @XManyToOne<UserVideoProgressBridge>()(() => VideoVersion, x => x.userProgressBridges)
    @XJoinColumn<UserVideoProgressBridge>('videoVersionId')
    videoVersion: Relation<VideoVersion>;
}
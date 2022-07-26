import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { User } from './User';
import { VideoVersion } from './video/VideoVersion';

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
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XViewColumn } from '../../services/XORM/XORMDecorators';
import { User } from './User';
import { VideoVersion } from './video/VideoVersion';

@Entity()
export class UserVideoProgressBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @Column({ nullable: true, type: 'timestamptz' })
    @XViewColumn()
    completionDate: Date;

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
    userId: number;
    @JoinColumn({ name: 'user_id' })
    @ManyToOne(_ => User, x => x.videoProgressBridges)
    user: Relation<User>;

    // video version 
    @Column()
    @XViewColumn()
    videoVersionId: number;
    @XManyToOne<UserVideoProgressBridge>()(() => VideoVersion, x => x.userProgressBridges)
    @XJoinColumn<UserVideoProgressBridge>('videoVersionId')
    videoVersion: Relation<VideoVersion>;
}
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne } from '../../services/XORM/XORMDecorators';
import { User } from './User';
import { VideoData } from './video/VideoData';
import { VideoVersion } from './video/VideoVersion';

@Entity()
export class UserVideoProgressBridge {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'timestamptz' })
    completionDate: Date;

    @Column({ type: 'double precision' })
    cursorSeconds: number;

    @Column()
    completedPercentage: number;

    // user 
    @Column()
    userId: number;
    @JoinColumn({ name: 'user_id' })
    @ManyToOne(_ => User, x => x.videoProgressBridges)
    user: Relation<User>;

    // video version 
    @Column()
    videoVersionId: number;
    @XManyToOne<UserVideoProgressBridge>()(VideoVersion, x => x.userProgressBridges)
    @XJoinColumn<UserVideoProgressBridge>('videoVersionId')
    videoVersion: Relation<VideoVersion>;
}
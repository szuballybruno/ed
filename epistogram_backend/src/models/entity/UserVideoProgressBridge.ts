import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { User } from './User';
import { Video } from './Video';

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

    // video 
    @Column()
    videoId: number;

    @JoinColumn({ name: 'video_id' })
    @ManyToOne(_ => Video, x => x.userProgressBridges)
    video: Relation<Video>;
}
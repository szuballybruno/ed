import { XJoinColumn, XManyToOne, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';
import { Column, Entity, PrimaryGeneratedColumn } from '../../MyORM';
import { VideoVersion } from '../video/VideoVersion';
import { User } from './User';

@Entity()
export class VideoCompletion {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'AnswerSession'>;

    @Column({ type: 'timestamptz' })
    @XViewColumn()
    completionDate: Date;

    //
    // TO ONE
    //

    // video 
    @Column()
    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;
    @XManyToOne<VideoCompletion>()(() => VideoVersion)
    @XJoinColumn<VideoCompletion>('videoVersionId')
    videoVersion: VideoVersion;

    // user 
    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @XManyToOne<VideoCompletion>()(() => User)
    @XJoinColumn<VideoCompletion>('userId')
    user: User;
}
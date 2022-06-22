import { Column, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { StorageFile } from '../StorageFile';
import { VideoFile } from './VideoFile';
import { VideoVersion } from './VideoVersion';

@Entity()
export class VideoData {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @Column()
    @XViewColumn()
    title: string;

    @Column()
    @XViewColumn()
    orderIndex: number;

    @Column({ nullable: true, type: 'text' })
    @XViewColumn()
    subtitle: string | null;

    @Column({ nullable: true, type: 'text' })
    @XViewColumn()
    description: string | null;

    //
    // TO ONE
    // 

    // video file
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    videoFileId: number | null;
    @XManyToOne<VideoData>()(() => VideoFile, x => x.videos)
    @XJoinColumn<VideoData>('videoFileId')
    videoFile: Relation<VideoFile>;

    // thumbnail file
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    thumbnailFileId: number | null;
    @XManyToOne<VideoData>()(() => StorageFile, x => x.videos)
    @XJoinColumn<VideoData>('thumbnailFileId')
    thumbnailFile: Relation<StorageFile>;

    //
    // TO MANY
    //

    // video versions 
    @XOneToMany<VideoData>()(() => VideoVersion, x => x.videoData)
    videoVersions: VideoVersion[];
}
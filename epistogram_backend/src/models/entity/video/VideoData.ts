import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IsDeletedFlag, XJoinColumn, XManyToOne, XOneToMany } from '../../../services/XORM/XORMDecorators';
import { StorageFile } from '../StorageFile';
import { VideoFile } from './VideoFile';
import { VideoVersion } from './VideoVersion';

@Entity()
export class VideoData {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date | null;

    @Column()
    title: string;

    @Column({ nullable: true })
    subtitle: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    orderIndex: number;

    //
    // TO ONE
    // 

    // video file
    @Column({ nullable: true })
    videoFileId: number;
    @XManyToOne<VideoData>()(() => VideoFile, x => x.videos)
    @XJoinColumn<VideoData>('videoFileId')
    videoFile: Relation<VideoFile>;

    // thumbnail file
    @Column({ nullable: true })
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
import { XJoinColumn, XManyToOne, XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { Column, Entity, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { StorageFile } from '../misc/StorageFile';
import { VideoVersion } from './VideoVersion';

@Entity()
export class VideoData {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'VideoData'>;

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

    @Column({ nullable: true, type: 'double precision' })
    @XViewColumn()
    videoFileLengthSeconds: number | null;

    //
    // TO ONE
    // 

    // storage file
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    videoFileId: Id<'StorageFile'> | null;
    @XManyToOne<VideoData>()(() => StorageFile)
    @XJoinColumn<VideoData>('videoFileId')
    videoFile: Relation<StorageFile> | null;

    // thumbnail file
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    thumbnailFileId: Id<'StorageFile'> | null;
    @XManyToOne<VideoData>()(() => StorageFile)
    @XJoinColumn<VideoData>('thumbnailFileId')
    thumbnailFile: Relation<StorageFile>;

    //
    // TO MANY
    //

    // video versions 
    @XOneToMany<VideoData>()(() => VideoVersion, x => x.videoData)
    videoVersions: VideoVersion[];
}
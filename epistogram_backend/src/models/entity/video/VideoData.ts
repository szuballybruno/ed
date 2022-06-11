import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IsDeletedFlag, XJoinColumn, XManyToOne } from '../../../services/XORM/XORMDecorators';
import { StorageFile } from '../StorageFile';
import { VideoFile } from './VideoFile';

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

    // video file
    @Column({ nullable: true })
    videoFileId: number;

    @XManyToOne<VideoData>()(VideoFile, x => x.videos)
    @XJoinColumn<VideoData>('videoFileId')
    videoFile: Relation<VideoFile>;

    // thumbnail file
    @Column({ nullable: true })
    thumbnailFileId: number | null;

    @XManyToOne<VideoData>()(StorageFile, x => x.videos)
    @XJoinColumn<VideoData>('thumbnailFileId')
    thumbnailFile: Relation<StorageFile>;
}
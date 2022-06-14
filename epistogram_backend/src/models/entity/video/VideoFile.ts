import { Column, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XOneToMany } from '../../../services/XORM/XORMDecorators';
import { StorageFile } from '.././StorageFile';
import { VideoData } from './VideoData';

@Entity()
export class VideoFile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'double precision' })
    lengthSeconds: number;

    // video file
    @Column({ nullable: true })
    storageFileId: number;

    @XManyToOne<VideoFile>()(() => StorageFile, s => s.videoFiles)
    @XJoinColumn<VideoFile>('storageFileId')
    storageFile: Relation<StorageFile>;

    // videos 
    @XOneToMany<VideoFile>()(() => VideoData, x => x.videoFile)
    videos: VideoData[];
}
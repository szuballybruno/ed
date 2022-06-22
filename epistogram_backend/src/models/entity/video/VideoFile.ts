import { Column, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { StorageFile } from '.././StorageFile';
import { VideoData } from './VideoData';

@Entity()
export class VideoFile {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @Column({ type: 'double precision' })
    @XViewColumn()
    lengthSeconds: number;

    // TO ONE 

    // storage file
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    storageFileId: number;
    @XManyToOne<VideoFile>()(() => StorageFile, s => s.videoFiles)
    @XJoinColumn<VideoFile>('storageFileId')
    storageFile: Relation<StorageFile>;

    // TO MANY

    // videos 
    @XOneToMany<VideoFile>()(() => VideoData, x => x.videoFile)
    videos: VideoData[];
}
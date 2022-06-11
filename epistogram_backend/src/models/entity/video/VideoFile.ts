import { Column, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XOneToMany } from '../../../services/XORM/XORMDecorators';
import { StorageFile } from '.././StorageFile';
import { Video } from './Video';

@Entity()
export class VideoFile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'double precision' })
    lengthSeconds: number;

    // video file
    @Column({ nullable: true })
    storageFileId: number;

    @XManyToOne<VideoFile>()(StorageFile, s => s.videoFiles)
    @XJoinColumn<VideoFile>('storageFileId')
    storageFile: Relation<StorageFile>;

    // videos 
    @XOneToMany<VideoFile>()(Video, x => x.videoFile)
    videos: Video[];
}
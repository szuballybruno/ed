import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XOneToMany } from '../../services/XORM/XORMDecorators';
import { Course } from './Course';
import { Module } from './module/Module';
import { ShopItem } from './ShopItem';
import { User } from './User';
import { Video } from './video/Video';
import { VideoFile } from './video/VideoFile';

@Entity()
export class StorageFile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filePath: string;

    // video files
    @XOneToMany<StorageFile>()(VideoFile, v => v.storageFile)
    videoFiles: VideoFile[];

    // videos 
    @XOneToMany<StorageFile>()(Video, x => x.thumbnailFile)
    videos: Video[];

    // users
    @OneToMany(type => User, u => u.avatarFile)
    @JoinColumn()
    users: User[];

    // course
    @OneToMany(_ => Course, c => c.coverFile)
    @JoinColumn()
    courses: Course[];

    // shop items
    @OneToMany(_ => ShopItem, x => x.coverFile)
    @JoinColumn()
    shopItems: ShopItem[];

    // course module 
    @OneToOne(_ => Module, x => x.imageFile)
    courseModule: Relation<Module>;
}
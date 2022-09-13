import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { CourseData } from '../course/CourseData';
import { ModuleData } from '../module/ModuleData';
import { ShopItem } from './ShopItem';
import { User } from './User';
import { VideoData } from '../video/VideoData';
import { VideoFile } from '../video/VideoFile';

@Entity()
export class StorageFile {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'StorageFile'>;

    @Column()
    @XViewColumn()
    filePath: string;

    // TO MANY

    // video files
    @XOneToMany<StorageFile>()(() => VideoFile, v => v.storageFile)
    videoFiles: VideoFile[];

    // videos 
    @XOneToMany<StorageFile>()(() => VideoData, x => x.thumbnailFile)
    videos: VideoData[];

    // users
    @OneToMany(type => User, u => u.avatarFile)
    @JoinColumn()
    users: User[];

    // course
    @OneToMany(_ => CourseData, c => c.coverFile)
    @JoinColumn()
    courses: CourseData[];

    // shop items
    @OneToMany(_ => ShopItem, x => x.coverFile)
    @JoinColumn()
    shopItems: ShopItem[];

    // course module 
    @OneToOne(_ => ModuleData, x => x.imageFile)
    courseModule: Relation<ModuleData>;
}
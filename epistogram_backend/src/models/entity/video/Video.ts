import { Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { CoinTransaction } from '../CoinTransaction';
import { VideoVersion } from './VideoVersion';

@Entity()
export class Video {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'Video'>;

    // TO MANY

    // video versions 
    @XOneToMany<Video>()(() => VideoVersion, x => x.video)
    videoVersions: VideoVersion[];

    // coin acquires 
    @XOneToMany<Video>()(() => CoinTransaction, x => x.video)
    coinAcquires: Relation<CoinTransaction>[];
}
import { Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XOneToMany } from '../../../services/XORM/XORMDecorators';
import { CoinTransaction } from '../CoinTransaction';
import { VideoVersion } from './VideoVersion';

@Entity()
export class Video {

    @PrimaryGeneratedColumn()
    id: number;

    // video versions 
    @XOneToMany<Video>()(VideoVersion, x => x.video)
    videoVersions: VideoVersion[];

    // coin acquires 
    @XOneToMany<Video>()(CoinTransaction, x => x.video)
    coinAcquires: Relation<CoinTransaction>[];
}
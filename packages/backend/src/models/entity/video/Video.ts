import { Entity, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';
import { CoinTransaction } from '../misc/CoinTransaction';
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
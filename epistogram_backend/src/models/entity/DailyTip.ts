import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { DailyTipOccurrence } from './DailyTipOccurrence';
import { PersonalityTraitCategory } from './PersonalityTraitCategory';
import { StorageFile } from './StorageFile';

@Entity()
export class DailyTip {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'DailyTip'>;

    @Column()
    @XViewColumn()
    description: string;

    @Column()
    @XViewColumn()
    isLive: boolean;

    @Column()
    @XViewColumn()
    isMax: boolean;

    // TO MANY

    // occurrances
    @OneToMany(_ => DailyTipOccurrence, x => x.dailyTip)
    @JoinColumn()
    occurrences: Relation<DailyTipOccurrence>[];

    // TO ONE 

    // personality trait 
    @Column()
    @XViewColumn()
    personalityTraitCategoryId: Id<'PersonalityTraitCategory'>;
    @OneToMany(_ => PersonalityTraitCategory, x => x.tips)
    @JoinColumn({ name: 'personality_trait_category_id' })
    personalityTraitCategory: Relation<PersonalityTraitCategory>;

    // video file
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    videoFileId: Id<'StorageFile'> | null;
    @OneToOne(_ => StorageFile)
    @JoinColumn({ name: 'video_file_id' })
    videoFile: Relation<StorageFile> | null;
}
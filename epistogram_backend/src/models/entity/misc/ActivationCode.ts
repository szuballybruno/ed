import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { Company } from './Company';

@Entity()
export class ActivationCode {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'ActivationCode'>;

    @Column()
    @XViewColumn()
    code: string;

    @Column()
    @XViewColumn()
    isUsed: boolean;

    // company
    @Column()
    @XViewColumn()
    companyId: Id<'Company'>;

    @JoinColumn({ name: 'company_id' })
    @ManyToOne(_ => Company, x => x.activationCodes)
    company: Relation<Company>;
}
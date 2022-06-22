import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Company } from './Company';

@Entity()
export class ActivationCode {

    @PrimaryGeneratedColumn()
@XViewColumn()
    id: number;

    @Column()
    @XViewColumn()
    code: string;

    @Column()
    @XViewColumn()
    isUsed: boolean;

    // company
    @Column()
    @XViewColumn()
    companyId: number;

    @JoinColumn({ name: 'company_id' })
    @ManyToOne(_ => Company, x => x.activationCodes)
    company: Relation<Company>;
}
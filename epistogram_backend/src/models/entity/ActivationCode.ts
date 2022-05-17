import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Company } from './Company';

@Entity()
export class ActivationCode {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    isUsed: boolean;

    // company
    @Column()
    companyId: number;

    @JoinColumn({ name: 'company_id' })
    @ManyToOne(_ => Company, x => x.activationCodes)
    company: Relation<Company>;
}
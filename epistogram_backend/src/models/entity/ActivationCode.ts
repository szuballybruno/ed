import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from "./Organization";

@Entity()
export class ActivationCode {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    isUsed: boolean;

    // organization
    @Column()
    organizationId: number;

    @JoinColumn({ name: "organization_id" })
    @ManyToOne(_ => Organization, x => x.activationCodes)
    organization: Organization;
}
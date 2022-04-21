import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';
import { getJoinColumnInverseSide } from '../../utilities/helpers';
import { ActivationCode } from './ActivationCode';
import { CompanyOwnerBridge } from './authorization/CompanyOwnerBridge';
import { RoleAssignmentBridge } from './authorization/RoleAssignmentBridge';
import { User } from './User';

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date;
    
    @Column()
    name: string;

    // users 
    @OneToMany(_ => User, user => user.company)
    @JoinColumn()
    users: User[];

    // activation codes 
    @JoinColumn()
    @OneToMany(_ => ActivationCode, x => x.company)
    activationCodes: ActivationCode[];
    
    // role assingments
    @JoinColumn()
    @OneToMany(_ => RoleAssignmentBridge, x => x.company)
    roleAssignmentBridges: RoleAssignmentBridge[];
    
    // companyOwnerBridges
    @JoinColumn()
    @OneToMany(_ => CompanyOwnerBridge, getJoinColumnInverseSide<Company>()(x => x.company))
    companyOwnerBridges: CompanyOwnerBridge[];
}
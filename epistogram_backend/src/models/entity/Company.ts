import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';
import { ActivationCode } from './ActivationCode';
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
}
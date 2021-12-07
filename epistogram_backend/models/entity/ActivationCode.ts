import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ActivationCode {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    isUsed: boolean;
}
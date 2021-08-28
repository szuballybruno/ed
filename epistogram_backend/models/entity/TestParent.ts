import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TestChild } from "./TestChild";

@Entity()
export class TestParent {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => TestChild, c => c.parent, { cascade: true })
    @JoinColumn()
    children: TestChild[];
}
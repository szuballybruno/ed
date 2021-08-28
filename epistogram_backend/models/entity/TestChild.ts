import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TestParent } from "./TestParent";

@Entity()
export class TestChild {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => TestParent, c => c.children)
    @JoinColumn()
    parent: TestParent;
}
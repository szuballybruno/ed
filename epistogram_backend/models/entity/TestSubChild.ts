import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TestChild } from "./TestChild";
import { TestParent } from "./TestParent";

@Entity()
export class TestSubChild {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    testChildId: number;

    @ManyToOne(() => TestChild, c => c.testSubChildren)
    @JoinColumn({ name: "testChild_id" })
    testChild: TestChild;
}
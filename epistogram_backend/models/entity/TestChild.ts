import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TestParent } from "./TestParent";
import { TestSubChild } from "./TestSubChild";

@Entity()
export class TestChild {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    parentId: number;

    @ManyToOne(() => TestParent, c => c.children)
    @JoinColumn({ name: "parentId" })
    parent: TestParent;

    @OneToMany(() => TestSubChild, c => c.testChild, { cascade: true })
    @JoinColumn()
    testSubChildren: TestSubChild[]
}
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuestionCategory } from "./QuestionCategory";

@Entity()
export class PersonalityCategoryDescription {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    maxDescription: string;

    @Column()
    minDescription: string;

    // category id
    @Column()
    questionCategoryId: number;

    @OneToOne(_ => QuestionCategory, x => x.personalityCategoryDescription)
    @JoinColumn({ name: "questionCategoryId" })
    questionCategory: QuestionCategory;
}
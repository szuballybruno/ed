import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
	synchronize: false,
	expression: ''
})
export class PersonalityTraitView {

	@ViewColumn()
	userId: number;

	@ViewColumn()
	personalityTraitCategoryId: number;

	@ViewColumn()
	taritCategoryTitle: string;

	@ViewColumn()
	minLabel: string;

	@ViewColumn()
	maxLabel: string;

	@ViewColumn()
	minDescription: string;

	@ViewColumn()
	maxDescription: string;

	@ViewColumn()
	minScore: number;

	@ViewColumn()
	maxScore: number;

	@ViewColumn()
	activeLabel: string;

	@ViewColumn()
	activeDescription: string;
}
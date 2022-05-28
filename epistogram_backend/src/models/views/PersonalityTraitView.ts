import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
	synchronize: false,
	expression: ''
})
export class PersonalityTraitView {

	@ViewColumn()
    @XViewColumn()
	userId: number;

	@ViewColumn()
    @XViewColumn()
	personalityTraitCategoryId: number;

	@ViewColumn()
    @XViewColumn()
	taritCategoryTitle: string;

	@ViewColumn()
    @XViewColumn()
	minLabel: string;

	@ViewColumn()
    @XViewColumn()
	maxLabel: string;

	@ViewColumn()
    @XViewColumn()
	minDescription: string;

	@ViewColumn()
    @XViewColumn()
	maxDescription: string;

	@ViewColumn()
    @XViewColumn()
	minScore: number;

	@ViewColumn()
    @XViewColumn()
	maxScore: number;

	@ViewColumn()
    @XViewColumn()
	activeLabel: string;

	@ViewColumn()
    @XViewColumn()
	activeDescription: string;
}
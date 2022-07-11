import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { PersonalityTraitCategory } from '../entity/PersonalityTraitCategory';
import { User } from '../entity/User';

@ViewEntity({
	synchronize: false,
	expression: ''
})
export class PersonalityTraitView {

	@ViewColumn()
	@XViewColumn()
	userId: Id<'User'>;

	@ViewColumn()
	@XViewColumn()
	traitCategoryId: Id<'PersonalityTraitCategory'>;

	@ViewColumn()
	@XViewColumn()
	traitCategoryTitle: string;

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
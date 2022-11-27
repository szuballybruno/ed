import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';


export class ModulePlayerView {

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @XViewColumn()
    name: string;

    @XViewColumn()
    description: string;

    @XViewColumn()
    orderIndex: number;

    @XViewColumn()
    imageFilePath: string | null;
}

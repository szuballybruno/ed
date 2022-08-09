import { PlaylistView } from '../models/views/PlaylistView';
import { PlaylistModuleDTO } from '../shared/dtos/PlaylistModuleDTO';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { UserCourseBridgeService } from './UserCourseBridgeService';

export class PlaylistService {

    constructor(
        private _userCourseBridgeService: UserCourseBridgeService,
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService) {
    }

    /**
     * Get the current course modules with items.
     */
    async getCurrentCoursePlaylistModulesAsync(principalId: PrincipalId) {

        const userId = Id
            .create<'User'>(principalId.toSQLValue());

        const courseId = await this._userCourseBridgeService
            .getCurrentCourseId(userId);

        if (!courseId)
            throw new Error('There\'s no current course!');

        return await this.getPlaylistModulesAsync(userId, courseId);
    }

    /**
     * Get playlist modules with items.
     */
    async getPlaylistModulesAsync(userId: Id<'User'>, courseId: Id<'Course'>) {

        const views = await this._ormService
            .query(PlaylistView, { courseId, userId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getMany();

        return this._mapperService
            .mapTo(PlaylistModuleDTO, [views]);
    }
}
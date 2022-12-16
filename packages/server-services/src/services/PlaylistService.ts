import { UserPlaylistView } from '../models/views/UserPlaylistView';
import { PlaylistModuleDTO } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { PrincipalId } from '@episto/x-core';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService';
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

        const userId = principalId.getId();

        const courseId = await this._userCourseBridgeService
            .getCurrentInProgressCourseIdAsync(userId);

        if (!courseId)
            throw new Error('There\'s no current course!');

        return await this.getPlaylistModulesAsync(userId, courseId);
    }

    /**
     * Get playlist modules with items.
     */
    async getPlaylistModulesAsync(userId: Id<'User'>, courseId: Id<'Course'>) {

        const views = await this
            ._ormService
            .query(UserPlaylistView, { courseId, userId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getMany();

        if (views.length === 0)
            throw new Error('Playlist is empty!');

        return this._mapperService
            .mapTo(PlaylistModuleDTO, [views]);
    }
}
import { TeacherInfo } from '../models/entity/misc/TeacherInfo';
import { TeacherInfoEditDTO } from '../shared/dtos/TeacherInfoEditDTO';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationService } from './AuthorizationService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class TeacherInfoService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _authorizationService: AuthorizationService;

    constructor(ormService: ORMConnectionService, mapperService: MapperService, authorizationService: AuthorizationService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
        this._authorizationService = authorizationService;
    }

    /**
     * Delete a teacher info obj by it's id.
          */
    async deleteTeacherInfoAsync(teacherInfoId: Id<'TeacherInfo'>) {

        await this._ormService
            .hardDelete(TeacherInfo, [teacherInfoId]);
    }

    /**
     * Get a teacher info by user id.
          */
    async getTeacherInfoAsync(userId: Id<'User'>) {

        const teacherInfo = await this
            ._ormService
            .query(TeacherInfo, { userId })
            .where('userId', '=', 'userId')
            .getSingle();

        return teacherInfo;
    }

    /**
     * Get an edit DTO for the teacher info entity, realated to a user.
          */
    async getTeacherInfoEditDTOAsync(principalId: PrincipalId, userId: Id<'User'>) {

        const teacherInfo = await this
            .getTeacherInfoAsync(userId);

        return this._mapperService
            .mapTo(TeacherInfoEditDTO, [teacherInfo]);
    }

    /**
     * Get an edit DTO for the teacher info entity, realated to a user.
          */
    async saveTeacherInfoAsync(principalId: PrincipalId, teacherInfoEditDTO: TeacherInfoEditDTO) {

        await this._ormService
            .save(TeacherInfo, {
                id: teacherInfoEditDTO.id,
                videoCount: teacherInfoEditDTO.videoCount,
                courseCount: teacherInfoEditDTO.courseCount,
                rating: teacherInfoEditDTO.rating,
                studentCount: teacherInfoEditDTO.studentCount,
                skills: teacherInfoEditDTO.skills,
                badges: teacherInfoEditDTO.badges.join(', '),
                description: teacherInfoEditDTO.description
            });

    }

    /**
     * Creates a new teacher info entity with default values,
     * persists it in the DB, and returns it.
     */
    async createTeacherInfoAsync(userId: Id<'User'>) {

        const newTeacherInfo = {
            badges: '',
            skills: '',
            videoCount: 0,
            courseCount: 0,
            rating: 0,
            studentCount: 0,
            userId,
            description: ''
        } as TeacherInfo;

        await this._ormService
            .createAsync(TeacherInfo, newTeacherInfo);

        return newTeacherInfo;
    }
}

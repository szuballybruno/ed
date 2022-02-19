import { TeacherInfo } from "../models/entity/TeacherInfo";
import { User } from "../models/entity/User";
import { TeacherInfoEditDTO } from "../sharedd/dtos/TeacherInfoEditDTO";
import { MapperService } from "./MapperService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class TeacherInfoService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(ormService: ORMConnectionService, mapperService: MapperService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
    }

    /**
     * Delete a teacher info obj by it's id.
     * @param teacherInfoId 
     */
    async deleteTeacherInfoAsync(teacherInfoId: number) {

        await this._ormService
            .getRepository(TeacherInfo)
            .delete(teacherInfoId);
    }

    /**
     * Get a teacher info by user id.
     * @param userId 
     * @returns 
     */
    async getTeacherInfoAsync(userId: number) {

        const user = await this._ormService
            .getRepository(User)
            .createQueryBuilder("u")
            .leftJoinAndSelect("u.teacherInfo", "ti")
            .where("u.id = :userId", { userId })
            .getOneOrFail();

        const teacherInfo = user.teacherInfo;

        return teacherInfo;
    }

    /**
     * Get an edit DTO for the teacher info entity, realated to a user.
     * @param userId 
     * @returns 
     */
    async getTeacherInfoEditDTOAsync(userId: number) {

        const teacherInfo = await this.getTeacherInfoAsync(userId);

        return this._mapperService
            .map(TeacherInfo, TeacherInfoEditDTO, teacherInfo);
    }

    /**
     * Get an edit DTO for the teacher info entity, realated to a user.
     * @param userId 
     * @returns 
     */
    async saveTeacherInfoAsync(teacherInfoEditDTO: TeacherInfoEditDTO) {

        await this._ormService
            .getRepository(TeacherInfo)
            .save({
                id: teacherInfoEditDTO.id,
                videoCount: teacherInfoEditDTO.videoCount,
                courseCount: teacherInfoEditDTO.courseCount,
                rating: teacherInfoEditDTO.rating,
                studentCount: teacherInfoEditDTO.studentCount,
                skills: teacherInfoEditDTO.skills,
                badges: teacherInfoEditDTO.badges.join(", "),
                description: teacherInfoEditDTO.description
            });
    }

    /**
     * Creates a new teacher info entity with default values, 
     * persists it in the DB, and returns it. 
     * @returns 
     */
    async createTeacherInfoAsync(userId: number) {

        const newTeacherInfo = {
            badges: '',
            skills: '',
            videoCount: 0,
            courseCount: 0,
            rating: 0,
            studentCount: 0,
            userId,
            description: ""
        } as TeacherInfo;

        await this._ormService
            .getRepository(TeacherInfo)
            .insert(newTeacherInfo);

        return newTeacherInfo;
    }
}
import { CourseData } from '../models/entity/course/CourseData';
import { CourseItemListDTO } from '../shared/dtos/CourseItemListDTO';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class CourseItemsService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(ormService: ORMConnectionService, mapperService: MapperService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
    }

    getCourseItemDTOs = async (courseId: number) => {

        const course = await this._ormService
            .getRepository(CourseData)
            .createQueryBuilder('c')
            .leftJoinAndSelect('c.videos', 'v')
            .leftJoinAndSelect('c.exams', 'e')
            .where('c.id = :courseId', { courseId })
            .getOneOrFail();

        return this._mapperService
            .map(CourseData, CourseItemListDTO, course);
    };
}
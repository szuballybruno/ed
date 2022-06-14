
import { ModuleData } from '../../models/entity/module/ModuleData';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { CourseDatasSeedDataType } from './seed_course_datas';

export const getModuleDatasSeedData = (courses: CourseDatasSeedDataType) => getSeedList<ModuleData>()({

    module_data_SIGNUP_MODULE: {
        deletionDate: null,
        name: 'module',
        description: 'signup module',
        orderIndex: 0,
        imageFileId: null
    },
    module_data_4: {
        deletionDate: null,
        name: 'module',
        description: 'description',
        orderIndex: 0,
        courseId: courses.course_10.id,
        imageFileId: null
    },
    module_data_2: {
        deletionDate: null,
        name: 'Bevezetés az Excelbe',
        description: 'Excel tanfolyamunk első moduljában az alapvető fogalmakkal, a menürendszerrel, valamint a kezelőszervekkel ismerkedhetsz meg.',
        orderIndex: 0,
        courseId: courses.course_4.id,
        imageFileId: null
    },
    module_data_3: {
        deletionDate: null,
        name: 'OBS használata percek alatt',
        description: 'Ebben a modulban megtanulhatod, hogyan állítsd be villámgyorsan az OBS-t úgy, hogy hatékony erőforrás-kezelés mellett is csúcsminőségű felvételeket tudj készíteni, és akkor se érjen probléma, ha esetleg közben valamiért megszakadna a videó.',
        orderIndex: 0,
        courseId: courses.course_obs.id,
        imageFileId: null
    },
    module_data_7: {
        deletionDate: null,
        name: 'Finomságok az OBS-el',
        description: 'Zajszűrés, hangeffektek, az OBS-nek ez sem jelent problémát!',
        orderIndex: 1,
        courseId: courses.course_obs.id,
        imageFileId: null
    },
    module_data_8: {
        deletionDate: null,
        name: 'Első felvételünk, vizsga',
        description: 'Készítsd el első felvételed OBS-el!',
        orderIndex: 2,
        courseId: courses.course_obs.id,
        imageFileId: null
    },
    module_data_35: {
        deletionDate: null,
        name: 'Első lépések',
        description: '',
        orderIndex: 0,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_data_36: {
        deletionDate: null,
        name: 'Ismerkedés a függvényekkel',
        description: '',
        orderIndex: 1,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_data_37: {
        deletionDate: null,
        name: 'A formázás alapjai',
        description: '',
        orderIndex: 2,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_data_38: {
        deletionDate: null,
        name: 'Leggyakoribb függvények és azok használata',
        description: '',
        orderIndex: 3,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_data_39: {
        deletionDate: null,
        name: 'Segítség az adatkezelésben',
        description: '',
        orderIndex: 4,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_data_40: {
        deletionDate: null,
        name: 'Munka másokkal',
        description: '',
        orderIndex: 5,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_data_41: {
        deletionDate: null,
        name: 'Formázás felsőfokon',
        description: '',
        orderIndex: 6,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_data_42: {
        deletionDate: null,
        name: 'Munka nagy mennyiségű adattal',
        description: '',
        orderIndex: 7,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_data_43: {
        deletionDate: null,
        name: 'Kreatív adatábrázolás',
        description: '',
        orderIndex: 8,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_data_44: {
        deletionDate: null,
        name: 'Ismerkedés a haladó funkciókkal',
        description: '',
        orderIndex: 9,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_data_45: {
        deletionDate: null,
        name: 'Első lépések',
        description: '',
        orderIndex: 0,
        courseId: courses.course_28.id,
        imageFileId: null
    },
    module_data_47: {
        deletionDate: null,
        name: 'Formázás - Hogyan készíthetünk letisztult dokumentumokat?',
        description: '',
        orderIndex: 1,
        courseId: courses.course_28.id,
        imageFileId: null
    },
    module_data_48: {
        deletionDate: null,
        name: 'Gyorsabb munka a gyakorlatban',
        description: '',
        orderIndex: 2,
        courseId: courses.course_28.id,
        imageFileId: null
    },
    module_data_49: {
        deletionDate: null,
        name: 'Munka másokkal, dokumentumunk védelme',
        description: '',
        orderIndex: 3,
        courseId: courses.course_28.id,
        imageFileId: null
    },
    module_data_50: {
        deletionDate: null,
        name: 'Szövegírás, elrendezés, ellenőrzés',
        description: '',
        orderIndex: 4,
        courseId: courses.course_28.id,
        imageFileId: null
    },
    module_data_51: {
        deletionDate: null,
        name: 'Képek, vizuális eszközök használata',
        description: '',
        orderIndex: 5,
        courseId: courses.course_28.id,
        imageFileId: null
    },
    module_data_52: {
        deletionDate: null,
        name: 'Táblázatok a Wordben',
        description: '',
        orderIndex: 6,
        courseId: courses.course_28.id,
        imageFileId: null
    },
    module_data_53: {
        deletionDate: null,
        name: 'Példák a gyakorlati alkalmazásra',
        description: '',
        orderIndex: 7,
        courseId: courses.course_28.id,
        imageFileId: null
    },
    module_data_54: {
        deletionDate: null,
        name: 'Első lépések',
        description: '',
        orderIndex: 0,
        courseId: courses.course_powerPoint.id,
        imageFileId: null
    },
    module_data_55: {
        deletionDate: null,
        name: 'Szöveg és tartalom formázása',
        description: '',
        orderIndex: 1,
        courseId: courses.course_powerPoint.id,
        imageFileId: null
    },
    module_data_56: {
        deletionDate: null,
        name: 'Képek, vizuális eszközök használata',
        description: '',
        orderIndex: 2,
        courseId: courses.course_powerPoint.id,
        imageFileId: null
    },
    module_data_57: {
        deletionDate: null,
        name: 'Videók és hanganyagok használata a PowerPointon belül',
        description: '',
        orderIndex: 3,
        courseId: courses.course_powerPoint.id,
        imageFileId: null
    },
    module_data_58: {
        deletionDate: null,
        name: 'Prezentáció rendszerezése, segítség az előadás során',
        description: '',
        orderIndex: 4,
        courseId: courses.course_powerPoint.id,
        imageFileId: null
    },
    module_data_59: {
        deletionDate: null,
        name: 'Prezentáció további testreszabása és effektusok',
        description: '',
        orderIndex: 5,
        courseId: courses.course_powerPoint.id,
        imageFileId: null
    },
    module_data_60: {
        deletionDate: null,
        name: 'Tartalom ellenőrzése és közös munka',
        description: '',
        orderIndex: 6,
        courseId: courses.course_powerPoint.id,
        imageFileId: null
    },
});

export type ModuleDatasSeedDataType = ReturnType<typeof getModuleDatasSeedData>;

import { CourseModule } from '../../models/entity/CourseModule';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { CourseSeedDataType } from './seed_courses';

export const getModuleSeedData = (courses: CourseSeedDataType) => getSeedList<CourseModule>()({

    module_1: {
        name: 'module',
        description: 'signup module',
        orderIndex: 0,
        courseId: null,
        imageFileId: null,
        deletionDate: null
    },
    module_4: {
        name: 'module',
        description: 'description',
        orderIndex: 0,
        courseId: courses.course_10.id,
        imageFileId: null,
        deletionDate: null
    },
    module_2: {
        name: 'Bevezetés az Excelbe',
        description: 'Excel tanfolyamunk első moduljában az alapvető fogalmakkal, a menürendszerrel, valamint a kezelőszervekkel ismerkedhetsz meg.',
        orderIndex: 0,
        courseId: courses.course_4.id,
        imageFileId: null,
        deletionDate: null
    },
    module_3: {
        name: 'OBS használata percek alatt',
        description: 'Ebben a modulban megtanulhatod, hogyan állítsd be villámgyorsan az OBS-t úgy, hogy hatékony erőforrás-kezelés mellett is csúcsminőségű felvételeket tudj készíteni, és akkor se érjen probléma, ha esetleg közben valamiért megszakadna a videó.',
        orderIndex: 0,
        courseId: courses.course_17.id,
        imageFileId: null,
        deletionDate: null
    },
    module_7: {
        name: 'Finomságok az OBS-el',
        description: 'Zajszűrés, hangeffektek, az OBS-nek ez sem jelent problémát!',
        orderIndex: 1,
        courseId: courses.course_17.id,
        imageFileId: null,
        deletionDate: null
    },
    module_8: {
        name: 'Első felvételünk, vizsga',
        description: 'Készítsd el első felvételed OBS-el!',
        orderIndex: 2,
        courseId: courses.course_17.id,
        imageFileId: null,
        deletionDate: null
    },
    module_35: {
        name: 'Első lépések',
        description: '',
        orderIndex: 0,
        courseId: courses.course_27.id,
        imageFileId: null,
        deletionDate: null
    },
    module_36: {
        name: 'Ismerkedés a függvényekkel',
        description: '',
        orderIndex: 1,
        courseId: courses.course_27.id,
        imageFileId: null,
        deletionDate: null
    },
    module_37: {
        name: 'A formázás alapjai',
        description: '',
        orderIndex: 2,
        courseId: courses.course_27.id,
        imageFileId: null,
        deletionDate: null
    },
    module_38: {
        name: 'Leggyakoribb függvények és azok használata',
        description: '',
        orderIndex: 3,
        courseId: courses.course_27.id,
        imageFileId: null,
        deletionDate: null
    },
    module_39: {
        name: 'Segítség az adatkezelésben',
        description: '',
        orderIndex: 4,
        courseId: courses.course_27.id,
        imageFileId: null,
        deletionDate: null
    },
    module_40: {
        name: 'Munka másokkal',
        description: '',
        orderIndex: 5,
        courseId: courses.course_27.id,
        imageFileId: null,
        deletionDate: null
    },
    module_41: {
        name: 'Formázás felsőfokon',
        description: '',
        orderIndex: 6,
        courseId: courses.course_27.id,
        imageFileId: null,
        deletionDate: null
    },
    module_42: {
        name: 'Munka nagy mennyiségű adattal',
        description: '',
        orderIndex: 7,
        courseId: courses.course_27.id,
        imageFileId: null,
        deletionDate: null
    },
    module_43: {
        name: 'Kreatív adatábrázolás',
        description: '',
        orderIndex: 8,
        courseId: courses.course_27.id,
        imageFileId: null,
        deletionDate: null
    },
    module_44: {
        name: 'Ismerkedés a haladó funkciókkal',
        description: '',
        orderIndex: 9,
        courseId: courses.course_27.id,
        imageFileId: null,
        deletionDate: null
    },
    module_45: {
        name: 'Első lépések',
        description: '',
        orderIndex: 0,
        courseId: courses.course_28.id,
        imageFileId: null,
        deletionDate: null
    },
    module_47: {
        name: 'Formázás - Hogyan készíthetünk letisztult dokumentumokat?',
        description: '',
        orderIndex: 1,
        courseId: courses.course_28.id,
        imageFileId: null,
        deletionDate: null
    },
    module_48: {
        name: 'Gyorsabb munka a gyakorlatban',
        description: '',
        orderIndex: 2,
        courseId: courses.course_28.id,
        imageFileId: null,
        deletionDate: null
    },
    module_49: {
        name: 'Munka másokkal, dokumentumunk védelme',
        description: '',
        orderIndex: 3,
        courseId: courses.course_28.id,
        imageFileId: null,
        deletionDate: null
    },
    module_50: {
        name: 'Szövegírás, elrendezés, ellenőrzés',
        description: '',
        orderIndex: 4,
        courseId: courses.course_28.id,
        imageFileId: null,
        deletionDate: null
    },
    module_51: {
        name: 'Képek, vizuális eszközök használata',
        description: '',
        orderIndex: 5,
        courseId: courses.course_28.id,
        imageFileId: null,
        deletionDate: null
    },
    module_52: {
        name: 'Táblázatok a Wordben',
        description: '',
        orderIndex: 6,
        courseId: courses.course_28.id,
        imageFileId: null,
        deletionDate: null
    },
    module_53: {
        name: 'Példák a gyakorlati alkalmazásra',
        description: '',
        orderIndex: 7,
        courseId: courses.course_28.id,
        imageFileId: null,
        deletionDate: null
    },
    module_54: {
        name: 'Első lépések',
        description: '',
        orderIndex: 0,
        courseId: courses.course_22.id,
        imageFileId: null,
        deletionDate: null
    },
    module_55: {
        name: 'Szöveg és tartalom formázása',
        description: '',
        orderIndex: 1,
        courseId: courses.course_22.id,
        imageFileId: null,
        deletionDate: null
    },
    module_56: {
        name: 'Képek, vizuális eszközök használata',
        description: '',
        orderIndex: 2,
        courseId: courses.course_22.id,
        imageFileId: null,
        deletionDate: null
    },
    module_57: {
        name: 'Videók és hanganyagok használata a PowerPointon belül',
        description: '',
        orderIndex: 3,
        courseId: courses.course_22.id,
        imageFileId: null,
        deletionDate: null
    },
    module_58: {
        name: 'Prezentáció rendszerezése, segítség az előadás során',
        description: '',
        orderIndex: 4,
        courseId: courses.course_22.id,
        imageFileId: null,
        deletionDate: null
    },
    module_59: {
        name: 'Prezentáció további testreszabása és effektusok',
        description: '',
        orderIndex: 5,
        courseId: courses.course_22.id,
        imageFileId: null,
        deletionDate: null
    },
    module_60: {
        name: 'Tartalom ellenőrzése és közös munka',
        description: '',
        orderIndex: 6,
        courseId: courses.course_22.id,
        imageFileId: null,
        deletionDate: null
    }
});

export type ModuleSeedDataType = ReturnType<typeof getModuleSeedData>;
import { gen } from './util.js';

const courses = gen('course_');
courses.course_obs = { id: 'course_obs' };
courses.course_excel = { id: 'course_excel' };
courses.course_powerPoint = { id: 'course_powerPoint' };

export const oldmodules = {
    module_4: {
        deletionDate: null,
        name: 'module',
        description: 'description',
        orderIndex: 0,
        courseId: courses.course_10.id,
        imageFileId: null
    },
    module_2: {
        deletionDate: null,
        name: 'Bevezetés az Excelbe',
        description: 'Excel tanfolyamunk első moduljában az alapvető fogalmakkal, a menürendszerrel, valamint a kezelőszervekkel ismerkedhetsz meg.',
        orderIndex: 0,
        courseId: courses.course_4.id,
        imageFileId: null
    },
    module_3: {
        deletionDate: null,
        name: 'OBS használata percek alatt',
        description: 'Ebben a modulban megtanulhatod, hogyan állítsd be villámgyorsan az OBS-t úgy, hogy hatékony erőforrás-kezelés mellett is csúcsminőségű felvételeket tudj készíteni, és akkor se érjen probléma, ha esetleg közben valamiért megszakadna a videó.',
        orderIndex: 0,
        courseId: courses.course_obs.id,
        imageFileId: null
    },
    module_7: {
        deletionDate: null,
        name: 'Finomságok az OBS-el',
        description: 'Zajszűrés, hangeffektek, az OBS-nek ez sem jelent problémát!',
        orderIndex: 1,
        courseId: courses.course_obs.id,
        imageFileId: null
    },
    module_8: {
        deletionDate: null,
        name: 'Első felvételünk, vizsga',
        description: 'Készítsd el első felvételed OBS-el!',
        orderIndex: 2,
        courseId: courses.course_obs.id,
        imageFileId: null
    },
    module_35: {
        deletionDate: null,
        name: 'Első lépések',
        description: '',
        orderIndex: 0,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_36: {
        deletionDate: null,
        name: 'Ismerkedés a függvényekkel',
        description: '',
        orderIndex: 1,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_37: {
        deletionDate: null,
        name: 'A formázás alapjai',
        description: '',
        orderIndex: 2,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_38: {
        deletionDate: null,
        name: 'Leggyakoribb függvények és azok használata',
        description: '',
        orderIndex: 3,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_39: {
        deletionDate: null,
        name: 'Segítség az adatkezelésben',
        description: '',
        orderIndex: 4,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_40: {
        deletionDate: null,
        name: 'Munka másokkal',
        description: '',
        orderIndex: 5,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_41: {
        deletionDate: null,
        name: 'Formázás felsőfokon',
        description: '',
        orderIndex: 6,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_42: {
        deletionDate: null,
        name: 'Munka nagy mennyiségű adattal',
        description: '',
        orderIndex: 7,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_43: {
        deletionDate: null,
        name: 'Kreatív adatábrázolás',
        description: '',
        orderIndex: 8,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_44: {
        deletionDate: null,
        name: 'Ismerkedés a haladó funkciókkal',
        description: '',
        orderIndex: 9,
        courseId: courses.course_excel.id,
        imageFileId: null
    },
    module_45: {
        deletionDate: null,
        name: 'Első lépések',
        description: '',
        orderIndex: 0,
        courseId: courses.course_28.id,
        imageFileId: null
    },
    module_47: {
        deletionDate: null,
        name: 'Formázás - Hogyan készíthetünk letisztult dokumentumokat?',
        description: '',
        orderIndex: 1,
        courseId: courses.course_28.id,
        imageFileId: null
    },
    module_48: {
        deletionDate: null,
        name: 'Gyorsabb munka a gyakorlatban',
        description: '',
        orderIndex: 2,
        courseId: courses.course_28.id,
        imageFileId: null
    },
    module_49: {
        deletionDate: null,
        name: 'Munka másokkal, dokumentumunk védelme',
        description: '',
        orderIndex: 3,
        courseId: courses.course_28.id,
        imageFileId: null
    },
    module_50: {
        deletionDate: null,
        name: 'Szövegírás, elrendezés, ellenőrzés',
        description: '',
        orderIndex: 4,
        courseId: courses.course_28.id,
        imageFileId: null
    },
    module_51: {
        deletionDate: null,
        name: 'Képek, vizuális eszközök használata',
        description: '',
        orderIndex: 5,
        courseId: courses.course_28.id,
        imageFileId: null
    },
    module_52: {
        deletionDate: null,
        name: 'Táblázatok a Wordben',
        description: '',
        orderIndex: 6,
        courseId: courses.course_28.id,
        imageFileId: null
    },
    module_53: {
        deletionDate: null,
        name: 'Példák a gyakorlati alkalmazásra',
        description: '',
        orderIndex: 7,
        courseId: courses.course_28.id,
        imageFileId: null
    },
    module_54: {
        deletionDate: null,
        name: 'Első lépések',
        description: '',
        orderIndex: 0,
        courseId: courses.course_powerPoint.id,
        imageFileId: null
    },
    module_55: {
        deletionDate: null,
        name: 'Szöveg és tartalom formázása',
        description: '',
        orderIndex: 1,
        courseId: courses.course_powerPoint.id,
        imageFileId: null
    },
    module_56: {
        deletionDate: null,
        name: 'Képek, vizuális eszközök használata',
        description: '',
        orderIndex: 2,
        courseId: courses.course_powerPoint.id,
        imageFileId: null
    },
    module_57: {
        deletionDate: null,
        name: 'Videók és hanganyagok használata a PowerPointon belül',
        description: '',
        orderIndex: 3,
        courseId: courses.course_powerPoint.id,
        imageFileId: null
    },
    module_58: {
        deletionDate: null,
        name: 'Prezentáció rendszerezése, segítség az előadás során',
        description: '',
        orderIndex: 4,
        courseId: courses.course_powerPoint.id,
        imageFileId: null
    },
    module_59: {
        deletionDate: null,
        name: 'Prezentáció további testreszabása és effektusok',
        description: '',
        orderIndex: 5,
        courseId: courses.course_powerPoint.id,
        imageFileId: null
    },
    module_60: {
        deletionDate: null,
        name: 'Tartalom ellenőrzése és közös munka',
        description: '',
        orderIndex: 6,
        courseId: courses.course_powerPoint.id,
        imageFileId: null
    },
}
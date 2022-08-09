
import { ModuleData } from '../../models/entity/module/ModuleData';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { CourseDatasSeedDataType } from './seed_course_datas';

export const getModuleDatasSeedData = (courses: CourseDatasSeedDataType) => getSeedList<ModuleData>()({

    module_data_SIGNUP_MODULE: {
        name: 'SIGNUP',
        description: 'SIGNUP',
        orderIndex: 0,
        imageFileId: null,
    },

    // insta course pretest module
    module_data_insta_pretest_1: {
        name: 'PRETEST INSTA',
        description: 'PRETEST INSTA',
        orderIndex: 0,
        imageFileId: null,
    },

    // google ads course pretest module
    module_data_google_ads_pretest_1: {
        name: 'PRETEST ADS',
        description: 'PRETEST ADS',
        orderIndex: 0,
        imageFileId: null,
    },

    // python course pretest module
    module_data_python_pretest_1: {
        name: 'PRETEST PYTHON',
        description: 'PRETEST PYTHON',
        orderIndex: 0,
        imageFileId: null,
    },

    // linkedin course pretest module
    module_data_linked_in_pretest_1: {
        name: 'PRETEST LINKEDIN',
        description: 'PRETEST LINKEDIN',
        orderIndex: 0,
        imageFileId: null,
    },

    // cyber course pretest module
    module_data_cyber_pretest_1: {
        name: 'PRETEST CYBER',
        description: 'PRETEST CYBER',
        orderIndex: 0,
        imageFileId: null,
    },

    module_data_cyber_1: {
        name: 'Cyber 1 module',
        description: 'Cyber 1 module',
        orderIndex: 1,
        imageFileId: null,
    },

    // canva course pretest module
    module_data_canva_pretest_1: {
        name: 'PRETEST CANVA',
        description: 'PRETEST CANVA',
        orderIndex: 0,
        imageFileId: null,
    },

    // obs course pretest module
    module_data_obs_pretest_1: {
        name: 'PRETEST OBS',
        description: 'PRETEST OBS',
        orderIndex: 0,
        imageFileId: null,
    },
    module_data_3: {
        name: 'OBS használata percek alatt',
        description: 'Ebben a modulban megtanulhatod, hogyan állítsd be villámgyorsan az OBS-t úgy, hogy hatékony erőforrás-kezelés mellett is csúcsminőségű felvételeket tudj készíteni, és akkor se érjen probléma, ha esetleg közben valamiért megszakadna a videó.',
        orderIndex: 1,
        imageFileId: null,
    },
    module_data_7: {
        name: 'Finomságok az OBS-el',
        description: 'Zajszűrés, hangeffektek, az OBS-nek ez sem jelent problémát!',
        orderIndex: 2,
        imageFileId: null,
    },
    module_data_8: {
        name: 'Első felvételünk, vizsga',
        description: 'Készítsd el első felvételed OBS-el!',
        orderIndex: 3,
        imageFileId: null,
    },

    // excel course pretest module
    module_data_excel_pretest_1: {
        name: 'PRETEST EXCEL',
        description: 'PRETEST EXCEL',
        orderIndex: 0,
        imageFileId: null,
    },
    module_data_excel_bevez: {
        name: 'Bevezetés az Excelbe',
        description: 'Excel tanfolyamunk első moduljában az alapvető fogalmakkal, a menürendszerrel, valamint a kezelőszervekkel ismerkedhetsz meg.',
        orderIndex: 1,
        imageFileId: null,
    },
    module_data_excel_ism_fuggv: {
        name: 'Ismerkedés a függvényekkel',
        description: '',
        orderIndex: 3,
        imageFileId: null,
    },
    module_data_excel_3: {
        name: 'A formázás alapjai',
        description: '',
        orderIndex: 4,
        imageFileId: null,
    },
    module_data_excel_4: {
        name: 'Leggyakoribb függvények és azok használata',
        description: '',
        orderIndex: 5,
        imageFileId: null,
    },
    module_data_excel_5: {
        name: 'Segítség az adatkezelésben',
        description: '',
        orderIndex: 6,
        imageFileId: null,
    },
    module_data_excel_6: {
        name: 'Munka másokkal',
        description: '',
        orderIndex: 7,
        imageFileId: null,
    },
    module_data_excel_7: {
        name: 'Formázás felsőfokon',
        description: '',
        orderIndex: 8,
        imageFileId: null,
    },
    module_data_excel_8: {
        name: 'Munka nagy mennyiségű adattal',
        description: '',
        orderIndex: 9,
        imageFileId: null,
    },
    module_data_excel_9: {
        name: 'Kreatív adatábrázolás',
        description: '',
        orderIndex: 10,
        imageFileId: null,
    },
    module_data_excel_10: {
        name: 'Ismerkedés a haladó funkciókkal',
        description: '',
        orderIndex: 11,
        imageFileId: null,
    },

    // word course pretest module
    module_data_word_pretest_1: {
        name: 'PRETEST WORD',
        description: 'PRETEST WORD',
        orderIndex: 0,
        imageFileId: null,
    },
    module_data_word_1: {
        name: 'Első lépések',
        description: '',
        orderIndex: 1,
        imageFileId: null,
    },
    module_data_word_2: {
        name: 'Formázás - Hogyan készíthetünk letisztult dokumentumokat?',
        description: '',
        orderIndex: 2,
        imageFileId: null,
    },
    module_data_word_3: {
        name: 'Gyorsabb munka a gyakorlatban',
        description: '',
        orderIndex: 3,
        imageFileId: null,
    },
    module_data_word_4: {
        name: 'Munka másokkal, dokumentumunk védelme',
        description: '',
        orderIndex: 4,
        imageFileId: null,
    },
    module_data_word_5: {
        name: 'Szövegírás, elrendezés, ellenőrzés',
        description: '',
        orderIndex: 5,
        imageFileId: null,
    },
    module_data_word_6: {
        name: 'Képek, vizuális eszközök használata',
        description: '',
        orderIndex: 6,
        imageFileId: null,
    },
    module_data_word_7: {
        name: 'Táblázatok a Wordben',
        description: '',
        orderIndex: 7,
        imageFileId: null,
    },
    module_data_word_8: {
        name: 'Példák a gyakorlati alkalmazásra',
        description: '',
        orderIndex: 8,
        imageFileId: null,
    },

    // powerPoint course pretest module
    module_data_powerPoint_pretest_1: {
        name: 'PRETEST PP',
        description: 'PRETEST PP',
        orderIndex: 0,
        imageFileId: null,
    },
    module_data_54: {
        name: 'Első lépések',
        description: '',
        orderIndex: 1,
        imageFileId: null,
    },
    module_data_55: {
        name: 'Szöveg és tartalom formázása',
        description: '',
        orderIndex: 2,
        imageFileId: null,
    },
    module_data_56: {
        name: 'Képek, vizuális eszközök használata',
        description: '',
        orderIndex: 3,
        imageFileId: null,
    },
    module_data_57: {
        name: 'Videók és hanganyagok használata a PowerPointon belül',
        description: '',
        orderIndex: 4,
        imageFileId: null,
    },
    module_data_58: {
        name: 'Prezentáció rendszerezése, segítség az előadás során',
        description: '',
        orderIndex: 5,
        imageFileId: null,
    },
    module_data_59: {
        name: 'Prezentáció további testreszabása és effektusok',
        description: '',
        orderIndex: 6,
        imageFileId: null,
    },
    module_data_60: {
        name: 'Tartalom ellenőrzése és közös munka',
        description: '',
        orderIndex: 7,
        imageFileId: null,
    },
});

export type ModuleDatasSeedDataType = ReturnType<typeof getModuleDatasSeedData>;
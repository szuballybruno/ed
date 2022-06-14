import { CourseData } from '../../models/entity/course/CourseData';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { CourseCategoriesSeedDataType } from './seed_course_categories';
import { StorageFileSeedDataType } from './seed_storage_file';
import { UserSeedDataType } from './seed_users';

export const getCourseDatasSeedData = (
    courseCategories: CourseCategoriesSeedDataType,
    storageFiles: StorageFileSeedDataType,
    users: UserSeedDataType) => getSeedList<CourseData>()({

        course_data_canva: {
            modificationDate: new Date('2022-01-15 14:18:32.55715+00'),
            title: 'Canva Vállalkozásoknak',
            shortDescription: '',
            description: '',
            difficulty: 3.5,
            benchmark: 4.5,
            previouslyCompletedCount: 0,
            language: 'magyar',
            technicalRequirements: '',
            requirementsDescription: '',
            skillBenefits: '',
            humanSkillBenefits: '',
            humanSkillBenefitsDescription: '',
            visibility: 'private',
            categoryId: courseCategories.course_category_1.id,
            subCategoryId: courseCategories.course_category_5.id,
            teacherId: users.god.id,
            coverFileId: storageFiles.storage_file_5.id,
            deletionDate: null
        },
        course_data_cyber: {
            modificationDate: new Date('2022-01-15 16:02:23.130322+00'),
            title: 'Cyberbiztonság az irodában',
            shortDescription: '',
            description: '',
            difficulty: 1.5,
            benchmark: 3.5,
            previouslyCompletedCount: 0,
            language: 'magyar',
            technicalRequirements: '',
            requirementsDescription: '',
            skillBenefits: '',
            humanSkillBenefits: '',
            humanSkillBenefitsDescription: '',
            visibility: 'private',
            categoryId: courseCategories.course_category_1.id,
            subCategoryId: courseCategories.course_category_5.id,
            teacherId: users.god.id,
            coverFileId: storageFiles.storage_file_21.id,
            deletionDate: null
        },
        course_data_insta: {
            modificationDate: new Date('2022-01-14 21:52:26.140736+00'),
            title: 'Instagram gyorstalpaló',
            shortDescription: '',
            description: '',
            difficulty: 1.5,
            benchmark: 3.5,
            previouslyCompletedCount: 0,
            language: 'magyar',
            technicalRequirements: '',
            requirementsDescription: '',
            skillBenefits: '',
            humanSkillBenefits: '',
            humanSkillBenefitsDescription: '',
            visibility: 'private',
            categoryId: courseCategories.course_category_1.id,
            subCategoryId: courseCategories.course_category_10.id,
            teacherId: users.god.id,
            coverFileId: storageFiles.storage_file_163.id,
            deletionDate: null
        },

        course_data_google_ads: {
            modificationDate: new Date('2022-01-14 21:52:38.751267+00'),
            title: 'Google Ads Alapozó',
            shortDescription: '',
            description: '',
            difficulty: 1.5,
            benchmark: 3.5,
            previouslyCompletedCount: 0,
            language: 'magyar',
            technicalRequirements: '',
            requirementsDescription: '',
            skillBenefits: '',
            humanSkillBenefits: '',
            humanSkillBenefitsDescription: '',
            visibility: 'private',
            categoryId: courseCategories.course_category_1.id,
            subCategoryId: courseCategories.course_category_4.id,
            teacherId: users.god.id,
            coverFileId: storageFiles.storage_file_165.id,
            deletionDate: null
        },

        course_data_python: {
            modificationDate: new Date('2022-01-14 21:52:50.323264+00'),
            title: 'Adatbányászat Pythonnal',
            shortDescription: '',
            description: '',
            difficulty: 1.5,
            benchmark: 3.5,
            previouslyCompletedCount: 0,
            language: 'magyar',
            technicalRequirements: '',
            requirementsDescription: '',
            skillBenefits: '',
            humanSkillBenefits: '',
            humanSkillBenefitsDescription: '',
            visibility: 'private',
            categoryId: courseCategories.course_category_1.id,
            subCategoryId: courseCategories.course_category_3.id,
            teacherId: users.god.id,
            coverFileId: storageFiles.storage_file_167.id,
            deletionDate: null
        },

        course_data_linked_in: {
            modificationDate: new Date('2022-01-14 21:54:26.151202+00'),
            title: 'LinkedIn vállalkozásoknak',
            shortDescription: '',
            description: '',
            difficulty: 1.5,
            benchmark: 3.5,
            previouslyCompletedCount: 0,
            language: 'magyar',
            technicalRequirements: '',
            requirementsDescription: '',
            skillBenefits: '',
            humanSkillBenefits: '',
            humanSkillBenefitsDescription: '',
            visibility: 'private',
            categoryId: courseCategories.course_category_1.id,
            subCategoryId: courseCategories.course_category_10.id,
            teacherId: users.god.id,
            coverFileId: storageFiles.storage_file_166.id,
            deletionDate: null
        },

        course_data_word: {
            modificationDate: new Date('2022-02-02 15:39:50.354458+00'),
            title: 'Microsoft Word Alapok',
            shortDescription: 'A Microsoft Word a maga nemében igazi svájci bicskának számít, amellyel produktív eszközök széles tárháza nyílik meg előtted.Használhatod akár to-do lista, borítékok, levelek, könyvek és kiadványok készítésére is ezáltal rengeteg időt spórolhatsz a hétköznapokban.',
            description: 'Word kurzusunk során először a program legalapvetőbb elrendezését és funkcióit ismerheted meg, majd megtanítunk hogyan formázd meg dokumentumaidat úgy ahogyan a profik.Ezután több és több gyakorlati tanáccsal fogunk ellátni, hogy megkönnyítsük a program használatát a mindennapok során és értékes időt spóroljunk számodra.Végül pedig részletesen bemutatjuk a Wordben található legtöbb vizuális eszközt és azok használatát, hogy ne csak szöveges formában legyen lehetőséged kifejezni a gondolataidat. ',
            difficulty: 5,
            benchmark: 4,
            previouslyCompletedCount: 19,
            language: 'magyar',
            technicalRequirements: 'Windows vagy macOS rendszerű számítógép (utóbbin némileg eltérhet a megjelenés), Legalább Microsoft Office 2016 vagy ennél magasabb verzió, * Ajánlott 2 monitorral követni a kurzust az optimális haladásért',
            requirementsDescription: '',
            skillBenefits: 'Megtanulod hogyan formázz meg bármilyen szöveget akár újságcikkekhez, könyvekhez. | Megtanulod a Word vizuális eszközei által szemléltetni a mondandód és mindezt képes leszel nyomtatható és publikálható formába ölteni. | Képes leszel helyes, konzisztensen formázott dokumentumokat létrehozni.',
            humanSkillBenefits: 'Számítástechnikai ismeretek: 8 | Tervezési készségek: 2 | Kreativitás: 7 | Hatékony munkavégzés: 9 | Csapatmunka: 1',
            humanSkillBenefitsDescription: 'Feltöltés alatt...',
            visibility: 'public',
            categoryId: courseCategories.course_category_1.id,
            subCategoryId: courseCategories.course_category_5.id,
            teacherId: users.god.id,
            coverFileId: storageFiles.storage_file_326.id,
            deletionDate: null
        },

        course_data_obs: {
            modificationDate: new Date('2022-01-14 21:55:20.139944+00'),
            title: 'OBS alapok',
            shortDescription: '',
            description: '',
            difficulty: 1.5,
            benchmark: 4,
            previouslyCompletedCount: 27,
            language: 'magyar',
            technicalRequirements: '',
            requirementsDescription: '',
            skillBenefits: '',
            humanSkillBenefits: '',
            humanSkillBenefitsDescription: '',
            visibility: 'public',
            categoryId: courseCategories.course_category_1.id,
            subCategoryId: courseCategories.course_category_9.id,
            teacherId: users.god.id,
            coverFileId: storageFiles.storage_file_162.id,
            deletionDate: null
        },

        course_data_powerPoint: {
            modificationDate: new Date('2022-02-11 14:18:39.393758+00'),
            title: 'Microsoft PowerPoint Alapok',
            shortDescription: 'Legyen szó akár előadásról, időzített tanulókártyákról vagy egy fotóalbum animált levetítéséről, a PowerPoint mindegyik feladatra kiváló eszköz.Széleskörű testreszabási lehetőségeinek köszönhetően kreatívan, könnyedén és elegánsan mutathatod be gondolataidat bárkinek. ',
            description: 'PowerPoint kurzusunk során törekedtünk az egyszerű érthetőségre, hogy már szinte minimális számítógépes ismeret is elegendő legyen a program elsajátításához.Nagy hangsúlyt fektettünk a PowerPoint legnagyobb részét alkotó vizuális eszközök bemutatására, legyen szó mindenféle szövegről, képről, álló vagy mozgó alakzatról, de akár videóról is, így prezentációdnak egész biztosan csak a képzeleted szabhat határt.Továbbá néhány hasznos praktikát is megtanítunk, melyek segítségével időt spórolhatsz és magabiztosságot szerezhetsz mind a készítés, mind az előadás során.',
            difficulty: 1.5,
            benchmark: 3.5,
            previouslyCompletedCount: 0,
            language: 'magyar',
            technicalRequirements: 'Windows vagy macOS rendszerű számítógép (utóbbin némileg eltérhet a megjelenés), Legalább Microsoft Office 2016 vagy ennél magasabb verzió, * Ajánlott 2 monitorral követni a kurzust az optimális haladásért',
            requirementsDescription: '',
            skillBenefits: 'Megtanulod a PowerPoint alapvető elrendezését, prezentációk készítését és az ehhez szükséges számítógépes ismereteket is. | Megtanulod hogyan formázhatsz bármilyen szöveget vagy vizuális elemet | Megismerkedsz a diavetítés funkció részleteivel, az időzítéssel és az áttűnésekkel',
            humanSkillBenefits: 'Önkifejezés: 5 | Kreativitás: 9 | Számítógépes ismeretek: 5 | Hatékony munkavégzés: 2 | Tervezési készségek: 4',
            humanSkillBenefitsDescription: 'A PowerPoint egy új szintre helyezi a kreativitásod, merni fogsz bátran kísérletezni a rengeteg eszközzel és azok opcióival, hogy megalkothasd a legegyedibb prezentációkat.Ezáltal könnyebben kifejezheted magad és gyorsabban tervezheted meg egy előadás felépítését is.',
            visibility: 'public',
            categoryId: courseCategories.course_category_1.id,
            subCategoryId: courseCategories.course_category_5.id,
            teacherId: users.god.id,
            coverFileId: storageFiles.storage_file_161.id,
            deletionDate: null
        },

        course_data_uj: {
            modificationDate: new Date('2022-01-15 16:02:29.20839+00'),
            title: 'Uj kurzus',
            shortDescription: '',
            description: '',
            difficulty: 0,
            benchmark: 0,
            previouslyCompletedCount: 0,
            language: 'magyar',
            technicalRequirements: '',
            requirementsDescription: '',
            skillBenefits: '',
            humanSkillBenefits: '',
            humanSkillBenefitsDescription: '',
            visibility: 'private',
            categoryId: courseCategories.course_category_1.id,
            subCategoryId: courseCategories.course_category_1.id,
            teacherId: users.god.id,
            coverFileId: null,
            deletionDate: null
        },

        course_data_excel: {
            modificationDate: new Date('2022-02-02 11:45:50.036622+00'),
            title: 'Microsoft Excel Alapok',
            shortDescription: 'Formázások, képletek, függvények.Sokunk számára már rájuk gondolni is kellemetlen, dolgozni, pedig végképp nem szeretnénk velük.Office tanfolyamsorozatunk oszlopos tagjaként Excel kurzusunk sallangmentesen, és mindenki számára közérthetően segít megérteni, hogyan használhatjuk hatékonyan a Microsoft zöld táblázatkezelőjét.',
            description: 'Excel alapozó kurzusunk egészen az alapoktól mutatja be a program működését. Részletesen ismerheted meg a különböző menüpontokat, elrendezéseket, majd a munkaterület feltérképezése után az alapvető műveletek elvégzésének kezdhetsz neki.A formázások elsajátítása után a függvények tárházával ismerkedhetsz meg, melyek hatalmas segítséget jelentenek bonyolultnak tűnő feladatok szempillantás alatt való megoldásában, és a különböző képek, alakzatok beszúrását is elsajátíthatod.Az Excel rendkívül erős társad lehet egy - egy adat, kimutatás, riport prezentálásában is, elengedhetetlen tehát, hogy az ehhez illő diagramokat, grafikonokat is mesterien kezeld.',
            difficulty: 4.5,
            benchmark: 4,
            previouslyCompletedCount: 23,
            language: 'magyar',
            technicalRequirements: 'Windows vagy macOS rendszerű számítógép (utóbbin némileg eltérhet a megjelenés), | Legalább Microsoft Office 2016 vagy ennél magasabb verzió | Ajánlott 2 monitorral követni a kurzust az optimális haladásért',
            requirementsDescription: '',
            skillBenefits: 'Megtanulod a cellák, oszlopok & sorok és munkalapok kezelését valamint szerkesztését, Megmutatjuk mi hol van Excelben - többé nem fogsz elveszni a beállításokban',
            humanSkillBenefits: 'Logika: 7 | Analitikus gondolkodás: 6 | Problémamegoldás: 4 | Számítástechnikai ismeretek: 3 | Rendszerező készség: 4 | Hatékony munkavégzés: 9',
            humanSkillBenefitsDescription: 'Az Excel segítségével megláthatod a számadatokban rejlő valódi értéket és képessé válsz akár komplex statisztikai elemzések készítésére, ezáltal fejlesztheted a logikád és az analitikus gondolkodásod.Kurzusunk segít továbbá abban, hogy megfelelő számítógépes ismeretet sajátíts el és ezáltal a hétköznapokban megtöbbszörözd a munkateljesítményed.',
            visibility: 'public',
            categoryId: courseCategories.course_category_1.id,
            subCategoryId: courseCategories.course_category_5.id,
            teacherId: users.god.id,
            coverFileId: storageFiles.storage_file_302.id,
            deletionDate: null
        }
    });

export type CourseDatasSeedDataType = ReturnType<typeof getCourseDatasSeedData>;
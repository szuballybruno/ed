BEGIN;

 -- SEED COVER FILES
INSERT INTO public.storage_file 
    (id, file_path)
VALUES
    (2, '/courseCoverImages/1.png'),
(4, '/courseCoverImages/3.png'),
(5, '/courseCoverImages/canva.png'),
(6, '/courseCoverImages/5.png'),
(7, '/courseCoverImages/7.png'),
(8, '/courseCoverImages/6.png'),
(9, '/courseCoverImages/8.png'),
(21, 'courseCoverImages/cyber.jpg'),
(39, 'courseCoverImages/courseCoverImage_15_1635401920887..jpg'),
(61, 'courseCoverImages/courseCoverImage_2_1635425366973..jpg'),
(115, 'courseCoverImages/courseCoverImage_18_1635936801554..jpg'),
(161, 'courseCoverImages/courseCoverImage_22_1639469876995..jpg'),
(162, 'courseCoverImages/courseCoverImage_17_1639469918555..jpg'),
(163, 'courseCoverImages/courseCoverImage_23_1639471078184..jpg'),
(165, 'courseCoverImages/courseCoverImage_24_1639471231667..jpg'),
(166, 'courseCoverImages/courseCoverImage_25_1639471289057..jpg'),
(167, 'courseCoverImages/courseCoverImage_26_1639473175106..jpg'),
(302, 'courseCoverImages/courseCoverImage_27_1642268257899.jpg'),
(326, 'courseCoverImages/courseCoverImage_28_1642272695575.jpg')

ON CONFLICT (id) DO UPDATE SET 
    file_path = EXCLUDED.file_path;

-- SEED COURSES
INSERT INTO public.course 
    (
        id, 
        modification_date, 
        title, 
        short_description, 
        description, 
        difficulty, 
        benchmark, 
        previously_completed_count, 
        language, 
        technical_requirements, 
        requirements_description, 
        skill_benefits, 
        human_skill_benefits, 
        human_skill_benefits_description, 
        visibility, 
        category_id, 
        sub_category_id, 
        teacher_id, 
        cover_file_id, 
        shop_items_id
    )
VALUES
(4, '2022-01-15 14:18:32.55715+00', 'Canva Vállalkozásoknak', '', '', 3.5, 4.5, 0, 'magyar', '', '', '', '', '', 'private', 1, 5, 1, 5, NULL),
(10, '2022-01-15 16:02:23.130322+00', 'Cyberbiztonság az irodában', '', '', 1.5, 3.5, 0, 'magyar', '', '', '', '', '', 'private', 1, 5, 1, 21, NULL),
(23, '2022-01-14 21:52:26.140736+00', 'Instagram gyorstalpaló', '', '', 1.5, 3.5, 0, 'magyar', '', '', '', '', '', 'private', 1, 10, 1, 163, NULL),
(24, '2022-01-14 21:52:38.751267+00', 'Google Ads Alapozó', '', '', 1.5, 3.5, 0, 'magyar', '', '', '', '', '', 'private', 1, 4, 1, 165, NULL),
(26, '2022-01-14 21:52:50.323264+00', 'Adatbányászat Pythonnal', '', '', 1.5, 3.5, 0, 'magyar', '', '', '', '', '', 'private', 1, 3, 1, 167, NULL),
(25, '2022-01-14 21:54:26.151202+00', 'LinkedIn vállalkozásoknak', '', '', 1.5, 3.5, 0, 'magyar', '', '', '', '', '', 'private', 1, 10, 1, 166, NULL),
(28, '2022-02-02 15:39:50.354458+00', 'Microsoft Word Alapok', 'A Microsoft Word a maga nemében igazi svájci bicskának számít, amellyel produktív eszközök széles tárháza nyílik meg előtted. Használhatod akár to-do lista, borítékok, levelek, könyvek és kiadványok készítésére is ezáltal rengeteg időt spórolhatsz a hétköznapokban.', 'Word kurzusunk során először a program legalapvetőbb elrendezését és funkcióit ismerheted meg, majd megtanítunk hogyan formázd meg dokumentumaidat úgy ahogyan a profik. Ezután több és több gyakorlati tanáccsal fogunk ellátni, hogy megkönnyítsük a program használatát a mindennapok során és értékes időt spóroljunk számodra. Végül pedig részletesen bemutatjuk a Wordben található legtöbb vizuális eszközt és azok használatát, hogy ne csak szöveges formában legyen lehetőséged kifejezni a gondolataidat. ', 5, 4, 19, 'magyar', 'Windows vagy macOS rendszerű számítógép (utóbbin némileg eltérhet a megjelenés), Legalább Microsoft Office 2016 vagy ennél magasabb verzió, *Ajánlott 2 monitorral követni a kurzust az optimális haladásért', '', 'Megtanulod hogyan formázz meg bármilyen szöveget akár újságcikkekhez, könyvekhez. | Megtanulod a Word vizuális eszközei által szemléltetni a mondandód és mindezt képes leszel nyomtatható és publikálható formába ölteni. | Képes leszel helyes, konzisztensen formázott dokumentumokat létrehozni.', 'Számítástechnikai ismeretek: 8 | Tervezési készségek: 2 | Kreativitás: 7 | Hatékony munkavégzés: 9 | Csapatmunka: 1', 'Feltöltés alatt...', 'public', 1, 5, 1, 326, NULL),
(17, '2022-01-14 21:55:20.139944+00', 'OBS alapok', '', '', 1.5, 4, 27, 'magyar', '', '', '', '', '', 'public', 1, 9, 1, 162, NULL),
(22, '2022-02-11 14:18:39.393758+00', 'Microsoft PowerPoint Alapok', 'Legyen szó akár előadásról, időzített tanulókártyákról vagy egy fotóalbum animált levetítéséről, a PowerPoint mindegyik feladatra kiváló eszköz. Széleskörű testreszabási lehetőségeinek köszönhetően kreatívan, könnyedén és elegánsan mutathatod be gondolataidat bárkinek. ', 'PowerPoint kurzusunk során törekedtünk az egyszerű érthetőségre, hogy már szinte minimális számítógépes ismeret is elegendő legyen a program elsajátításához. Nagy hangsúlyt fektettünk a PowerPoint legnagyobb részét alkotó vizuális eszközök bemutatására, legyen szó mindenféle szövegről, képről, álló vagy mozgó alakzatról, de akár videóról is, így prezentációdnak egész biztosan csak a képzeleted szabhat határt. Továbbá néhány hasznos praktikát is megtanítunk, melyek segítségével időt spórolhatsz és magabiztosságot szerezhetsz mind a készítés, mind az előadás során.', 1.5, 3.5, 0, 'magyar', 'Windows vagy macOS rendszerű számítógép (utóbbin némileg eltérhet a megjelenés), Legalább Microsoft Office 2016 vagy ennél magasabb verzió, *Ajánlott 2 monitorral követni a kurzust az optimális haladásért', '', 'Megtanulod a PowerPoint alapvető elrendezését, prezentációk készítését és az ehhez szükséges számítógépes ismereteket is. | Megtanulod hogyan formázhatsz bármilyen szöveget vagy vizuális elemet | Megismerkedsz a diavetítés funkció részleteivel, az időzítéssel és az áttűnésekkel', 'Önkifejezés: 5 | Kreativitás: 9 | Számítógépes ismeretek: 5 | Hatékony munkavégzés: 2 | Tervezési készségek: 4', 'A PowerPoint egy új szintre helyezi a kreativitásod, merni fogsz bátran kísérletezni a rengeteg eszközzel és azok opcióival, hogy megalkothasd a legegyedibb prezentációkat. Ezáltal könnyebben kifejezheted magad és gyorsabban tervezheted meg egy előadás felépítését is.', 'public', 1, 5, 1, 161, NULL),
(29, '2022-01-15 16:02:29.20839+00', 'Uj kurzus', '', '', 0, 0, 0, 'magyar', '', '', '', '', '', 'private', 1, 1, 1, NULL, NULL),
(27, '2022-02-02 11:45:50.036622+00', 'Microsoft Excel Alapok', 'Formázások, képletek, függvények. Sokunk számára már rájuk gondolni is kellemetlen, dolgozni, pedig végképp nem szeretnénk velük. Office tanfolyamsorozatunk oszlopos tagjaként Excel kurzusunk sallangmentesen, és mindenki számára közérthetően segít megérteni, hogyan használhatjuk hatékonyan a Microsoft zöld táblázatkezelőjét.', 'Excel alapozó kurzusunk egészen az alapoktól mutatja be a program működését. Részletesen ismerheted meg a különböző menüpontokat, elrendezéseket, majd a munkaterület feltérképezése után az alapvető műveletek elvégzésének kezdhetsz neki. A formázások elsajátítása után a függvények tárházával ismerkedhetsz meg, melyek hatalmas segítséget jelentenek bonyolultnak tűnő feladatok szempillantás alatt való megoldásában, és a különböző képek, alakzatok beszúrását is elsajátíthatod. Az Excel rendkívül erős társad lehet egy-egy adat, kimutatás, riport prezentálásában is, elengedhetetlen tehát, hogy az ehhez illő diagramokat, grafikonokat is mesterien kezeld.', 4.5, 4, 23, 'magyar', 'Windows vagy macOS rendszerű számítógép (utóbbin némileg eltérhet a megjelenés), | Legalább Microsoft Office 2016 vagy ennél magasabb verzió | Ajánlott 2 monitorral követni a kurzust az optimális haladásért', '', 'Megtanulod a cellák, oszlopok & sorok és munkalapok kezelését valamint szerkesztését, Megmutatjuk mi hol van Excelben - többé nem fogsz elveszni a beállításokban', 'Logika: 7 | Analitikus gondolkodás: 6 | Problémamegoldás: 4 | Számítástechnikai ismeretek: 3 | Rendszerező készség: 4 | Hatékony munkavégzés: 9', 'Az Excel segítségével megláthatod a számadatokban rejlő valódi értéket és képessé válsz akár komplex statisztikai elemzések készítésére, ezáltal fejlesztheted a logikád és az analitikus gondolkodásod. Kurzusunk segít továbbá abban, hogy megfelelő számítógépes ismeretet sajátíts el és ezáltal a hétköznapokban megtöbbszörözd a munkateljesítményed.', 'public', 1, 5, 1, 302, NULL)


    /* (
        1, 
        'Webfejlesztés kezdőknek (HTML, CSS, BOOTSTRAP)', 
        DEFAULT, 
        1, 
        2, 
        1, 
        1, -- cover_file_id
        'Formázások, képletek, függvények. Sokunk számára már rájuk gondolni is kellemetlen, dolgozni, pedig végképp nem szeretnénk velük. Office tanfolyamsorozatunk oszlopos tagjaként Excel kurzusunk sallangmentesen, és mindenki számára közérthetően segít megérteni, hogyan használhatjuk hatékonyan a Microsoft zöld táblázatkezelőjét.',
        'Excel alapozó kurzusunk egészen az alapoktól mutatja be a program működését. Részletesen ismerheted meg a különböző menüpontokat, elrendezéseket, majd a munkaterület feltérképezése után az alapvető műveletek elvégzésének kezdhetsz neki. A formázások elsajátítása után a függvények tárházával ismerkedhetsz meg, melyek hatalmas segítséget jelentenek bonyolultnak tűnő feladatok szempillantás alatt való megoldásában, és a különböző képek, alakzatok beszúrását is elsajátíthatod. Az Excel rendkívül erős társad lehet egy-egy adat, kimutatás, riport prezentálásában is, elengedhetetlen tehát, hogy az ehhez illő diagramokat, grafikonokat is mesterien kezeld.',
        1.5,
        3.5,
        7842,
        'magyar',
        'Windows vagy Mac operacios rendszer | Alma | Barack',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique suscipit tempor. Pellentesque dictum, augue a egestas faucibus, augue ipsum vehicula dui, faucibus eleifend risus orci quis ante. Curabitur porttitor fringilla blandit. Suspendisse placerat tempus vehicula. In dignissim tellus magna. Donec non tincidunt risus. Morbi sit amet turpis dolor. Proin vulputate leo eu leo bibendum, in condimentum ex efficitur. Maecenas risus sem, pharetra eu magna vel, gravida luctus urna. Sed diam urna, blandit id justo a, consectetur lacinia risus. Donec porttitor, sem vitae posuere lacinia, mauris libero sagittis dui, non viverra purus lectus ut urna. Pellentesque semper, eros ac maximus vehicula, orci odio tempor magna, vel rutrum nisi nisl id mauris. Cras ullamcorper lacus elementum venenatis feugiat. Donec magna dui, vulputate ac massa ut, placerat imperdiet mauris. Fusce pellentesque ipsum nunc, eu lobortis libero porttitor id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc tempor euismod erat, finibus commodo felis mollis a. Ut rhoncus convallis sem, in varius tortor dapibus et. Donec ultricies accumsan neque, eget bibendum ante fringilla sed.',
        'Alapvető műveletek elvégzése | Grafikai elemek használata | Grafikonok és diagramok létrehozása | Táblázatok | munkalapok kezelése | Függvényekkel való munkavégzés | Riportok készítése',
        'Egyeduli: 1 | Hangos kimondas: 2 | Elmeleti: 4 | Vizualis alapu: 2 | Analitikus: 5 | Szocialis: 7 | Terbeli elhelyezes: 8 | Gyakorlati: 3 | Audio alapu: 7 | Kreativ: 9',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique suscipit tempor. Pellentesque dictum, augue a egestas faucibus, augue ipsum vehicula dui, faucibus eleifend risus orci quis ante. Curabitur porttitor fringilla blandit. Suspendisse placerat tempus vehicula. In dignissim tellus magna. Donec non tincidunt risus. Morbi sit amet turpis dolor. Proin vulputate leo eu leo bibendum, in condimentum ex efficitur. Maecenas risus sem, pharetra eu magna vel, gravida luctus urna. Sed diam urna, blandit id justo a, consectetur lacinia risus.'
    ),
    (
        2, 
        'Java programozás mesterkurzus', 
        DEFAULT, 
        1, 
        3, 
        1, 
        2, -- cover_file_id
        'short desc',
        'long desc',
        1.5,
        3.5,
        2314,
        'magyar',
        'Windows vagy Mac operacios rendszer | Alma | Barack',
        '',
        'Megtanulhatsz ezt | Megtanulhatsz azt | Megtanulhatsz amazt',
        'reflex: 1 | figyelem: 2',
        ''
    ),
    (
        3, 
        'Angular - Minden amire szükséged lehet', 
        'private', 
        1, 
        4, 
        1, 
        3, -- cover_file_id
        'short desc',
        'long desc',
        1.5,
        3.5,
        321,
        'magyar',
        'Windows vagy Mac operacios rendszer | Alma | Barack',
        '',
        'Megtanulhatsz ezt | Megtanulhatsz azt | Megtanulhatsz amazt',
        'reflex: 1 | figyelem: 2',
        ''
    ),
    (
        4, 
        'Microsoft Excel Mesterkurzus', 
        DEFAULT, 
        1, 
        5, 
        1, 
        4, -- cover_file_id
        'short desc',
        'long desc',
        1.5,
        3.5,
        1482,
        'magyar',
        'Windows vagy Mac operacios rendszer | Alma | Barack',
        '',
        'Megtanulhatsz ezt | Megtanulhatsz azt | Megtanulhatsz amazt',
        'reflex: 1 | figyelem: 2',
        ''
    ) */

ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    category_id = EXCLUDED.category_id,
    sub_category_id = EXCLUDED.sub_category_id, 
    teacher_id = EXCLUDED.teacher_id, 
    cover_file_id = EXCLUDED.cover_file_id;

-- SEED MODULES 
INSERT INTO public.course_module 
    (
        id, 
        name, 
        description,
        order_index, 
        course_id, 
        image_file_id)
VALUES
(1, 'module', 'signup module', 0, NULL, NULL),
(4, 'module', 'description', 0, 10, NULL),
(2, 'Bevezetés az Excelbe', 'Excel tanfolyamunk első moduljában az alapvető fogalmakkal, a menürendszerrel, valamint a kezelőszervekkel ismerkedhetsz meg.', 0, 4, NULL),
(3, 'OBS használata percek alatt', 'Ebben a modulban megtanulhatod, hogyan állítsd be villámgyorsan az OBS-t úgy, hogy hatékony erőforrás-kezelés mellett is csúcsminőségű felvételeket tudj készíteni, és akkor se érjen probléma, ha esetleg közben valamiért megszakadna a videó.', 0, 17, NULL),
(7, 'Finomságok az OBS-el', 'Zajszűrés, hangeffektek, az OBS-nek ez sem jelent problémát!', 1, 17, NULL),
(8, 'Első felvételünk, vizsga', 'Készítsd el első felvételed OBS-el!', 2, 17, NULL),
(35, 'Első lépések', '', 0, 27, NULL),
(36, 'Ismerkedés a függvényekkel', '', 1, 27, NULL),
(37, 'A formázás alapjai', '', 2, 27, NULL),
(38, 'Leggyakoribb függvények és azok használata', '', 3, 27, NULL),
(39, 'Segítség az adatkezelésben', '', 4, 27, NULL),
(40, 'Munka másokkal', '', 5, 27, NULL),
(41, 'Formázás felsőfokon', '', 6, 27, NULL),
(42, 'Munka nagy mennyiségű adattal', '', 7, 27, NULL),
(43, 'Kreatív adatábrázolás', '', 8, 27, NULL),
(44, 'Ismerkedés a haladó funkciókkal', '', 9, 27, NULL),
(45, 'Első lépések', '', 0, 28, NULL),
(47, 'Formázás - Hogyan készíthetünk letisztult dokumentumokat?', '', 1, 28, NULL),
(48, 'Gyorsabb munka a gyakorlatban', '', 2, 28, NULL),
(49, 'Munka másokkal, dokumentumunk védelme', '', 3, 28, NULL),
(50, 'Szövegírás, elrendezés, ellenőrzés', '', 4, 28, NULL),
(51, 'Képek, vizuális eszközök használata', '', 5, 28, NULL),
(52, 'Táblázatok a Wordben', '', 6, 28, NULL),
(53, 'Példák a gyakorlati alkalmazásra', '', 7, 28, NULL),
(54, 'Első lépések', '', 0, 22, NULL),
(55, 'Szöveg és tartalom formázása', '', 1, 22, NULL),
(56, 'Képek, vizuális eszközök használata', '', 2, 22, NULL),
(57, 'Videók és hanganyagok használata a PowerPointon belül', '', 3, 22, NULL),
(58, 'Prezentáció rendszerezése, segítség az előadás során', '', 4, 22, NULL),
(59, 'Prezentáció további testreszabása és effektusok', '', 5, 22, NULL),
(60, 'Tartalom ellenőrzése és közös munka', '', 6, 22, NULL)
   /* ( 2, 1, 'Első modul', 0, 'desc'),
    (3, 2, 'Első modul', 0, 'desc'),
    (4, 3, 'Első modul', 0, 'desc'),
    (5, 4, 'Első modul', 0, 'desc'),
    (6, 4, 'Masodik modul', 1, 'desc') */

ON CONFLICT ("id") DO UPDATE SET 
    course_id = EXCLUDED.course_id, 
    name = EXCLUDED.name, 
    order_index = EXCLUDED.order_index, 
    description = EXCLUDED.description;

END;
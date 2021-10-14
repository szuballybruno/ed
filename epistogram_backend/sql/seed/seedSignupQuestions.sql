START TRANSACTION;

-- Question categories
INSERT INTO "question_category" ("minLabel", "maxLabel")
VALUES
    ('Egyedüli', 'Szociális'),
    ('Hangos kimondás', 'Térbeli elhelyezés'),
    ('Elméleti', 'Gyakorlati'),
    ('Vizuális alapú', 'Audio alapú'),
    ('Analitikus', 'Kreatív')
RETURNING "id";

-- Questions
INSERT INTO "question"
(
    "questionText",
    "imageUrl",
    "showUpTimeSeconds",
    "categoryId",
    "videoId",
    "examId"
)
VALUES
-- SECTION 1
-- 1.1 Question
(
    'Ha egy olyan feladatot kell megoldanom, melyhez kutatnom kell egy témában',
    '{CDN_BUCKET_URL}/signupQuestionImages/1.1.svg',
    DEFAULT,
    1,
    DEFAULT,
    1
),
-- 1.2 Question
(
    'Amikor egy bonyolult személyes problémával kell megküzdenem',
    '{CDN_BUCKET_URL}/signupQuestionImages/1.2.svg',
    DEFAULT,
    1,
    DEFAULT,
    1
),
-- 1.3 Question
(
    'Véleményem szerint hasznosabb, ha egy képzés során',
    '{CDN_BUCKET_URL}/signupQuestionImages/1.3.svg',
    DEFAULT,
    1,
    DEFAULT,
    1
),
-- 1.4 Question
(
    'Egy előadás során, amennyiben interaktivitásra van lehetőség',
    '{CDN_BUCKET_URL}/signupQuestionImages/1.4.svg',
    DEFAULT,
    1,
    DEFAULT,
    1
),
-- 1.5 Question
(
    'Egy csapatban elvégzendő projekt esetén a következőt preferálom',
    '{CDN_BUCKET_URL}/signupQuestionImages/1.5.svg',
    DEFAULT,
    1,
    DEFAULT,
    1
),
-- 1.6 Question
(
    'Az ügyeimet intézni, vásárolni inkább',
    '{CDN_BUCKET_URL}/signupQuestionImages/1.6.svg',
    DEFAULT,
    1,
    DEFAULT,
    1
),
-- 1.7 Question
(
    'Mikor irodából dolgozom, jobban szeretem, ha',
    '{CDN_BUCKET_URL}/signupQuestionImages/1.7.svg',
    DEFAULT,
    1,
    DEFAULT,
    1
),

-- SECTION 2
-- 2.1 Question
(
    'Ha egy matematikai problémát kellene megoldanom',
    '{CDN_BUCKET_URL}/signupQuestionImages/2.1.svg',
    DEFAULT,
    2,
    DEFAULT,
    1
),
-- 2.2 Question
(
    'Hogy megjegyezzek valamit, számomra hatékonyabb, ha',
    '{CDN_BUCKET_URL}/signupQuestionImages/2.2.svg',
    DEFAULT,
    2,
    DEFAULT,
    1
),
-- 2.3 Question
(
    'Összeszerelni egy darabokból álló bútort használati útmutató alapján',
    '{CDN_BUCKET_URL}/signupQuestionImages/2.3.svg',
    DEFAULT,
    2,
    DEFAULT,
    1
),
-- 2.4 Question
(
    'Az olyan képzéseket szeretem, ahol',
    '{CDN_BUCKET_URL}/signupQuestionImages/2.4.svg',
    DEFAULT,
    2,
    DEFAULT,
    1
),
-- 2.5 Question
(
    'Hogy megértsem és emlékezzek arra, hogyan működik egy gép',
    '{CDN_BUCKET_URL}/signupQuestionImages/2.5.svg',
    DEFAULT,
    2,
    DEFAULT,
    1
),
-- 2.6 Question
(
    'Jobban élvezem, mikor',
    '{CDN_BUCKET_URL}/signupQuestionImages/2.6.svg',
    DEFAULT,
    2,
    DEFAULT,
    1
),
-- 2.7 Question
(
    'Ha egy számomra ismeretlen irodát kellene megtalálnom egy komplexumban, erre kérném a portást',
    '{CDN_BUCKET_URL}/signupQuestionImages/2.7.svg',
    DEFAULT,
    2,
    DEFAULT,
    1
),

-- SECTION 3
-- 3.1 Question
(
    'Jobban szeretek',
    '{CDN_BUCKET_URL}/signupQuestionImages/3.1.svg',
    DEFAULT,
    3,
    DEFAULT,
    1
),
-- 3.2 Question
(
    'Olyan munkát preferálok jobban, ahol',
    '{CDN_BUCKET_URL}/signupQuestionImages/3.2.svg',
    DEFAULT,
    3,
    DEFAULT,
    1
),
-- 3.3 Question
(
    'Jobban szeretek',
    '{CDN_BUCKET_URL}/signupQuestionImages/3.3.svg',
    DEFAULT,
    3,
    DEFAULT,
    1
),
-- 3.4 Question
(
    'Ha esszét kéne írnom',
    '{CDN_BUCKET_URL}/signupQuestionImages/3.4.svg',
    DEFAULT,
    3,
    DEFAULT,
    1
),
-- 3.5 Question
(
    'Az olyan feladatokat kedvelem inkább, ahol',
    '{CDN_BUCKET_URL}/signupQuestionImages/3.5.svg',
    DEFAULT,
    3,
    DEFAULT,
    1
),
-- 3.6 Question
(
    'Ha egy kerti kisházat szeretnék készíteni, ',
    '{CDN_BUCKET_URL}/signupQuestionImages/3.6.svg',
    DEFAULT,
    3,
    DEFAULT,
    1
),
-- 3.7 Question
(
    'Ha szeretnék többet megtudni nagysebességű nyomtatókról',
    '{CDN_BUCKET_URL}/signupQuestionImages/3.7.svg',
    DEFAULT,
    3,
    DEFAULT,
    1
),

-- SECTION 4
-- 4.1 Question
(
    'Jobban szeretem, ha az instrukciókat',
    '{CDN_BUCKET_URL}/signupQuestionImages/4.1.svg',
    DEFAULT,
    4,
    DEFAULT,
    1
),
-- 4.2 Question
(
    'Szívesebben,',
    '{CDN_BUCKET_URL}/signupQuestionImages/4.2.svg',
    DEFAULT,
    4,
    DEFAULT,
    1
),
-- 4.3 Question
(
    'Jobban megjegyzem',
    '{CDN_BUCKET_URL}/signupQuestionImages/4.3.svg',
    DEFAULT,
    4,
    DEFAULT,
    1
),
-- 4.4 Question
(
    'Jobban szeretem az olyan előadásokat, ahol',
    '{CDN_BUCKET_URL}/signupQuestionImages/4.4.svg',
    DEFAULT,
    4,
    DEFAULT,
    1
),
-- 4.5 Question
(
    'Könnyebben jegyzek meg új információkat',
    '{CDN_BUCKET_URL}/signupQuestionImages/4.5.svg',
    DEFAULT,
    4,
    DEFAULT,
    1
),
-- 4.6 Question
(
    'Ha informálódni szeretnék a hétköznapi élettel kapcsolatban',
    '{CDN_BUCKET_URL}/signupQuestionImages/4.6.svg',
    DEFAULT,
    4,
    DEFAULT,
    1
),
-- 4.7 Question
(
    'Ha meg akarom tudni, hogyan használjam a faxgépet',
    '{CDN_BUCKET_URL}/signupQuestionImages/4.7.svg',
    DEFAULT,
    4,
    DEFAULT,
    1
),

-- SECTION 5
-- 5.1 Question
(
    'Döntéshozatalnál fajsúlyosabbak számomra',
    '{CDN_BUCKET_URL}/signupQuestionImages/5.1.svg',
    DEFAULT,
    5,
    DEFAULT,
    1
),
-- 5.2 Question
(
    'Egy feladat hatékony elvégzéséhez',
    '{CDN_BUCKET_URL}/signupQuestionImages/5.2.svg',
    DEFAULT,
    5,
    DEFAULT,
    1
),
-- 5.3 Question
(
    'Ha ki szeretném fejezni a gondolataimat, érzéseimet',
    '{CDN_BUCKET_URL}/signupQuestionImages/5.3.svg',
    DEFAULT,
    5,
    DEFAULT,
    1
),
-- 5.4 Question
(
    'Az olyan előadókat, oktatókat kedvelem, akik',
    '{CDN_BUCKET_URL}/signupQuestionImages/5.4.svg',
    DEFAULT,
    5,
    DEFAULT,
    1
),
-- 5.5 Question
(
    'Általában',
    '{CDN_BUCKET_URL}/signupQuestionImages/5.5.svg',
    DEFAULT,
    5,
    DEFAULT,
    1
),
-- 5.6 Question
(
    'Ha vizsgáznom kellene, a következőt preferálnám',
    '{CDN_BUCKET_URL}/signupQuestionImages/5.6.svg',
    DEFAULT,
    5,
    DEFAULT,
    1
),
-- 5.7 Question
(
    'Ha kapok egy megbízást, feladatot, jobban szeretem',
    '{CDN_BUCKET_URL}/signupQuestionImages/5.7.svg',
    DEFAULT,
    5,
    DEFAULT,
    1
)
RETURNING "id";

-- Answers (isCorrect is used here as a flag to determine which end of a category does a question fall into)
INSERT INTO "answer"
(
    "text",
    "isCorrect",
    "questionId"
)
VALUES

-- SECTION 1
-- 1.1 answers
    ('Örülnék, ha lenne ehhez egy kollégám', true, 1),
    ('A tények és az objektív adatok', false, 1),
-- 1.2 answers
    ('Segít, ha megvitatom azt másokkal', true, 2),
    ('Jobban szeretem egyedül megoldani azt', false, 2),
-- 1.3 answers
    ('Csoportos aktivitások, illetve közös megvitatások nagyobb számban vannak beiktatva', true, 3),
    ('Egyénileg megoldandó feladatok kerülnek meghatározásra', false, 3),
-- 1.4 answers
    ('Magához az előadóhoz szólnak a gondolataim', true, 4),
    ('Inkább magához a témához szólok, az előadó másodlagos', false, 4),
-- 1.5 answers
    ('Szoros együttműködés a többiekkel', true, 5),
    ('Szívesebben oldok meg egyedül részfeladatokat', false, 5),
-- 1.6 answers
    ('A barátaimmal szeretek', true, 6),
    ('Egymagam intézem', false, 6),
-- 1.7 answers
    ('Többen vagyunk, és nagy a sürgés-forgás', true, 7),
    ('Ha kevesebben vagyunk, vagy akár egyedül dolgozhatok', false, 7),


-- SECTION 2
-- 2.1 answers
    ('Szeretem lerajzolni, vizualizálni a problémát', true, 8),
    ('Egy példa problémán keresztül tudom jól megérteni', false, 8),
-- 2.2 answers
    ('Egy képet kreálok róla a fejemben', true, 9),
    ('Lerajzolom azt, amire emlékeznem kell', false, 9),
-- 2.3 answers
    ('Könnyű feladat, nem jelent számomra gondot', true, 10),
    ('Kihívást jelent', false, 10),
-- 2.4 answers
    ('Fizikai eszközökkel, modellekkel dolgozhatunk', true, 11),
    ('Csoportosan megvitatjuk az adott témát', false, 11),
-- 2.5 answers
    ('Ábrákat, működés közbeni rajzot készítenék', true, 12),
    ('Rövid jegyzetet írnék a működéséről', false, 12),
-- 2.6 answers
    ('Rajzolhatok, a kezeimmel dolgozhatok valamin', true, 13),
    ('Beszélhetek, írhatok, vagy inkább hallgathatok valakit', false, 13),
-- 2.7 answers
    ('Mutassa meg az épület alaprajzán/rajzolja le a helyes irányt', true, 14),
    ('Mondja el/írja le, hogy mikor merre kell fordulnom', false, 14),


-- SECTION 3
-- 3.1 answers
    ('Tényeket és részleteket megtanulni, megismerni', true, 15),
    ('Saját teóriákat kreálni, ötletelni', false, 15),
-- 3.2 answers
    ('Specifikus instrukciókat követhetek', true, 16),
    ('Analizálni kell, és döntéseket hozom ', false, 16),
-- 3.3 answers
    ('Megoldani egy matematikai problémát egy képlet segítségével', true, 17),
    ('Felfedezni a képlet mögötti logikát', false, 17),
-- 3.4 answers
    ('Szívesebben írnék egy gyakorlati problémáról, annak folyamatáról', true, 18),
    ('Szívesebben írnék inkább elméletekről, teóriákról', false, 18),
-- 3.5 answers
    ('Pontos, részletes instrukciókat követhetek', true, 19),
    ('Elemzésre van szükség, és következtetéseket kell levonnom', false, 19),
-- 3.6 answers
    ('Jobban élvezném a ház megépítését.', true, 20),
    ('Jobban élvezném a ház megtervezését. ', false, 20),
-- 3.7 answers
    ('Kipróbálnék több típust is, dolgoznék velük', true, 21),
    ('Utána néznék az alapvető működésüknek, milyen elven operálnak', false, 21),


-- SECTION 4
-- 4.1 answers
    ('Szóban kapom meg', true, 22),
    ('Írásban kapom meg', false, 22),
-- 4.2 answers
    ('Mennék el  egy híres pszichológus előadására', true, 23),
    ('Olvasnám el  a könyvet, melyre az előadás alapszik', false, 23),
-- 4.3 answers
    ('A neveket', true, 24),
    ('Az arcokat', false, 24),
-- 4.4 answers
    ('Az előadó magyaráz és megválaszolja a kérdéseket', true, 25),
    ('Videókkal, filmek segítségével mutatja be az adott témát', false, 25),
-- 4.5 answers
    ('Ha hallom (valaki elmondja nekem)', true, 26),
    ('Ha képeken látom', false, 26),
-- 4.6 answers
    ('Meghallgatom a híreket a rádióban, akár vezetés közben', true, 27),
    ('Hírportálokról tájékozódom inkább', false, 27),
-- 4.7 answers
    ('Megkérem egy kollégámat, hogy magyarázza el', true, 28),
    ('Megkérem egy kollégámat, hogy mutassa be a gépen, hogyan használja', false, 28),


-- SECTION 5
-- 5.1 answers
    ('A tapasztalataim és a megérzéseim', true, 29),
    ('A tények és az objektív adatok', false, 29),
-- 5.2 answers
    ('Azzal dolgozom, ami éppen rendelkezésre áll a közelemben', true, 30),
    ('Szükségem van minden eszközre, előre összekészítve', false, 30),
-- 5.3 answers
    ('Szívesen teszem azt zenével, írással, művészet segítségével', true, 31),
    ('Tömören, egyértelműen kommunikálók róluk', false, 31),
-- 5.4 answers
    ('Engedik, hogy hallgatókat a saját érdeklődésük vezesse', true, 32),
    ('Konkrét, kézzelfogható elvárásokat támasztanak', false, 32),
-- 5.5 answers
    ('Meg szoktam kérdőjelezni azt, amiről hallok vagy olvasok', true, 33),
    ('El szoktam fogadni azt, amiről hallok vagy olvasok', false, 33),
-- 5.6 answers
    ('Esszé jellegű vizsga', true, 34),
    ('Teszt jellegű felmérés', false, 34),
-- 5.7 answers
    ('A saját megközelítésemet alkalmazva megoldani', true, 35),
    ('Pontos utasítások alapján teljesíteni', false, 35)


RETURNING "id";

COMMIT

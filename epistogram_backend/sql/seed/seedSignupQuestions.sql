START TRANSACTION;

-- Question categories
INSERT INTO "question_category" ("name") 
VALUES 
    ('category1'), 
    ('category2') 
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
(
    'Egy csapatban elvégzendő projekt esetén a következőt preferálom:', 
    '{CDN_BUCKET_URL}/signupQuestionImages/kerdes1.png', 
    DEFAULT, 
    1, 
    DEFAULT, 
    1
), 
(
    'Ha egy számomra ismeretlen irodát kellene megtalálnom egy komplexumban, erre kérném a portást: ', 
    '{CDN_BUCKET_URL}/signupQuestionImages/kerdes2.png', 
    DEFAULT, 
    1, 
    DEFAULT, 
    1
), 
(
    'Jobban preferálom azt a munkában, mikor:', 
    '{CDN_BUCKET_URL}/signupQuestionImages/kerdes3.png',
    DEFAULT,
    2,
    DEFAULT,
    1
), 
(
    'Egy előadás esetén hasznosabb számomra, ha:', 
    '{CDN_BUCKET_URL}/signupQuestionImages/kerdes4.png',
    DEFAULT, 
    2, 
    DEFAULT, 
    1
), 
(
    'Az érzéseimet, gondolataimat a következő módokon fejezem ki szívesebben:', 
    '{CDN_BUCKET_URL}/signupQuestionImages/kerdes5.png',
    DEFAULT, 
    2, 
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
    ('Szoros együttműködés a többiekkel', true, 1), 
    ('Szívesebben oldok meg egyedül részfeladatokat', false, 1), 
    ('Mutassa meg az épület alaprajzán/rajzolja le a helyes irányt', true, 2), 
    ('Mondja el/írja le, hogy mikor merre kell fordulnom', false, 2), 
    ('Előre definiált instrukciók alapján végzek el feladatokat', true, 3), 
    ('Kutatnom kell a megoldás után és analizálni különböző eseteket', false, 3), 
    ('Az előadó magyaráz, és megválaszolja a felmerülő kérdéseket', true, 4), 
    ('kisfilmekkel, videókkal illusztrálja és egészíti ki a mondanivalóját', false, 4), 
    ('Zenéken, írásokon, a művészet által', true, 5),
    ('Direkt, lényegre törő kommunikációval', false, 5) 
RETURNING "id";

COMMIT
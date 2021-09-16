INSERT INTO public."question"(
    "questionText", 
    "imageUrl", 
    "isSignupQuestion", 
    "showUpTimeSeconds",
    "videoId",
    "examId") 
VALUES 
    (
        "Egy csapatban elvégzendő projekt esetén a következőt preferálom:", 
        "https://storage.googleapis.com/epistogram_bucket_dev/application/kerdes1.png", 
        1,
        DEFAULT, 
        DEFAULT, 
        DEFAULT
    ), 
    ($4, $5, $6, DEFAULT, DEFAULT, DEFAULT),
    ($7, $8, $9, DEFAULT, DEFAULT, DEFAULT), 
    ($10, $11, $12, DEFAULT, DEFAULT, DEFAULT),
    ($13, $14, $15, DEFAULT, DEFAULT, DEFAULT) 
RETURNING "id" 
      
-- PARAMETERS: ["Egy csapatban elvégzendő projekt esetén a következőt preferálom:","https://storage.googleapis.com/epistogram_bucket_dev/application/kerdes1.png",1,"Ha egy számomra ismeretlen irodát kellene megtalálnom egy komplexumban, erre kérném a portást: ","https://storage.googleapis.com/epistogram_bucket_dev/application/kerdes2.png",1,"Jobban preferálom azt a munkában, mikor:","https://storage.googleapis.com/epistogram_bucket_dev/application/kerdes3.png",1,"Egy előadás esetén hasznosabb számomra, ha:","https://storage.googleapis.com/epistogram_bucket_dev/application/kerdes4.png",1,"Az érzéseimet, gondolataimat a következő módokon fejezem ki szívesebben:","https://storage.googleapis.com/epistogram_bucket_dev/application/kerdes5.png",1]

INSERT INTO 
    "answer"("text", "isCorrect", "questionId") 
VALUES 
    ($1, DEFAULT, $2), 
    ($3, DEFAULT, $4), 
    ($5, DEFAULT, $6), 
    ($7, DEFAULT, $8), 
    ($9, DEFAULT, $10), 
    ($11, DEFAULT, $12), 
    ($13, DEFAULT, $14), 
    ($15, DEFAULT, $16), 
    ($17, DEFAULT, $18), 
    ($19, DEFAULT, $20) 
RETURNING "id"

 -- PARAMETERS: ["Szoros együttműködés a többiekkel",1,"Szívesebben oldok meg egyedül részfeladatokat",1,"Mutassa meg az épület alaprajzán/rajzolja le a helyes irányt",2,"Mondja 
-- el/írja le, hogy mikor merre kell fordulnom",2,"Előre definiált instrukciók alapján végzek el feladatokat",3,"Kutatnom kell a megoldás után és analizálni 
-- különböző eseteket",3,"Az előadó magyaráz, és megválaszolja a felmerülő kérdéseket",4,"kisfilmekkel, videókkal illusztrálja és egészíti ki a mondanivalóját",4,"Zenéken, írásokon, a művészet által",5,"Direkt, lényegre törő kommunikációval",5]
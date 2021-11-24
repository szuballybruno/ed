START TRANSACTION;

INSERT INTO "personality_category_description"
    (
        "max_description",
        "min_description",
        "question_category_id"
    )
VALUES
    (
        'Először azt vizsgáltuk, mennyire szeretsz interakcióba lépni más emberekkel a tanulási folyamatok során. Te inkább a szociális kategóriába tartozol, ami azt jelenti, hogy a párban, akár csoportosan való tanulás során jobban fejlődsz, mintha egyedül vágnál neki az adott tananyagnak.',
        'Először azt vizsgáltuk, mennyire szeretsz interakcióba lépni más emberekkel a tanulási folyamatok során. Úgy látjuk, te hatékonyabban tanulsz, ha egyedül, fókuszáltan foglalkozol az adott tananyaggal, hasznos lehet számodra,ha kisebb-nagyobb célokat határozol meg, ez segíti azt, hogy folyamatos sikerélményekkel fenntartsd a motivációdat.',
        1
    ),
    (
        'Jól helyezel el a térben dolgokat, információkat, sok esetben akár ehhez is kötsz egy-egy történést. Ne kösd magad feltétlenül mindig ugyanahhoz a környezethez, egy kávézó, park, vagy akár otthonod egy másik helyiségében való tanulás is jelentősen segíthet produktivitásod növelésében. ',
        'Meglehet, hogy a különböző tárgyak, helyszínek térbeli elhelyezése nehézséget jelent számodra, ezt viszont jól kompenzálhatod azzal, ha a megszerzett információt hangosan kimondod, visszaismétled. Ez segíti a vizuális elhelyezést is, mely a tájékozódásban is előnyödre válik, továbbá egy-egy információ megszerzését konkrét történésekhez tudod társítani, így emlékeket visszaidézve juthatsz fontos részletekhez. ',
        2
    ),
    (
        'A gyakorlati helyzeteket, a konkrét szituációkat kedveled, így ha meg akarsz érteni egy adott területet, érdemes azt esettanulmányokon keresztül vizsgálnod. Szereted tudni, hogy a különböző elméleteket mire használhatod a való életben. Úgy szerezhetsz mély tapasztalatot, ha a megszerzett tudásod alapján gyakorlati projektbe kezdesz.',
        'Egy-egy módszer gyakorlati alkalmazása nem hoz lázba, sokkal inkább elméleti szinten érdekel az adott probléma. A hatékony tanulás érdekében érdemes saját magad által létrehozott szabályok szerint rendszerezned az ismeretanyagot, hiszen ez segít, hogy ne vessz el a gondolataid hálójában.',
        3
    ),
    (
        'Hallás vagy vizuális ingerek alapján ragad meg jobban az információ? Számodra az elsó módszer a nyerő, éppen ezért hasznos, ha előnyben részesíted a hangoskönyveket, a jegyzeteidet pedig felmondhatod, hogy később vissza hallgathasd. Ha pedig csak írásban van meg egy-egy tananyag: ideje beüzemelned szövegfelolvasónkat.',
        'Hallás vagy vizuális ingerek alapján ragad meg jobban az információ? Számodra a második a nyerő, így a videók, rajzok, képek és diagramok azok, melyek a leginkább a javadat szolgálják. Érdemes mindmapeket (kurzusunkért kattints ide!)  használnod, melyek megkönnyítik az információk rendszerezését, és segítik, hogy magas szintről egyre mélyebbre haladva, részleteiben mélyítsd el tudásod. ',
        4
    ),
    (
        'Kreatívabb vagy, mint esetleg gondolnád! Innovatív módokon, és kísérletezésen keresztül szerzed tapasztalataidat, mely talán a legeffektívebb, természetes tanulási mód számodra, hiszen kisgyermekként is fokozatosan fedezzük fel a körülöttünk lévő világot - külső szabályok és keretek nélkül. Az egyik legnagyszerűbb amit tehetsz, ha a különböző szituációkban megfigyeled magad, és jegyzeteket készítesz az érzéseidről, reakcióidról. Így később különböző mintázatokat állapíthatsz meg, és megtudhatod, hogyan állíthatod kreativitásod a leginkább szolgálatodba.',
        'A logikus gondolkodás, és a tények, az analitika embere vagy. Fontos, hogy rendezett környezetet alakíts ki magad körül, mikor tanulsz, nem is hinnéd, ez mennyire erősen hatással lehet arra, mennyire tudsz mélyen koncentrálni.Készíts összefoglalókat, folyamat leírásokat és csekklistákat, melyeken minden új kurzus során végigmész, így garantáltan nem fogsz kihagyni semmit, az apróbb mérföldkövek teljesítése pedig segít számodra, hogy hosszú távon motivált maradhass.',
        5
    )
RETURNING "id";

COMMIT;

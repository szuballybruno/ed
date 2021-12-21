BEGIN;

-- SEED COVER FILES
INSERT INTO public.storage_file 
    (id, file_path)
VALUES
    (1, '/courseCoverImages/1.png'),
    (2, '/courseCoverImages/2.png'),
    (3, '/courseCoverImages/3.png'),
    (4, '/courseCoverImages/4.png')

ON CONFLICT (id) DO UPDATE SET 
    file_path = EXCLUDED.file_path;

-- SEED COURSES
INSERT INTO public.course 
    (
        id, 
        title, 
        visibility, 
        category_id, 
        sub_category_id, 
        teacher_id, 
        cover_file_id,
        short_description,
        description,
        difficulty,
        benchmark,
        language,
        technical_requirements,
        skill_benefits,
        human_skill_benefits,
        human_skill_benefits_description
    )
VALUES
    (
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
        'magyar',
        'Windows vagy Mac operacios rendszer, Alma, Barack',
        'Alapvető műveletek elvégzése, Grafikai elemek használata, Grafikonok és diagramok létrehozása, Táblázatok, munkalapok kezelése, Függvényekkel való munkavégzés, Riportok készítése',
        'Egyeduli: 1, Hangos kimondas: 2, Elmeleti: 4, Vizualis alapu: 2, Analitikus: 5, Szocialis: 7, Terbeli elhelyezes: 8, Gyakorlati: 3, Audio alapu: 7, Kreativ: 9',
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
        'magyar',
        'Windows vagy Mac operacios rendszer, Alma, Barack',
        'Megtanulhatsz ezt, Megtanulhatsz azt, Megtanulhatsz amazt',
        'reflex: 1, figyelem: 2',
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
        'magyar',
        'Windows vagy Mac operacios rendszer, Alma, Barack',
        'Megtanulhatsz ezt, Megtanulhatsz azt, Megtanulhatsz amazt',
        'reflex: 1, figyelem: 2',
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
        'magyar',
        'Windows vagy Mac operacios rendszer, Alma, Barack',
        'Megtanulhatsz ezt, Megtanulhatsz azt, Megtanulhatsz amazt',
        'reflex: 1, figyelem: 2',
        ''
    )

ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    category_id = EXCLUDED.category_id,
    sub_category_id = EXCLUDED.sub_category_id, 
    teacher_id = EXCLUDED.teacher_id, 
    cover_file_id = EXCLUDED.cover_file_id;

-- SEED MODULES 
INSERT INTO public.course_module 
    (id, course_id, name, order_index, description)
VALUES
    (2, 1, 'Első modul', 0, 'desc'),
    (3, 2, 'Első modul', 0, 'desc'),
    (4, 3, 'Első modul', 0, 'desc'),
    (5, 4, 'Első modul', 0, 'desc'),
    (6, 4, 'Masodik modul', 1, 'desc')

ON CONFLICT ("id") DO UPDATE SET 
    course_id = EXCLUDED.course_id, 
    name = EXCLUDED.name, 
    order_index = EXCLUDED.order_index, 
    description = EXCLUDED.description;

END;
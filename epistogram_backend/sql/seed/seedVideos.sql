BEGIN;

INSERT INTO public.storage_file
    (id, file_path)
VALUES
    (5, 'videos/video_1.mp4'),
    (6, 'videos/video_2.mp4'),
    (7, 'videos/video_3.m4v'),
    (8, 'videos/video_4.m4v'),
    (9, 'videos/video_5.m4v'),
    (10, 'videos/Excel/video4.mp4'),
    (11, 'videos/Excel/video5.mp4'),
    (12, 'videos/Excel/video6.mp4'),
    (13, 'videos/Excel/video7.mp4'),
    (14, 'videos/Excel/video8.mp4'),
    (15, 'videos/Excel/video9.mp4')
ON CONFLICT ("id") DO UPDATE SET 
    file_path = EXCLUDED.file_path;

INSERT INTO public.video
    (
        id,
        title,
        subtitle,
        description,
        order_index,
        module_id,
        course_id,
        video_file_id,
        length_seconds
    )
VALUES

    -- course 1 / module 1
    (
        1, -- id 
        'Ben Awad Rant 1/1', -- title  
        'Fantastic Video 1', -- subtitle 
        'Very very fantastic video 1 description', -- description
        0, -- order index
        2, -- module id 
        1, -- course id 
        5, -- video_file_id 
        503.669833 -- length
    ),
    (
        2, -- id 
        'Video 1/2', -- title   
        'Fantastic Video 2', -- subtitle 
        'Very very fantastic video 2 description', -- description
        2, -- order index
        2, -- module id 
        1, -- course id 
        NULL, -- video_file_id 
        0 -- length
    ),
    
    -- course 4 / module 1
    (
        3, -- id 
        'Egyszerűbb számítások', -- title   
        'Alapvető műveletek Excelben', -- subtitle 
        'Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.', -- description
        0, -- order index
        5, -- module id 
        4, -- course id 
        6, -- video_file_id 
        358.516667 -- length
    ),
    (
        4, -- id 
        'Cellák és területek azonosítása', -- title   
        'Alapvető műveletek Excelben', -- subtitle 
        'Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.', -- description
        1, -- order index
        5, -- module id 
        4, -- course id 
        7, -- video_file_id 
        187.433333 -- length
    ),
    (
        5, -- id 
        'Adatbevitel, javítás I.', -- title   
        'Alapvető műveletek Excelben', -- subtitle 
        'Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.', -- description
        2, -- order index
        5, -- module id 
        4, -- course id 
        8, -- video_file_id 
        287.4 -- length
    ),
    (
        6, -- id 
        'Adatbevitel, javítás II.', -- title   
        'Alapvető műveletek Excelben', -- subtitle 
        'Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.', -- description
        3, -- order index
        5, -- module id 
        4, -- course id 
        9, -- video_file_id 
        209.4 -- length
    ),

    -- course 4 / module 2
    (
        7, -- id 
        'Egyszerűbb számítások 1.', -- title   
        'Alapvető műveletek Excelben', -- subtitle 
        'Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.', -- description
        0, -- order index
        6, -- module id 
        4, -- course id 
        12, -- video_file_id 
        464.066667 -- length
    ),
    (
        8, -- id 
        'Egyszerűbb számítások 2.', -- title   
        'Alapvető műveletek Excelben', -- subtitle 
        'Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.', -- description
        1, -- order index
        6, -- module id 
        4, -- course id 
        10, -- video_file_id 
        317.3 -- length
    ),
    (
        9, -- id 
        'Egyszerűbb számítások 4.', -- title   
        'Fix hivatkozás', -- subtitle 
        'Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.', -- description
        2, -- order index
        6, -- module id 
        4, -- course id 
        11, -- video_file_id 
        290.066667 -- length
    ),
    (
        10, -- id 
        'Gyakorló feladatok 1.', -- title   
        'valami', -- subtitle 
        'Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.', -- description
        3, -- order index
        6, -- module id 
        4, -- course id 
        13, -- video_file_id 
        345.833333 -- length
    ),
    (
        11, -- id 
        'Gyakorló feladatok 2.', -- title   
        'valami', -- subtitle 
        'Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.', -- description
        4, -- order index
        6, -- module id 
        4, -- course id 
        14, -- video_file_id 
        167.666667 -- length
    ),
    (
        12, -- id 
        'Gyakorló feladatok 3.', -- title   
        'valami', -- subtitle 
        'Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.', -- description
        5, -- order index
        6, -- module id 
        4, -- course id 
        15, -- video_file_id 
        420.3 -- length
    )
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    order_index = EXCLUDED.order_index,
    module_id = EXCLUDED.module_id,
    course_id = EXCLUDED.course_id,
    video_file_id = EXCLUDED.video_file_id,
    length_seconds = EXCLUDED.length_seconds;

END;
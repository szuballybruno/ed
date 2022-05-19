-- SEED EXAMS
INSERT INTO public.exam 
    (
        id,
        title,
        subtitle,
        description,
        thumbnail_url,
        order_index,
        type,
        retake_limit,
        course_id,
        module_id)
VALUES
(8, 'Első lépések témazáró', '', NULL, NULL, 15, 'normal', NULL, 4, 2),
(9, 'Ismerkedés a függvényekkel témazáró', '', NULL, NULL, 25, 'normal', NULL, 4, 2),
(10, 'OBS Studio témazáró', 'Nézzük át még egyszer az alapokat', NULL, NULL, 1, 'normal', NULL, 17, 8),
(15, 'Leggyakoribb függvények és azok használata témazáró', '', NULL, NULL, 15, 'normal', 3, 27, 38),
(16, 'Segítség az adatkezelésben témazáró', '', NULL, NULL, 11, 'normal', 3, 27, 39),
(17, 'Formázás felsőfokon témazáró', '', NULL, NULL, 12, 'normal', 3, 27, 41),
(18, 'Munka nagy mennyiségű adattal témazáró', '', NULL, NULL, 17, 'normal', 3, 27, 42),
(20, 'Microsoft Excel Alapok kurzuszáró vizsga', '', NULL, NULL, 118, 'final', 3, 27, 44),
(21, 'Első lépések témazáró', '', NULL, NULL, 18, 'normal', 3, 28, 45),
(12, 'Első lépések témazáró', '', NULL, NULL, 14, 'normal', 3, 27, 35),
(13, 'Ismerkedés a függvényekkel témazáró', '', NULL, NULL, 9, 'normal', 3, 27, 36),
(14, 'A formázás alapjai témazáró', '', NULL, NULL, 16, 'normal', 3, 27, 37),
(22, 'Formázás - Hogyan készíthetünk letisztult dokumentumokat? témazáró', '', NULL, NULL, 29, 'normal', 3, 28, 47),
(23, 'Gyorsabb munka a gyakorlatban témazáró', '', NULL, NULL, 17, 'normal', 3, 28, 48),
(24, 'Szövegírás, elrendezés, ellenőrzés témazáró', '', NULL, NULL, 18, 'normal', 3, 28, 50),
(25, 'Képek, vizuális eszközök használata témazáró', '', NULL, NULL, 18, 'normal', 3, 28, 51),
(26, 'Microsoft Word Alapok kurzus záróvizsga', '', NULL, NULL, 123, 'final', 3, 28, 53),
(27, 'Első lépések témazáró', '', NULL, NULL, 25, 'normal', 3, 22, 54),
(28, 'Szöveg és tartalom formázása témazáró', '', NULL, NULL, 13, 'normal', 3, 22, 55),
(29, 'Képek, vizuális eszközök használata témazáró', '', NULL, NULL, 19, 'normal', 3, 22, 56),
(30, 'Videók és hanganyagok használata a PowerPointon belül témazáró', '', NULL, NULL, 5, 'normal', 3, 22, 57),
(31, 'Prezentáció rendszerezése, segítség az előadás során témazáró', '', NULL, NULL, 12, 'normal', 3, 22, 58),
(32, ' Microsoft PowerPoint Alapok kurzus záróvizsga', '', NULL, NULL, 4, 'final', 1, 22, 60);
    
-- SEED PRETEST EXAMS
INSERT INTO public.exam 
    (id, course_id, title, subtitle, description, order_index, module_id, type)
VALUES
    (33, 4, 'Pretest exam course 1', 'Pretest exam course 1 desc', '', 0, NULL, 'pretest'),
    (34, 10, 'Pretest exam course 10', 'Pretest exam course 10 desc', '', 0, NULL, 'pretest'),
    (35, 23, 'Pretest exam course 23', 'Pretest exam course 23 desc', '', 0, NULL, 'pretest'),
    (36, 24, 'Pretest exam course 24', 'Pretest exam course 24 desc', '', 0, NULL, 'pretest'),
    (37, 26, 'Pretest exam course 26', 'Pretest exam course 26 desc', '', 0, NULL, 'pretest'),
    (38, 25, 'Pretest exam course 25', 'Pretest exam course 25 desc', '', 0, NULL, 'pretest'),
    (39, 28, 'Word', 'Kezdés', '', 0, NULL, 'pretest'),
    (40, 17, 'OBS', 'Kezdés', '', 0, NULL, 'pretest'),
    (41, 22, 'PowerPoint', 'Kezdés', '', 0, NULL, 'pretest'),
    (42, 29, 'Pretest exam course 29', 'Pretest exam course 29 desc', '', 0, NULL, 'pretest'),
    (43, 27, 'Microsoft Excel szintfelmérő vizsga', 'Most kiderítjük, hogy megy neked az Excel, majd ez alapján személyre szabjuk számodra a kurzust.', '', 0, NULL, 'pretest');

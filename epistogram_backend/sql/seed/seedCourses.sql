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
    (id, title, visibility, category_id, sub_category_id, teacher_id, cover_file_id)
VALUES
    (1, 'Webfejlesztés kezdőknek (HTML, CSS, BOOTSTRAP)', DEFAULT, 1, 2, 1, 1),
    (2, 'Java programozás mesterkurzus', 'private', 1, 3, 1, 2),
    (3, 'Angular - Minden amire szükséged lehet', DEFAULT, 1, 4, 1, 3),
    (4, 'Microsoft Excel Mesterkurzus', DEFAULT, 1, 5, 1, 4)

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
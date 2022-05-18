BEGIN;

-- SEED PARENT CATEGORIES
INSERT INTO public.course_category
    (
        id,
        name
    )
VALUES
    (
        1,
        'IT'
    )
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name;

    
-- SEED CHILD CATEGORIES
INSERT INTO public.course_category
    (
        id,
        name,
        parent_category_id
    )
VALUES
    (
        2,
        'Hálózatok',
        1
    ),
    (
        3,
        'Szoftverfejlesztés',
        1
    ),
    (
        4,
        'E-Commerce',
        1
    ),
    (
        5,
        'Irodai alkalmazások',
        1
    ),
    (
        6,
        'Általános IT',
        1
    ),
    (
        7,
        'Biztonság',
        1
    ),
    (
        8,
        'Önfejlesztés',
        1
    ),
    (
        9,
        'Média',
        1
    ),
    (
        10,
        'Marketing',
        1
    )
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name;

END;
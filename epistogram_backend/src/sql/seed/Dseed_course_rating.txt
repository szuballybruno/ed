
-- GROUPS
INSERT INTO public.course_rating_group 
(
    id, 
    name
)
VALUES 
(
    1,
    'Elégedettség az oktatóval'
),
(
    2,
    'A videók értékelése'
),
(
    3,
    'Kérdések, tesztek értékelése'
),
(
    4,
    'Kurzus szöveges értékelése'
);

-- QUESTIONS
INSERT INTO public.course_rating_question 
(
    id, 
    text,
    course_rating_group_id,
    type
)
VALUES 

-- g1
(
    1,
    'Előadásmód',
    1,
    'rating_stars'
),
(
    2,
    'Tartalom',
    1,
    'rating_stars'
),
(
    3,
    'Megérthetőség',
    1,
    'rating_stars'
),

-- g2
(
    4,
    'Az információk jól láthatóak voltak',
    2,
    'range_1_10'
),
(
    5,
    'Az információk jól hallhatóak voltak',
    2,
    'range_1_10'
),

-- g3
(
    6,
    'Mennyire voltak zavaróak a videó közben feltett kérdések számodra?',
    3,
    'range_1_10'
),
(
    7,
    'Érzésed szerint a feltett kérdések segítettek elmélyíteni a tudást?',
    3,
    'range_1_10'
),
(
    8,
    'Hogyan értékelnéd a vizsgák nehézségét? Kihívást jelentett-e számodra, vagy érdemes lenne nehezebb kérdéseket feltennünk?',
    3,
    'range_1_10'
),

-- g4
(
    9,
    'Írd le a véleményed a kurzusról!',
    4,
    'free_text'
);

--
-- QUESTIONS 
--
INSERT INTO public.prequiz_question 
(
    id, 
    text,
    is_numeric_answer
)
VALUES 
(
    1,
    'Tapasztalat szinted?',
    true
),
(
    2,
    'Mire szeretnéd használni a kurzuson tanultakat?',
    false
),
(
    3,
    'Mennyi időt tudsz naponta rászánni egyszerre?',
    false
),
(
    4,
    'Mennyi időt tudsz hetente rászánni?',
    false
);

--
-- ANSWERS 
--
INSERT INTO public.prequiz_answer
(
    id, 
    text,
    question_id,
    value
)
VALUES 

-- question 2
(
    1,
    'A munkámban van szükségem rá',
    2,
    NULL
),
(
    2,
    'Arra, hogy a segítségével feljebb léphessek, jobb munkát találhassak',
    2,
    NULL
),
(
    3,
    'A személyes fejlődésem miatt szeretném elsajátítani',
    2,
    NULL
),
(
    4,
    'Csak szeretnék valami újat tanulni, a tanulás öröme motivál',
    2,
    NULL
),

-- question 3
(
    5,
    'Maximum 30 percet',
    3,
    NULL
),
(
    6,
    '30-60 percet',
    3,
    NULL
),
(
    7,
    '60-90 percet',
    3,
    NULL
),
(
    8,
    'Több, mint 90 percet',
    3,
    NULL
),

-- question 4
(
    9,
    '1-2 óra',
    4,
    1.5
),
(
    10,
    '3-4 óra',
    4,
    3.5
),
(
    11,
    '5-6 óra',
    4,
    5.5
),
(
    12,
    'Több, mint 6 óra',
    4,
    7
)
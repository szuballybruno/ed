
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
    question_id
)
VALUES 

-- question 2
(
    1,
    'A munkámban van szükségem rá',
    2
),
(
    2,
    'Arra, hogy a segítségével feljebb léphessek, jobb munkát találhassak',
    2
),
(
    3,
    'A személyes fejlődésem miatt szeretném elsajátítani',
    2
),
(
    4,
    'Csak szeretnék valami újat tanulni, a tanulás öröme motivál',
    2
),

-- question 3
(
    5,
    'Maximum 30 percet',
    3
),
(
    6,
    '30-60 percet',
    3
),
(
    7,
    '60-90 percet',
    3
),
(
    8,
    'Több, mint 90 percet',
    3
),

-- question 4
(
    9,
    '1-2 óra',
    4
),
(
    10,
    '3-4 óra',
    4
),
(
    11,
    '5-6 óra',
    4
),
(
    12,
    'Több, mint 6 óra',
    4
)
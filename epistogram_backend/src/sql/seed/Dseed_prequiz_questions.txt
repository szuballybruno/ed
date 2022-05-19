
--
-- QUESTIONS 
--
INSERT INTO public.prequiz_question 
(
    id, 
    text,
    is_numeric_answer,
    min_value,
    max_value,
    step_value,
    min_label,
    max_label,
    value_postfix
)
VALUES 
(
    1,
    'Tapasztalat szinted?',
    true,
    1,
    10,
    1,
    'Nem érzem tapasztaltnak magam',
    'Tapasztaltnak érzem magam',
    NULL
),
(
    2,
    'Mire szeretnéd használni a kurzuson tanultakat?',
    false,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
),
(
    3,
    'Mennyi időt tudsz hetente rászánni?',
    true,
    1,
    10,
    1,
    'Kevesebb időt tudok tanulással tölteni',
    'Több időt tudok tanulással tölteni',
    'óra'
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
)
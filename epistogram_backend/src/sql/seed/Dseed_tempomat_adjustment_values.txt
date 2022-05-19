

INSERT INTO public.tempomat_adjustment_value
(
    id,
    min_value,
    max_value,
    prequiz_answer_id,
    tempomat_mode
)
VALUES

    -- AUTO

    -- 1: 'A munkámban van szükségem rá'
    (
        1, -- id
        20, -- min_value,
        60, -- max_value
        1, -- prequiz_answer_id
        'auto' -- tempomat_mode 
    ),

    -- 2: 'Arra, hogy a segítségével feljebb léphessek, jobb munkát találhassak'
    (
        2, -- id
        15, -- min_value,
        50, -- max_value
        2, -- prequiz_answer_id
        'auto' -- tempomat_mode 
    ),

    -- 3: 'A személyes fejlődésem miatt szeretném elsajátítani'
    (
        3, -- id
        10, -- min_value,
        40, -- max_value
        3, -- prequiz_answer_id
        'auto' -- tempomat_mode 
    ),

    -- 4: 'Csak szeretnék valami újat tanulni, a tanulás öröme motivál'
    (
        4, -- id
        5, -- min_value,
        25, -- max_value
        4, -- prequiz_answer_id
        'auto' -- tempomat_mode 
    ),

    -- BALANCED

    -- 1: 'A munkámban van szükségem rá'
    (
        5, -- id
        10, -- min_value,
        40, -- max_value
        1, -- prequiz_answer_id
        'balanced' -- tempomat_mode 
    ),

    -- 2: 'Arra, hogy a segítségével feljebb léphessek, jobb munkát találhassak'
    (
        6, -- id
        5, -- min_value,
        30, -- max_value
        2, -- prequiz_answer_id
        'balanced' -- tempomat_mode 
    ),

    -- 3: 'A személyes fejlődésem miatt szeretném elsajátítani'
    (
        7, -- id
        0, -- min_value,
        20, -- max_value
        3, -- prequiz_answer_id
        'balanced' -- tempomat_mode 
    ),

    -- 4: 'Csak szeretnék valami újat tanulni, a tanulás öröme motivál'
    (
        8, -- id
        0, -- min_value,
        15, -- max_value
        4, -- prequiz_answer_id
        'balanced' -- tempomat_mode 
    )
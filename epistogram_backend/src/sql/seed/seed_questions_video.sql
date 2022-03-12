INSERT INTO public.question
(
    id,
    question_text, 
    show_up_time_seconds, 
    video_id 
) 
VALUES 
    (36, 'Hogy lehet e legyegyszerűbben a munkalapon a X789654-es cellához jutni?', 101, 60), 
    (37, 'Hogy érem el, hogy az Excel a Pí szám 15 számjegyű értékével számoljon?', 110, 60),

    -- video 1
    (38, 'Question 1', 100, 54),
    (39, 'Question 2', 150, 54),
    (40, 'Question 3', 200, 54),
    (41, 'Question 4', 250, 54),
    (42, 'Question 5', 300, 54);

INSERT INTO public.answer
    (text, is_correct, question_id) 
VALUES 
    ('Odagörgetek!', false, 36), 
    ('A szerkesztőlécbe beírom, hogy X789654, majd entert nyomok.', false, 36), 
    ('A név mezőbe (bal oldal) beírom, hogy X789654, majd entert nyomok.', true, 36), 
    ('Az A1 cellába beírom, hogy X789654, majd entert nyomok.', false, 36), 

    ('A számításban a \"Pi()\"-t használom.', true, 37), 
    ('A szerkesztőlécen a számításban a \"Pi()\"-t használom.', true, 37), 
    ('A Pi-t használom.', false, 37), 
    ('3,141592653589', false, 37),

    ('Video answer 1', false, 38), 
    ('Video answer 2 - c', true, 38), 
    ('Video answer 3', false, 38),

    ('Video answer 1', false, 39), 
    ('Video answer 2', false, 39), 
    ('Video answer 3 - c', true, 39),

    ('Video answer 1', false, 40), 
    ('Video answer 2', false, 40), 
    ('Video answer 3 - c', true, 40),

    ('Video answer 1', false, 41), 
    ('Video answer 2', false, 41), 
    ('Video answer 3 - c', true, 41),

    ('Video answer 1', false, 42), 
    ('Video answer 2', false, 42), 
    ('Video answer 3 - c', true, 42);
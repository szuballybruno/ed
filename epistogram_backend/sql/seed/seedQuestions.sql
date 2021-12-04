INSERT INTO public.question
(
    id,
    question_text, 
    show_up_time_seconds, 
    video_id 
) 
VALUES 
    (36, 'Hogy lehet e legyegyszerűbben a munkalapon a X789654-es cellához jutni?', 101, 4), 
    (37, 'Hogy érem el, hogy az Excel a Pí szám 15 számjegyű értékével számoljon?', 110, 8),
    (38, 'What are some random fun facts about you?', 250, 1),
    (39, 'Whats Something You Want to Learn or Wish You Were Better At?', 400, 1);

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
    ('Video answer 2', true, 38), 
    ('Video answer 3', false, 38),

    ('Video answer 1', false, 39), 
    ('Video answer 2', false, 39), 
    ('Video answer 3', true, 39);
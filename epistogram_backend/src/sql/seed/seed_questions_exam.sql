INSERT INTO public.question
(
    id,
    question_text, 
    exam_id,
    type_id
) 
VALUES 
    (60, 'Exam question 1', 2, 2), 
    (61, 'Exam question 2', 2, 1),
    (62, 'Exam question 3', 2, 1),
    (63, 'Excel filal exam / question 1?', 5, 1),
    
    -- pretest exam #6 questions 
    (64, 'Pretest question 1', 6, 1),
    (65, 'Pretest question 2', 6, 1),
    (66, 'Pretest question 3', 6, 1),

    -- pretest exam #7 questions
    (67, 'Pretest question 3', 7, 1),
    (68, 'Pretest question 3', 7, 1),
    (69, 'Pretest question 3', 7, 1),

    -- pretest exam #8 questions
    (70, 'Pretest question 1', 8, 1),
    (71, 'Pretest question 2', 8, 1),
    (72, 'Pretest question 3', 8, 1),

    -- pretest exam #9 questions
    (73, 'Pretest question 1', 9, 1),
    (74, 'Pretest question 2', 9, 1),
    (75, 'Pretest question 3', 9, 1),
    
    -- pretest exam #10 questions
    (76, 'Pretest question 1', 10, 1),
    (77, 'Pretest question 2', 10, 1),
    (78, 'Pretest question 3', 10, 1),

    -- pretest exam #11  questions
    (79, 'Pretest question 1', 11, 1),
    (80, 'Pretest question 2', 11, 1),
    (81, 'Pretest question 3', 11, 1),

    -- pretest exam #12 questions
    (82, 'Pretest question 1', 12, 1),
    (83, 'Pretest question 2', 12, 1),
    (84, 'Pretest question 3', 12, 1),

    -- pretest exam #13 questions
    (85, 'Pretest question 1', 13, 1),
    (86, 'Pretest question 2', 13, 1),
    (87, 'Pretest question 3', 13, 1),

    -- pretest exam #14 questions
    (88, 'Pretest question 1', 14, 1),
    (89, 'Pretest question 2', 14, 1),
    (90, 'Pretest question 3', 14, 1),

    -- pretest exam #15 questions
    (91, 'Pretest question 1', 15, 1),
    (92, 'Pretest question 2', 15, 1),
    (93, 'Pretest question 3', 15, 1),

    -- pretest exam #16 questions
    (94, 'Pretest question 1', 16, 1),
    (95, 'Pretest question 2', 16, 1),
    (96, 'Pretest question 3', 16, 1);

INSERT INTO public.answer
    (text, is_correct, question_id) 
VALUES 
    ('Exam answer 1 - c', true, 60), 
    ('Exam answer 2 - c', true, 60), 
    ('Exam answer 3', false, 60),

    ('Exam answer 1', false, 61), 
    ('Exam answer 2 - c', true, 61), 
    ('Exam answer 3', false, 61),

    ('Exam answer 1', false, 62), 
    ('Exam answer 2', false, 62), 
    ('Exam answer 3 - c', true, 62),

    ('Exam answer 1', false, 63), 
    ('Exam answer 2', false, 63), 
    ('Exam answer 3 - c', true, 63),

    ('Prequiz q 1 - answer 1', false, 64), 
    ('Prequiz q 1 - answer 2', false, 64), 
    ('Prequiz q 1 - answer 3', true, 64),

    ('Prequiz q 1 - answer 1', false, 65), 
    ('Prequiz q 2 - answer 2', false, 65), 
    ('Prequiz q 3 - answer 3', true, 65),

    ('Prequiz q 1 - answer 1', false, 66), 
    ('Prequiz q 2 - answer 2', false, 66), 
    ('Prequiz q 3 - answer 3', true, 66),

    ('Prequiz q 1 - answer 1', false, 67), 
    ('Prequiz q 2 - answer 2', false, 67), 
    ('Prequiz q 3 - answer 3', true, 67),

    ('Prequiz q 1 - answer 1', false, 68), 
    ('Prequiz q 2 - answer 2', false, 68), 
    ('Prequiz q 3 - answer 3', true, 68),

    ('Prequiz q 1 - answer 1', false, 69), 
    ('Prequiz q 2 - answer 2', false, 69), 
    ('Prequiz q 3 - answer 3', true, 69),

    ('Prequiz q 1 - answer 1', false, 70), 
    ('Prequiz q 2 - answer 2', false, 70), 
    ('Prequiz q 3 - answer 3', true, 70),

    ('Prequiz q 1 - answer 1', false, 71), 
    ('Prequiz q 2 - answer 2', false, 71), 
    ('Prequiz q 3 - answer 3', true, 71),

    ('Prequiz q 1 - answer 1', false, 72), 
    ('Prequiz q 2 - answer 2', false, 72), 
    ('Prequiz q 3 - answer 3', true, 72),

    ('Prequiz q 1 - answer 1', false, 73), 
    ('Prequiz q 2 - answer 2', false, 73), 
    ('Prequiz q 3 - answer 3', true, 73),

    ('Prequiz q 1 - answer 1', false, 74), 
    ('Prequiz q 2 - answer 2', false, 74), 
    ('Prequiz q 3 - answer 3', true, 74),

    ('Prequiz q 1 - answer 1', false, 75), 
    ('Prequiz q 2 - answer 2', false, 75), 
    ('Prequiz q 3 - answer 3', true, 75),

    ('Prequiz q 1 - answer 1', false, 76), 
    ('Prequiz q 2 - answer 2', false, 76), 
    ('Prequiz q 3 - answer 3', true, 76),

    ('Prequiz q 1 - answer 1', false, 77), 
    ('Prequiz q 2 - answer 2', false, 77), 
    ('Prequiz q 3 - answer 3', true, 77),

    ('Prequiz q 1 - answer 1', false, 78), 
    ('Prequiz q 2 - answer 2', false, 78), 
    ('Prequiz q 3 - answer 3', true, 78),

    ('Prequiz q 1 - answer 1', false, 79), 
    ('Prequiz q 2 - answer 2', false, 79), 
    ('Prequiz q 3 - answer 3', true, 79),

    ('Prequiz q 1 - answer 1', false, 80), 
    ('Prequiz q 2 - answer 2', false, 80), 
    ('Prequiz q 3 - answer 3', true, 80),

    ('Prequiz q 1 - answer 1', false, 81), 
    ('Prequiz q 2 - answer 2', false, 81), 
    ('Prequiz q 3 - answer 3', true, 81),

    ('Prequiz q 1 - answer 1', false, 82), 
    ('Prequiz q 2 - answer 2', false, 82), 
    ('Prequiz q 3 - answer 3', true, 82),

    ('Prequiz q 1 - answer 1', false, 83), 
    ('Prequiz q 2 - answer 2', false, 83), 
    ('Prequiz q 3 - answer 3', true, 83),

    ('Prequiz q 1 - answer 1', false, 84), 
    ('Prequiz q 2 - answer 2', false, 84), 
    ('Prequiz q 3 - answer 3', true, 84),

    ('Prequiz q 1 - answer 1', false, 85), 
    ('Prequiz q 2 - answer 2', false, 85), 
    ('Prequiz q 3 - answer 3', true, 85),

    ('Prequiz q 1 - answer 1', false, 86), 
    ('Prequiz q 2 - answer 2', false, 86), 
    ('Prequiz q 3 - answer 3', true, 86),

    ('Prequiz q 1 - answer 1', false, 87), 
    ('Prequiz q 2 - answer 2', false, 87), 
    ('Prequiz q 3 - answer 3', true, 87),

    ('Prequiz q 1 - answer 1', false, 88), 
    ('Prequiz q 2 - answer 2', false, 88), 
    ('Prequiz q 3 - answer 3', true, 88),

    ('Prequiz q 1 - answer 1', false, 89), 
    ('Prequiz q 2 - answer 2', false, 89), 
    ('Prequiz q 3 - answer 3', true, 89),

    ('Prequiz q 1 - answer 1', false, 90), 
    ('Prequiz q 2 - answer 2', false, 90), 
    ('Prequiz q 3 - answer 3', true, 90),

    ('Prequiz q 1 - answer 1', false, 91), 
    ('Prequiz q 2 - answer 2', false, 91), 
    ('Prequiz q 3 - answer 3', true, 91),

    ('Prequiz q 1 - answer 1', false, 92), 
    ('Prequiz q 2 - answer 2', false, 92), 
    ('Prequiz q 3 - answer 3', true, 92),

    ('Prequiz q 1 - answer 1', false, 93), 
    ('Prequiz q 2 - answer 2', false, 93), 
    ('Prequiz q 3 - answer 3', true, 93),

    ('Prequiz q 1 - answer 1', false, 94), 
    ('Prequiz q 2 - answer 2', false, 94), 
    ('Prequiz q 3 - answer 3', true, 94),

    ('Prequiz q 1 - answer 1', false, 95), 
    ('Prequiz q 2 - answer 2', false, 95), 
    ('Prequiz q 3 - answer 3', true, 95),

    ('Prequiz q 1 - answer 1', false, 96), 
    ('Prequiz q 2 - answer 2', false, 96), 
    ('Prequiz q 3 - answer 3', true, 96);
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
    (63, 'Excel filal exam / question 1?', 5, 1);

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
    ('Exam answer 3 - c', true, 63);
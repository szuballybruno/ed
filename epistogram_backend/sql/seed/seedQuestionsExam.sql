INSERT INTO public.question
(
    id,
    question_text, 
    exam_id 
) 
VALUES 
    (40, 'Exam question 1', 2), 
    (41, 'Exam question 2', 2),
    (42, 'Exam question 3', 2),
    (43, 'Excel filal exam / question 1?', 5);

INSERT INTO public.answer
    (text, is_correct, question_id) 
VALUES 
    ('Exam answer 1 - c', true, 40), 
    ('Exam answer 2 - c', true, 40), 
    ('Exam answer 3', false, 40),

    ('Exam answer 1', false, 41), 
    ('Exam answer 2 - c', true, 41), 
    ('Exam answer 3', false, 41),

    ('Exam answer 1', false, 42), 
    ('Exam answer 2', false, 42), 
    ('Exam answer 3 - c', true, 42),

    ('Exam answer 1', false, 43), 
    ('Exam answer 2', false, 43), 
    ('Exam answer 3 - c', true, 43);
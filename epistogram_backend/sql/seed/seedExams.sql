-- SEED EXAMS
INSERT INTO public.exam 
    (id, course_id, title, subtitle, description, order_index, module_id, type)
VALUES
    (2, 1, 'New Exam 1', 'Fantastic exam 1', '', 1, 2, 'normal'),
    (3, 1, 'New Exam 2', 'Fantastic exam 2', '', 3, 2, 'normal'),
    (4, 1, 'New Exam 3', 'Fantastic exam 3', '', 4, 2, 'final'),
    (5, 4, 'Excel Final Exam', 'Fantastic Final Exam', '', 6, 6, 'final');
    
-- SEED PRETEST EXAMS
INSERT INTO public.exam 
    (id, course_id, title, subtitle, description, order_index, module_id, type)
VALUES
    (6, 1, 'Pretest exam course 1', 'Pretest exam course 1 desc', '', 0, NULL, 'pretest')

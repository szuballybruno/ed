-- SEED EXAMS
INSERT INTO public.exam 
    (id, course_id, title, subtitle, description, order_index, module_id, type)
VALUES
    (2, 4, 'New Exam 1', 'Fantastic exam 1', '', 1, 2, 'normal'),
    (3, 4, 'New Exam 2', 'Fantastic exam 2', '', 3, 2, 'normal'),
    (4, 4, 'New Exam 3', 'Fantastic exam 3', '', 4, 2, 'final'),
    (5, 10, 'Excel Final Exam', 'Fantastic Final Exam', '', 6, 7, 'final');
    
-- SEED PRETEST EXAMS
INSERT INTO public.exam 
    (id, course_id, title, subtitle, description, order_index, module_id, type)
VALUES
    (6, 4, 'Pretest exam course 1', 'Pretest exam course 1 desc', '', 0, NULL, 'pretest'),
    (7, 10, 'Pretest exam course 10', 'Pretest exam course 10 desc', '', 0, NULL, 'pretest'),
    (8, 23, 'Pretest exam course 23', 'Pretest exam course 23 desc', '', 0, NULL, 'pretest'),
    (9, 24, 'Pretest exam course 24', 'Pretest exam course 24 desc', '', 0, NULL, 'pretest'),
    (10, 26, 'Pretest exam course 26', 'Pretest exam course 26 desc', '', 0, NULL, 'pretest'),
    (11, 25, 'Pretest exam course 25', 'Pretest exam course 25 desc', '', 0, NULL, 'pretest'),
    (12, 28, 'Pretest exam course 28', 'Pretest exam course 28 desc', '', 0, NULL, 'pretest'),
    (13, 17, 'Pretest exam course 17', 'Pretest exam course 17 desc', '', 0, NULL, 'pretest'),
    (14, 22, 'Pretest exam course 22', 'Pretest exam course 22 desc', '', 0, NULL, 'pretest'),
    (15, 29, 'Pretest exam course 29', 'Pretest exam course 29 desc', '', 0, NULL, 'pretest'),
    (16, 27, 'Pretest exam course 27', 'Pretest exam course 27 desc', '', 0, NULL, 'pretest');

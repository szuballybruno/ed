BEGIN;

-- SEED COVER FILES
INSERT INTO public.exam 
    (id, course_id, title, subtitle, description, order_index, module_id, is_final_exam)
VALUES
    (2, 1, 'New Exam 1', 'Fantastic exam 1', '', 1, 2, false),
    (3, 1, 'New Exam 2', 'Fantastic exam 2', '', 2, 2, false),
    (4, 1, 'New Exam 3', 'Fantastic exam 3', '', 4, 2, true),
    (5, 4, 'Excel Final Exam', 'Fantastic Final Exam', '', 5, 6, true)

ON CONFLICT (id) DO UPDATE SET 
    course_id = EXCLUDED.course_id, 
    title = EXCLUDED.title, 
    subtitle = EXCLUDED.subtitle, 
    description = EXCLUDED.description, 
    order_index = EXCLUDED.order_index, 
    module_id = EXCLUDED.module_id, 
    is_final_exam = EXCLUDED.is_final_exam;

END;
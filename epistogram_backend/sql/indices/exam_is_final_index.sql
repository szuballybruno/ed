CREATE UNIQUE INDEX exam_is_final_index 
ON public.exam (is_final_exam, course_id) 
WHERE is_final_exam = true;
CREATE UNIQUE INDEX exam_final_type_index 
ON public.exam (type, course_id) 
WHERE type = 'final';
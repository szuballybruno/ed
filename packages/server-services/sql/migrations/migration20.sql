UPDATE public.user_course_bridge
SET tempomat_mode = 'strict'
WHERE tempomat_mode = 'balanced'
OR tempomat_mode = 'auto'
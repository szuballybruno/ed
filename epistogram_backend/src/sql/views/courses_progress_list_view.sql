SELECT acv.*
FROM public.available_course_view acv
WHERE acv.is_completed = true
OR acv.is_started = true
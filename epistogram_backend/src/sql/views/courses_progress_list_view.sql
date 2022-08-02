SELECT clsv.*
FROM public.course_learning_stats_view clsv
WHERE clsv.is_completed = true
OR clsv.is_started = true
WITH 
grouped_cte AS 
(
	SELECT 
		umpv.user_id,
		umpv.course_id,
		COUNT(umpv.given_answer_count)::int given_answer_count,
		SUM(umpv.summarized_max_score)::int summarized_max_score,
		SUM(umpv.summarized_score)::int summarized_score
	FROM public.user_module_performance_view umpv
	GROUP BY
		umpv.user_id,
		umpv.course_id
)
SELECT 
	gc.*,
	ROUND(gc.summarized_score::double precision / gc.summarized_max_score * 100) performance_percentage
FROM grouped_cte gc
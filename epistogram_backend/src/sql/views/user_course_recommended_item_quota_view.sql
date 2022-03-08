SELECT 
	ucb.user_id,
	ucb.course_id,
	ucccv.previsioned_items_per_day recommended_items_per_day,
	LEAST (cicv.item_count, ucccv.previsioned_items_per_day * 7) recommended_items_per_week
FROM public.user_course_bridge ucb

LEFT JOIN public.course_item_count_view cicv
ON cicv.course_id = ucb.course_id

LEFT JOIN public.user_course_completion_current_view ucccv
ON ucccv.course_id = ucb.course_id 
	AND ucccv.user_id = ucb.user_id 
SELECT 
	ucb.user_id,
	ucb.course_id,
	ucb.recommended_items_per_day,
	LEAST (cicv.item_count, ucb.recommended_items_per_day * 7) recommended_items_per_week
FROM public.user_course_bridge ucb

LEFT JOIN public.course_item_count_view cicv
ON cicv.course_id = ucb.course_id
SELECT 
	sq.*,
	-- state
	CASE WHEN sq.is_current
		THEN 'current'
		ELSE CASE WHEN sq.is_completed
			THEN 'completed'
			ELSE CASE WHEN sq.course_mode = 'advanced' OR (sq.item_order_index = 0 AND sq.module_order_index = 0) 
				THEN 'available'
				ELSE CASE WHEN LAG(sq.is_completed, 1) OVER (PARTITION BY sq.course_id) IS NOT DISTINCT FROM true 
					THEN 'available'
					ELSE 'locked'
				END 
			END 
		END
	END state
FROM 
(
	SELECT 
		civ.*,
		u.id user_id,
		(vcv.is_completed OR ecv.has_successful_session) IS NOT DISTINCT FROM true is_completed,
		ucb.course_mode course_mode,
		ucb.current_item_code = civ.item_code IS NOT DISTINCT FROM true is_current,
		ucb.current_item_code = civ.module_code IS NOT DISTINCT FROM true is_module_current
	FROM public.course_item_view civ

	LEFT JOIN public.user u
	ON 1 = 1

	LEFT JOIN public.video_completed_view vcv
	ON vcv.video_id = civ.video_id
		AND vcv.user_id = u.id

	LEFT JOIN public.exam_completed_view ecv
	ON ecv.exam_id = civ.exam_id
		AND ecv.user_id = u.id

	LEFT JOIN public.user_course_bridge ucb
	ON ucb.user_id = u.id
		AND ucb.course_id = civ.course_id
	
	ORDER BY
		user_id,
		course_id,
		module_order_index,
		item_order_index
) sq
	
ORDER BY
	user_id,
	course_id,
	module_order_index,
	item_order_index
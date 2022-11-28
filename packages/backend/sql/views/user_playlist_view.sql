WITH 
items_with_user_cte AS
(
	SELECT 
		ucb.user_id,
		ucb.course_id,
        ucb.current_item_code = plv.module_code module_is_current,
        ucb.current_item_code = plv.playlist_item_code item_is_current,
		ucb.course_mode,
		plv.module_order_index,
		plv.item_order_index,
		plv.video_version_id,
		plv.exam_version_id,
		plv.item_title,
		plv.course_version_id,
		plv.video_id,
		plv.exam_id,
		plv.module_version_id,
		plv.module_id,
		plv.module_name,
		plv.module_code,
		plv.item_type,
		plv.item_subtitle,
		plv.playlist_item_code,
		plv.video_audio_text,
		plv.item_order_index = 0 AND plv.module_order_index = 1 is_first_item,
		esv.score_percentage,
        uprv.is_recommended_for_practise IS TRUE is_recommended_for_practise,
		COALESCE(vc.completion_date, ec.completion_date) completion_date
	FROM public.playlist_view plv
	
	LEFT JOIN public.course_version cv 
	ON cv.id = plv.course_version_id
	
	INNER JOIN public.user_course_bridge ucb
	ON ucb.course_id = cv.course_id

	LEFT JOIN public.exam_highest_score_answer_session_view ehsasv
	ON ehsasv.exam_id = plv.exam_id
	AND ehsasv.user_id = ucb.user_id
	
	LEFT JOIN public.exam_score_view esv
	ON esv.answer_session_id = ehsasv.answer_session_id
	
	LEFT JOIN public.video_completion vc
	ON vc.video_version_id = plv.video_version_id
	AND vc.user_id = ucb.user_id
	
	LEFT JOIN public.exam_completion ec
	ON ec.answer_session_id = ehsasv.answer_session_id

    LEFT JOIN public.user_practise_recommendation_view uprv
    ON uprv.video_version_id = plv.video_version_id
    AND uprv.user_id = ucb.user_id
),
items_with_state_cte AS
(
	SELECT 
		iwuc.*,
		-- state
		CASE 
			WHEN iwuc.item_is_current
				THEN 'current'
			WHEN iwuc.completion_date IS NOT NULL
				THEN 'completed'
			WHEN iwuc.course_mode = 'advanced' 
				THEN 'available'
            WHEN iwuc.is_first_item
                THEN 'available'
			WHEN LAG(iwuc.completion_date, 1) OVER (
                PARTITION BY iwuc.course_version_id, iwuc.user_id
                ORDER BY module_order_index, item_order_index) IS NOT NULL 
				THEN 'available'
				ELSE 'locked'
		END item_state
	FROM items_with_user_cte iwuc
)
SELECT * 
FROM items_with_state_cte

ORDER BY
	user_id,
	course_id,
	module_order_index,
	item_order_index
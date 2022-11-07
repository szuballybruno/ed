WITH 
items_with_user AS
(
	SELECT 
		ucb.user_id,
		ucb.course_id,
		civ.module_order_index,
		civ.item_order_index,
		civ.video_version_id,
		civ.exam_version_id,
		civ.item_title,
		civ.course_version_id,
		civ.video_id,
		civ.exam_id,
		civ.module_version_id,
		civ.module_id,
		civ.module_name,
		civ.module_code,
		civ.item_type,
		civ.item_subtitle,
		civ.playlist_item_code,
        ucb.current_item_code = civ.module_code module_is_current,
		esv.score_percentage,
        uprv.is_recommended_for_practise IS TRUE is_recommended_for_practise,
 
        -- state
		CASE 
			WHEN ucb.current_item_code = civ.playlist_item_code
				THEN 'current'
			WHEN vc.completion_date IS NOT NULL OR ec.completion_date IS NOT NULL
				THEN 'completed'
			WHEN ucb.course_mode = 'advanced' 
				THEN 'available'
            WHEN civ.item_order_index = 0 AND civ.module_order_index = 1
                THEN 'available'
			WHEN LAG(vc.completion_date, 1) OVER (
                PARTITION BY civ.course_version_id 
                ORDER BY module_order_index, item_order_index) IS NOT NULL 
				THEN 'available'
				ELSE 'locked'
		END item_state
	FROM public.playlist_view civ
	
	LEFT JOIN public.course_version cv 
	ON cv.id = civ.course_version_id
	
	INNER JOIN public.user_course_bridge ucb
	ON ucb.course_id = cv.course_id

	LEFT JOIN public.exam_highest_score_answer_session_view ehsasv
	ON ehsasv.exam_id = civ.exam_id
	AND ehsasv.user_id = ucb.user_id
	
	LEFT JOIN public.exam_score_view esv
	ON esv.answer_session_id = ehsasv.answer_session_id
	
	LEFT JOIN public.video_completion vc
	ON vc.video_version_id = civ.video_version_id
	AND vc.user_id = ucb.user_id
	
	LEFT JOIN public.exam_completion ec
	ON ec.answer_session_id = ehsasv.answer_session_id

    LEFT JOIN public.user_practise_recommendation_view uprv
    ON uprv.video_version_id = civ.video_version_id
    AND uprv.user_id = ucb.user_id
)
SELECT * 
FROM items_with_user

ORDER BY
	user_id,
	course_id,
	module_order_index,
	item_order_index
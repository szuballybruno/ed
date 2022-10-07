WITH 
all_items_cte AS 
(
    SELECT 
        cv.course_id,
        cv.id course_version_id,
        mv.id module_id,
        uni.video_version_id,
        uni.exam_version_id
    FROM 
    (
        SELECT 
            vv.module_version_id, 
            vv.id video_version_id,
            null exam_version_id
        FROM public.video_version vv
        UNION
        SELECT
            ev.module_version_id, 
            null video_version_id,
            ev.id exam_version_id
        FROM public.exam_version ev
    ) uni
    
    LEFT JOIN public.module_version mv
    ON mv.id = uni.module_version_id 
    
    LEFT JOIN public.course_version cv
    ON cv.id = mv.course_version_id
    
    ORDER BY
        cv.course_id,
        cv.id
),
latest_items_cte AS 
(
    SELECT 
        aic.*
    FROM all_items_cte aic
    
	INNER JOIN public.latest_course_version_view lcvi
	ON lcvi.version_id = aic.course_version_id
),
latest_items_with_codes_cte AS 
(
	SELECT 
        lcvi.course_id,
		civ.*,
	
        -- module code
        (SELECT encode((lic.module_id || '@module')::bytea, 'base64')) module_code,

        -- playlist item code
        CASE WHEN civ.video_id IS NULL
            THEN (SELECT encode((civ.exam_id || '@exam')::bytea, 'base64'))
            ELSE (SELECT encode((civ.video_id || '@video')::bytea, 'base64')) 
        END playlist_item_code
	FROM latest_items_cte lic 
	
	INNER JOIN public.latest_course_version_view lcvi
	ON lcvi.version_id = lic.course_version_id
    
    INNER JOIN public.course_item_view civ 
    ON (civ.exam_version_id = lic.exam_version_id 
    OR civ.video_version_id = lic.video_version_id)
    AND civ.item_type <> 'pretest'
    
),
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
			WHEN cic.completion_date IS NOT NULL
				THEN 'completed'
			WHEN ucb.course_mode = 'advanced' 
				THEN 'available'
            WHEN civ.item_order_index = 0 AND civ.module_order_index = 1
                THEN 'available'
			WHEN LAG(cic.completion_date, 1) OVER (
                PARTITION BY civ.course_version_id 
                ORDER BY module_order_index, item_order_index) IS NOT NULL 
				THEN 'available'
				ELSE 'locked'
		END item_state
	FROM latest_items_with_codes_cte civ
	
	LEFT JOIN public.course_version cv 
	ON cv.id = civ.course_version_id
	
	INNER JOIN public.user_course_bridge ucb
	ON ucb.course_id = cv.course_id

	LEFT JOIN public.exam_highest_score_answer_session_view ehsasv
	ON ehsasv.exam_id = civ.exam_id
	AND ehsasv.user_id = ucb.user_id
	
	LEFT JOIN public.exam_score_view esv
	ON esv.answer_session_id = ehsasv.answer_session_id
	
	LEFT JOIN public.course_item_completion cic
	ON cic.video_version_id = civ.video_version_id
	OR cic.exam_version_id = ehsasv.exam_version_id

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
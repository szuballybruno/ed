WITH 
highest_percentage_ase_cte AS 
(
	SELECT 
		rns.user_id,
		rns.exam_id,
		rns.answer_session_id,
		rns.exam_score
	FROM 
	(
		SELECT
			esv.user_id,
			ev.exam_id,
			esv.answer_session_id,
			esv.exam_score,
			ROW_NUMBER() OVER (
				PARTITION BY 
					esv.user_id,
					ev.exam_id 
				ORDER BY 
					esv.exam_score DESC
			) = 1 is_highest_score
		FROM public.exam_score_view esv

		LEFT JOIN public.exam_version ev
		ON ev.id = esv.exam_version_id 
	) rns 
	
	WHERE rns.is_highest_score 
),
course_item_light_view AS 
(
    SELECT 
        uni.*, 
        mv.course_version_id,
        mv.module_id
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
    
	-- filter out all pretest modules
    INNER JOIN public.module_data md
    ON md.id = mv.module_data_id
    AND md.order_index != 0
    
    order by uni.video_version_id
),
latest_course_items AS 
(
	SELECT 
        lcvi.course_id,
		civ.*,
	
        -- module code
        (SELECT encode((cilv.module_id || '@module')::bytea, 'base64')) module_code,

        -- playlist item code
        CASE WHEN civ.video_id IS NULL
            THEN (SELECT encode((civ.exam_id || '@exam')::bytea, 'base64'))
            ELSE (SELECT encode((civ.video_id || '@video')::bytea, 'base64')) 
        END playlist_item_code
	FROM course_item_light_view cilv 
	
	INNER JOIN public.latest_course_version_view lcvi
	ON lcvi.version_id = cilv.course_version_id
    
    INNER JOIN public.course_item_view civ 
    ON civ.exam_version_id = cilv.exam_version_id 
    OR civ.video_version_id = cilv.video_version_id
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
			WHEN cic.id IS NOT NULL
				THEN 'completed'
			WHEN ucb.course_mode = 'advanced' 
				THEN 'available'
            WHEN civ.item_order_index = 0 AND civ.module_order_index = 1
                THEN 'available'
			WHEN LAG(cic.id, 1) OVER (
                PARTITION BY civ.course_version_id 
                ORDER BY module_order_index, item_order_index) IS NOT NULL 
				THEN 'available'
				ELSE 'locked'
		END item_state
	FROM latest_course_items civ
	
	LEFT JOIN public.course_version cv 
	ON cv.id = civ.course_version_id
	
	INNER JOIN public.user_course_bridge ucb
	ON ucb.course_id = cv.course_id

	LEFT JOIN highest_percentage_ase_cte hpac
	ON hpac.exam_id = civ.exam_id
	AND hpac.user_id = ucb.user_id
	
	LEFT JOIN public.exam_score_view esv
	ON esv.answer_session_id = hpac.answer_session_id
	
	LEFT JOIN public.course_item_completion cic
	ON cic.answer_session_id = hpac.answer_session_id

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
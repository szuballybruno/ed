WITH 
latest_answer_session AS
(	
	SELECT
		ase.user_id,
		ase.exam_version_id,
		MAX(ase.id)::int answer_session_id
	FROM public.answer_session ase
    
    WHERE ase.exam_version_id IS NOT NULL
	
	GROUP BY 
        ase.user_id, 
        ase.exam_version_id
),
uni AS 
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
),
course_item_light_view AS 
(
    SELECT 
        uni.*, 
        mv.course_version_id,
        mv.module_id
    FROM uni
    
    LEFT JOIN public.module_version mv
    ON mv.id = uni.module_version_id 
    
	-- filter out all pretest modules
    INNER JOIN public.module_data md
    ON md.id = mv.module_data_id
    AND md.order_index != 0
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
		civ.module_order_index,
		civ.item_order_index,
		civ.video_version_id,
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
	
		ucb.user_id,
		ucb.course_id,
        ucb.current_item_code = civ.module_code module_is_current,
		asv.answer_session_success_rate correct_answer_rate,
        uprv.is_recommended_for_practise IS NOT NULL is_recommended_for_practise,
    
        -- state
		CASE 
			WHEN ucb.current_item_code = civ.playlist_item_code
				THEN 'current'
			WHEN cicv.course_item_completion_id IS NOT NULL
				THEN 'completed'
			WHEN ucb.course_mode = 'advanced' OR (civ.item_order_index = 0 AND civ.module_order_index = 1) 
				THEN 'available'
			WHEN LAG(cicv.course_item_completion_id IS NOT NULL, 1) OVER (PARTITION BY civ.course_version_id) IS NOT DISTINCT FROM true 
				THEN 'available'
				ELSE 'locked'
		END item_state
	FROM latest_course_items civ
	
	LEFT JOIN public.course_version cv 
	ON cv.id = civ.course_version_id
	
	INNER JOIN public.user_course_bridge ucb
	ON ucb.course_id = cv.course_id
	
	LEFT JOIN public.course_item_completion_view cicv
	ON (cicv.exam_version_id = civ.exam_version_id
	OR cicv.video_version_id = civ.video_version_id)
	AND cicv.user_id = ucb.user_id

	LEFT JOIN latest_answer_session las
	ON las.exam_version_id = civ.exam_version_id
	AND las.user_id = ucb.user_id

	LEFT JOIN public.answer_session_view asv
	ON asv.answer_session_id = las.answer_session_id
	AND asv.user_id = ucb.user_id

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
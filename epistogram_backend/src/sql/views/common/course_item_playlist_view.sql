WITH 
video_completed_view AS 
(
	SELECT 
		uvpb.user_id,
		uvpb.video_version_id
	FROM public.user_video_progress_bridge uvpb
	WHERE uvpb.completion_date IS NOT NULL
),
exam_completed_view AS 
(
	SELECT
		ecv.user_id,
		ecv.exam_version_id
	FROM public.exam_completed_view ecv
	WHERE ecv.has_successful_session
),
completed_items AS 
(
	SELECT vcv.user_id, vcv.video_version_id, NULL::int exam_version_id, true is_completed
	FROM video_completed_view vcv
	UNION
	SELECT ecv.user_id, NULL::int video_version_id, ecv.exam_version_id, true is_completed
	FROM exam_completed_view ecv
),
latest_course_items AS 
(
	SELECT 
		civ.*,
		(SELECT encode((civ.module_id || '@module')::bytea, 'base64')) module_code,
		CASE WHEN civ.video_id IS NULL
			THEN (SELECT encode((civ.exam_id || '@exam')::bytea, 'base64'))
			ELSE (SELECT encode((civ.video_id || '@video')::bytea, 'base64')) 
		END playlist_item_code
	FROM public.latest_course_version_view lcvi
	
	LEFT JOIN public.course_item_view civ
	ON civ.course_version_id = lcvi.version_id
),
states AS
(
	SELECT 
		cv.course_id,
		civ.module_id,
		civ.video_id,
		civ.exam_id,
		ucb.user_id,
		CASE 
			WHEN ucb.current_item_code = civ.playlist_item_code
				THEN 'current'
			WHEN ci.is_completed
				THEN 'completed'
			WHEN ucb.course_mode = 'advanced' OR (civ.item_order_index = 0 AND civ.module_order_index = 0) 
				THEN 'available'
			WHEN LAG(ci.is_completed, 1) OVER (PARTITION BY civ.course_version_id) IS NOT DISTINCT FROM true 
				THEN 'available'
				ELSE 'locked'
		END item_state,
		ucb.current_item_code = civ.module_code module_is_current
	FROM latest_course_items civ
	
	LEFT JOIN public.course_version cv 
	ON cv.id = civ.course_version_id
	
	LEFT JOIN completed_items ci
	ON ci.exam_version_id = civ.exam_version_id
	OR ci.video_version_id = civ.video_version_id
	
	LEFT JOIN public.user_course_bridge ucb
	ON ucb.course_id = cv.course_id
),
combined AS 
(
	SELECT 
		st.course_id,
		st.user_id,
		lci.*,
		st.item_state,
		st.module_is_current,
		uprv.is_recommended_for_practise
	FROM latest_course_items lci
	
	LEFT JOIN states st
	ON st.exam_id = lci.exam_id
	OR st.video_id = lci.video_id
	
	LEFT JOIN public.user_practise_recommendation_view uprv
	ON uprv.video_version_id = lci.video_version_id
	AND uprv.user_id = st.user_id
)
SELECT * FROM combined
	
ORDER BY
	user_id,
	course_id,
	module_order_index,
	item_order_index
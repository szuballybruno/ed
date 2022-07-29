WITH 
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

	-- filter out all pretest modules
	WHERE civ.module_order_index != 0
),
latest_answer_session AS
(
	SELECT
		u.id user_id,
		ev.id exam_version_id,
		MAX(asv.answer_session_id)::int answer_session_id
	FROM public.user u
	
	CROSS JOIN public.exam_version ev
	
	LEFT JOIN public.answer_session_view asv
	ON asv.user_id = u.id
	AND asv.exam_version_id = ev.id

	INNER JOIN public.course_item_completion_view cicv
	ON cicv.answer_session_id = asv.answer_session_id
	AND cicv.user_id = u.id

	GROUP BY u.id, ev.id
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
			WHEN cicv.course_item_completion_id IS NOT NULL
				THEN 'completed'
			WHEN ucb.course_mode = 'advanced' OR (civ.item_order_index = 0 AND civ.module_order_index = 1) 
				THEN 'available'
			WHEN LAG(cicv.course_item_completion_id IS NOT NULL, 1) OVER (PARTITION BY civ.course_version_id) IS NOT DISTINCT FROM true 
				THEN 'available'
				ELSE 'locked'
		END item_state,
		ucb.current_item_code = civ.module_code module_is_current,
		asv.answer_session_success_rate correct_answer_rate
	FROM latest_course_items civ
	
	LEFT JOIN public.course_version cv 
	ON cv.id = civ.course_version_id
	
	LEFT JOIN public.course_item_completion_view cicv
	ON cicv.exam_version_id = civ.exam_version_id
	OR cicv.video_version_id = civ.video_version_id
	
	LEFT JOIN public.user_course_bridge ucb
	ON ucb.course_id = cv.course_id

	LEFT JOIN latest_answer_session las
	ON las.exam_version_id = civ.exam_version_id
	AND las.user_id = ucb.user_id

	LEFT JOIN public.answer_session_view asv
	ON asv.answer_session_id = las.answer_session_id
),
combined AS 
(
	SELECT 
		st.course_id,
		st.user_id,
		lci.*,
		st.item_state,
		st.module_is_current,
		st.correct_answer_rate,
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
WITH
items_combined AS 
(
	-- video
	SELECT
		mv.course_version_id,
		vv.id video_version_id,
		v.id video_id,
		NULL::int exam_id,
		NULL::int exam_version_id,
		mv.id module_version_id,
		vd.order_index item_order_index,
		vd.title item_title,
		vd.subtitle item_subtitle,
		'video' item_type,
		'video_version@' || vv.id version_code
	FROM public.video_version vv
	
	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id
	
	LEFT JOIN public.video_data vd
	ON vd.id = vv.video_data_id
	
	LEFT JOIN public.video v
	ON v.id = vv.video_id

	UNION ALL

	-- exam
	SELECT 
		mv.course_version_id,
		NULL::int video_version_id,
		NULL::int video_id,
		ev.id exam_version_id,
		e.id exam_id,
		mv.id module_version_id,
		ed.order_index item_order_index,
		ed.title item_title,
		ed.subtitle item_subtitle,
		CASE WHEN e.is_signup 
			THEN 'signup' 
			ELSE CASE WHEN e.is_pretest 
				THEN 'pretest'
				ELSE 'exam'
			END 
		END item_type,
		'exam_version@' || ev.id version_code
	FROM public.exam_version ev
	
	LEFT JOIN public.module_version mv
	ON mv.id = ev.module_version_id
	
	LEFT JOIN public.exam e
	ON e.id = ev.exam_id
	
	LEFT JOIN public.exam_data ed
	ON ed.id = ev.exam_data_id
)
SELECT 
	cv.id course_version_id,
	md.name module_name,
	md.order_index module_order_index,
	mv.id module_version_id,
	mo.id module_id,
	ic.video_version_id,
	ic.video_id,
	ic.exam_version_id,
	ic.exam_id,
	ic.item_order_index,
	ic.item_title,
	ic.item_subtitle,
	ic.item_type,
	ic.version_code
FROM public.course_version cv

LEFT JOIN public.module_version mv
ON mv.course_version_id = cv.id

LEFT JOIN public.module_data md
ON md.id = mv.module_data_id

LEFT JOIN public.module mo
ON mo.id = mv.module_id

LEFT JOIN items_combined ic
ON ic.course_version_id = cv.id
AND ic.module_version_id = mv.id

ORDER BY 
	cv.id, 
	md.order_index,
	ic.item_order_index
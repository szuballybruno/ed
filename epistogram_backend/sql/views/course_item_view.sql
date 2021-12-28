SELECT 
	cm.course_id course_id,
	cm.name module_name,
	cm.order_index module_order_index,
	cm.id module_id,
	(SELECT encode((cm.id || '@module')::bytea, 'base64')) module_code,
	sq.video_id,
	sq.exam_id,
	sq.item_is_video,
	sq.item_id,
	sq.item_order_index,
	sq.item_title,
	sq.item_subtitle,
	sq.item_is_final_exam,
	sq.item_code
FROM public.course_module cm

LEFT JOIN 
(
	-- video
	SELECT
		v.id video_id,
		NULL exam_id,
		true item_is_video,
		v.id item_id,
		v.module_id module_id,
		v.order_index item_order_index,
		v.title item_title,
		v.subtitle item_subtitle,
		NULL item_is_final_exam,
		(SELECT encode((v.id || '@video')::bytea, 'base64')) item_code
	FROM public.video v

	UNION ALL

	-- exam
	SELECT 
		NULL video_id,
		e.id exam_id,
		false item_is_video,
		e.id item_id,
		e.module_id module_id,
		e.order_index item_order_index,
		e.title item_title,
		e.subtitle item_subtitle,
		e.is_final_exam item_is_final_exam,
		(SELECT encode((e.id || '@exam')::bytea, 'base64')) item_code
	FROM public.exam e
) sq
ON sq.module_id = cm.id

WHERE cm.course_id IS NOT NULL

ORDER BY 
	cm.course_id, 
	cm.order_index,
	item_order_index
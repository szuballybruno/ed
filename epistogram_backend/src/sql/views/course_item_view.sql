SELECT 
	sq2.*
FROM 
(
	SELECT 
		co.id course_id,
		COALESCE(cm.name, '--- PRETEST ---') module_name,
		COALESCE(cm.order_index, -1) module_order_index,
		cm.id module_id,
		(SELECT encode((cm.id || '@module')::bytea, 'base64')) module_code,
		sq.video_id,
		sq.exam_id,
		sq.item_id,
		sq.item_is_deleted,
		sq.item_order_index,
		sq.item_title,
		sq.item_subtitle,
		sq.item_code,
		sq.item_type
	FROM public.course co

	LEFT JOIN 
	(
		SELECT 
			COALESCE(cm.course_id, sq.sq_course_id) course_id,
			sq.*
		FROM 
		(
			-- video
			SELECT
				v.course_id sq_course_id,
				v.id video_id,
				NULL exam_id,
				v.module_id module_id,
				v.id item_id,
				v.deletion_date IS NOT NULL item_is_deleted,
				v.order_index item_order_index,
				v.title item_title,
				v.subtitle item_subtitle,
				(SELECT encode((v.id || '@video')::bytea, 'base64')) item_code,
				'video' item_type
			FROM public.video v

			UNION ALL

			-- exam
			SELECT 
				e.course_id sq_course_id,
				NULL video_id,
				e.id exam_id,
				e.module_id module_id,
				e.id item_id,
				e.deletion_date IS NOT NULL item_is_deleted,
				e.order_index item_order_index,
				e.title item_title,
				e.subtitle item_subtitle,
				(SELECT encode((e.id || '@exam')::bytea, 'base64')) item_code,
				CASE WHEN e.type = 'normal' THEN 'exam' ELSE e.type END item_type
			FROM public.exam e
		) sq

		LEFT JOIN public.course_module cm
		ON cm.id = sq.module_id
	) sq
	ON sq.course_id = co.id

	LEFT JOIN public.course_module cm
	ON cm.id = sq.module_id
) sq2

ORDER BY 
	sq2.course_id, 
	sq2.module_order_index,
	sq2.item_order_index
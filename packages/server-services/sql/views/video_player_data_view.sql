SELECT 
	vv.video_id video_id,
	vv.id video_version_id,
	vd.id video_data_id,
	mv.id module_version_id,
	mv.course_version_id,
    vd.subtitle,
    vd.title,
    vd.description,
    sf.file_path thumbnail_url,
    sf2.file_path video_file_path
FROM public.video_version vv

LEFT JOIN public.video_data vd
ON vd.id = vv.video_data_id

LEFT JOIN public.storage_file sf
ON sf.id = vd.thumbnail_file_id

LEFT JOIN public.storage_file sf2
ON sf2.id = vd.video_file_id

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id


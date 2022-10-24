-- add column
ALTER TABLE public.question_data
ADD COLUMN module_id int 
CONSTRAINT fk_module_version REFERENCES public.module(id);

-- populate with data
UPDATE public.question_data qd
SET 
	module_id = sq.module_id
FROM 
(
	SELECT 
		qd.id qd_id,
		mv.module_id,
		mv.id module_version_id,
		qv.id question_version_id,
		ev.id exam_version_id,
		vv.id video_version_id
	FROM public.question_data qd
	
	LEFT JOIN public.question_version qv
	ON qv.question_data_id = qd.id
	
	LEFT JOIN public.exam_version ev
	ON ev.id = qv.exam_version_id
	
	LEFT JOIN public.video_version vv
	ON vv.id = qv.video_version_id
	
	LEFT JOIN public.module_version mv
	ON mv.id = ev.module_version_id
	OR mv.id = vv.module_version_id
) sq
WHERE sq.qd_id = qd.id;

-- delete 85
delete from public.question_data 
where id = 85 

-- set column as non-nullable
ALTER TABLE public.question_data
ALTER COLUMN module_id SET NOT NULL;

-- select * from public.question_data qd
-- left join public.question_version qv
-- ON qv.question_data_id = qd.id
-- where qv.id is null

-- select * from public.question_data where module_id is null

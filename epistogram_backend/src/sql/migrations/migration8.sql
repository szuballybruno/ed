-- add column
ALTER TABLE public.question_version 
ADD COLUMN module_version_id int 
CONSTRAINT fk_module_version REFERENCES public.module_version(id);

-- populate with data
UPDATE public.question_version qv
SET 
	module_version_id = sq.module_version_id
FROM 
(
	SELECT 
		qv.id qv_id,
		mv.id module_version_id
	FROM public.question_version qv
	
	LEFT JOIN public.exam_version ev
	ON ev.id = qv.exam_version_id
	
	LEFT JOIN public.video_version vv
	ON vv.id = qv.video_version_id
	
	LEFT JOIN public.module_version mv
	ON mv.id = ev.module_version_id
	OR mv.id = vv.module_version_id
) sq
WHERE sq.qv_id = qv.id;

-- set column as non-nullable
ALTER TABLE public.question_version
ALTER COLUMN module_version_id SET NOT NULL;

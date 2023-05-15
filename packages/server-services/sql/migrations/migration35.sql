UPDATE public.course_data AS cd SET category_id = 9
WHERE cd.category_id IN 
(
	SELECT
		cc.id category_id
	FROM public.course_category cc

	WHERE cc.parent_category_id IS NOT NULL
);

UPDATE public.course_data SET sub_category_id = 9
WHERE sub_category_id IN 
(
	SELECT
		cc.id sub_category_id
	FROM public.course_category cc

	WHERE cc.parent_category_id IS NOT NULL
);

DELETE FROM public.course_category_assignment_bridge
WHERE course_category_id IN 
(
	SELECT
		cc.id course_category_id
	FROM public.course_category cc

	WHERE cc.parent_category_id IS NOT NULL
);

DELETE FROM public.course_category
WHERE id IN 
(
	SELECT
		cc.id
	FROM public.course_category cc

	WHERE cc.parent_category_id IS NOT NULL
);

ALTER TABLE public.company DROP COLUMN is_survey_required;
ALTER TABLE public.user DROP COLUMN is_survey_required;

ALTER TABLE public.feature_assignment_bridge
ADD COLUMN is_deassigning BOOLEAN;

UPDATE public.feature_assignment_bridge AS fab SET is_deassigning = false

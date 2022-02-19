SELECT 
	ct.id,
	COALESCE(vm.course_id, qv.course_id) course_id,
	ct.user_id,
	ct.amount
FROM coin_transaction ct

LEFT JOIN public.video v 
ON v.id = ct.video_id

LEFT JOIN public.course_module vm
ON vm.id = v.module_id

LEFT JOIN public.given_answer ga
ON ga.id = ct.given_answer_id 

LEFT JOIN (
	SELECT q.id, COALESCE(em.course_id, vm.course_id) course_id
	FROM public.question q
	
	LEFT JOIN public.video v
	ON q.video_id = v.id
	
	LEFT JOIN public.exam e
	ON q.exam_id = e.id
	
	LEFT JOIN public.course_module vm
	ON vm.id = v.module_id 
	
	LEFT JOIN public.course_module em
	ON em.id = e.module_id 
	
	WHERE q.exam_id IS DISTINCT FROM 1
) qv
ON qv.id = ga.question_id

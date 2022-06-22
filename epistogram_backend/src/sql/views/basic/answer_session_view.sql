SELECT 
	ase.id answer_session_id,
	ase.user_id,
	ase.exam_version_id,
	ase.video_version_id,
    ase.start_date,
    ase.end_date,
	ase.is_completed,
	false is_successful,
	(
		SELECT 
			COUNT(*)
		FROM public.question_version qv
		
		LEFT JOIN public.given_answer ga
		ON ga.question_version_id = qv.id

		WHERE ga.answer_session_id = ase.id
	) total_question_count,
	(
		SELECT 
			SUM(ga.is_correct::int)
		FROM public.given_answer ga

		WHERE ga.answer_session_id = ase.id
	) correct_answer_count,
	CASE WHEN ase.is_practise
		THEN 'practise'
		ELSE CASE WHEN e.id = 0
			THEN 'signup'
			ELSE CASE WHEN e.is_pretest
				THEN 'pretest'
				ELSE CASE WHEN ase.video_version_id IS NOT NULL
					THEN 'video'
					ELSE NULL
				END
			END
		END
	END answer_session_type
FROM public.answer_session ase

LEFT JOIN public.exam_version ev
ON ev.id = ase.exam_version_id

LEFT JOIN public.exam e
ON ev.exam_id = e.id
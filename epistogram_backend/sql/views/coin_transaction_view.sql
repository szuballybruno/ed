SELECT 
	ca.id,
	ca.user_id,
	ca.creation_date,
	ca.amount,
	v.title as video_title,
	q.question_text as question_text,
	CASE WHEN ca.activity_session_id IS NOT NULL
		THEN 'activity'
		ELSE CASE WHEN ca.video_id IS NOT NULL
			THEN 'video_watched'
			ELSE CASE WHEN ca.given_answer_id IS NOT NULL
				THEN 'correct_answer'
				ELSE CASE WHEN ca.given_answer_streak_id IS NOT NULL
					THEN 'answer_streak'
					ELSE CASE WHEN ca.activity_streak_id IS NOT NULL 
						THEN 'activity_streak'
						ELSE 'unknown'
					END
				END 
			END 
		END 
	END AS reason
FROM public.coin_acquire ca

LEFT JOIN public.video v ON v.id = ca.video_id

LEFT JOIN public.given_answer ga ON ga.id = ca.given_answer_id
LEFT JOIN public.question q ON q.id = ga.question_id

ORDER BY 
	creation_date DESC

SELECT 
	ca.id,
	ca.user_id,
	ca.creation_date,
	ca.amount,
	v.title video_title,
	q.question_text question_text,
	sisv.name shop_item_name,
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
						ELSE CASE WHEN ca.shop_item_id IS NOT NULL 
							THEN 'shop_item_purchase'
							ELSE CASE WHEN ca.is_gifted
								THEN 'gifted'
								ELSE 'unknown'
							END
						END
					END
				END 
			END 
		END 
	END reason
FROM public.coin_transaction ca

-- video info
LEFT JOIN public.video v ON v.id = ca.video_id

-- question info
LEFT JOIN public.given_answer ga ON ga.id = ca.given_answer_id
LEFT JOIN public.question q ON q.id = ga.question_id

-- shop item info
LEFT JOIN public.shop_item_stateful_view sisv ON sisv.id = ca.shop_item_id AND sisv.user_id = ca.user_id

ORDER BY 
	creation_date DESC

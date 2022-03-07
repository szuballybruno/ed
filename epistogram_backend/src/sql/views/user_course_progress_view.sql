SELECT
	sq2.*,
	LEAST (sq2.total_item_count, sq2.recommended_items_per_day * 7) recommended_items_per_week
FROM 
(
	SELECT
		sq.*,
		GREATEST(0, sq.previsioned_percent_completed_by_now - sq.completed_percentage) lag_behind_percentage,
		ucb.tempomat_mode,
		CASE WHEN sq.remaining_days = 0
			THEN sq.remaining_item_count
			ELSE CEIL(sq.remaining_item_count / sq.remaining_days)::int 
		END recommended_items_per_day
	FROM 
	(
		SELECT 
			uccpv.user_id,
			uccpv.course_id,
			uccpv.previsioned_percent_completed_by_now,
			COALESCE(ucpa.completed_percentage, 0) completed_percentage,
			ucpa.remaining_item_count,
			uccpv.previsioned_duration_days,
			uccpv.total_item_count,
			uccpv.remaining_days
		FROM public.user_course_completion_previsioned_view uccpv

		LEFT JOIN public.user_course_progress_actual ucpa
		ON ucpa.course_id = uccpv.course_id AND ucpa.user_id = uccpv.user_id
	) sq

	LEFT JOIN public.user_course_bridge ucb
	ON ucb.course_id = sq.course_id AND ucb.user_id = sq.user_id
) sq2
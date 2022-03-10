SELECT 
	ucb.id,
	ucb.user_id,
	ucb.course_id,
	ucb.creation_date,
	ucb.course_mode,
	ucb.is_current,
	ucb.current_item_code,
	ucb.stage_name current_stage_name,
	ucb.tempomat_mode,
	ucb.creation_date::date start_date,
	ucb.previsioned_completion_date::date previsioned_completion_date,
	ucb.previsioned_completion_date::date - ucb.creation_date::date previsioned_length_days
FROM public.user_course_bridge ucb
WITH 
base_query_cte AS
(
	SELECT 
		ac.id activation_code_id,
		ac.code,
		ac.company_id,
		ac.trial_length_days,
		u.id user_id,
		u.email,
		u.id IS NOT NULL is_used,
		now()::date - u.creation_date::date days_elapsed_from_trial
	FROM public.activation_code ac

	LEFT JOIN public.user u
	ON u.id = ac.user_id
)
SELECT 
	bqc.*,
	bqc.days_elapsed_from_trial > bqc.trial_length_days is_trial_over
FROM base_query_cte bqc
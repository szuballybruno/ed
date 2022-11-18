WITH 
acquired_coins_past_month_cte AS
(
	SELECT 
		ct.user_id, 
		SUM(ct.amount) acquired_coins
	FROM public.coin_transaction ct
	WHERE ct.amount > 0 AND ct.creation_date > now() - INTERVAL '30 days'
	GROUP BY ct.user_id
),
acquired_coins_past_week_cte AS
(
	SELECT 
		ct.user_id, 
		SUM(ct.amount) acquired_coins
	FROM public.coin_transaction ct
	WHERE ct.amount > 0 AND ct.creation_date > now() - INTERVAL '7 days'
	GROUP BY ct.user_id
),
acquired_coins_past_day_cte AS
(
	SELECT 
		ct.user_id, 
		SUM(ct.amount) acquired_coins
	FROM public.coin_transaction ct
	WHERE ct.amount > 0 AND ct.creation_date > now() - INTERVAL '1 days'
	GROUP BY ct.user_id
),
res_cte AS
(
	SELECT 
		u.company_id,
		u.id user_id,
		u.username,
		sf.file_path avatar_file_path,
		COALESCE(ac_pm.acquired_coins, 0)::int acquired_coins_past_month,
		COALESCE(ac_pw.acquired_coins, 0)::int acquired_coins_past_week,
		COALESCE(ac_pd.acquired_coins, 0)::int acquired_coins_past_day
	FROM public.user u 

	LEFT JOIN acquired_coins_past_month_cte ac_pm
	ON ac_pm.user_id = u.id
	
	LEFT JOIN acquired_coins_past_week_cte ac_pw
	ON ac_pw.user_id = u.id
	
	LEFT JOIN acquired_coins_past_day_cte ac_pd
	ON ac_pd.user_id = u.id

	LEFT JOIN public.storage_file sf
	ON sf.id = u.avatar_file_id
	
	WHERE u.deletion_date IS NULL
)
SELECT
	res_cte.*,
 	ROW_NUMBER() OVER (PARTITION BY company_id ORDER BY acquired_coins_past_month DESC)::int rank_month,
 	ROW_NUMBER() OVER (PARTITION BY company_id ORDER BY acquired_coins_past_week DESC)::int rank_week,
 	ROW_NUMBER() OVER (PARTITION BY company_id ORDER BY acquired_coins_past_day DESC)::int rank_day
FROM res_cte 

ORDER BY 
	company_id, 
	res_cte.acquired_coins_past_month DESC
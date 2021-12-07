SELECT 
	u.id AS user_id, 
	CASE WHEN SUM(amount) IS NULL THEN 0 ELSE SUM(amount) END AS coin_balance 
FROM public.user u

LEFT JOIN public.coin_acquire ca
ON ca.user_id = u.id

GROUP BY 
	u.id
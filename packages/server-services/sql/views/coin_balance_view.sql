SELECT 
	u.id user_id, 
	COALESCE(SUM(amount), 0)::int coin_balance 
FROM public.user u

LEFT JOIN public.coin_transaction ca
ON ca.user_id = u.id

GROUP BY 
	u.id
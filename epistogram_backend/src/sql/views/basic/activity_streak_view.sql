SELECT 
	ast.*,
	(EXTRACT (EPOCH FROM ast.end_date - ast.start_date) / 86400)::int AS length_days
FROM activity_streak ast
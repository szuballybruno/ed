SELECT 
	"as".*,
	(EXTRACT (EPOCH FROM "as".end_date - "as".start_date) / 86400)::int AS length_days
FROM activity_streak "as"
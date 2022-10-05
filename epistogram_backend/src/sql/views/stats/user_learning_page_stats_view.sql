-- total and total correct given answer count
WITH answer_stats AS 
(
	SELECT 
		ase.user_id,
		COUNT (ga.id)::int total_given_answer_count,
		SUM ((ga.state = 'CORRECT')::int)::int total_correct_given_answer_count
	FROM public.given_answer ga

	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id

	LEFT JOIN public.question_version qv
	ON qv.id = ga.question_version_id

	AND qv.video_version_id IS NOT NULL
	
	GROUP BY ase.user_id
), 
-- avg epistocoins aquired per company
company_avg_coins AS 
(
	SELECT 
		u.company_id,
		AVG(ct.amount) avg_coins_aquired_by_company
	FROM public.user u

	LEFT JOIN public.coin_transaction ct
	ON ct.user_id = u.id

	LEFT JOIN public.company 
	ON company.id = u.company_id

	GROUP BY u.company_id
), 
-- total amounts of epistocoin aquired per user
user_coins AS
(
	SELECT
		u.id user_id,
		SUM(ct.amount) total_coins_aquired_per_user
	FROM public.user u

	LEFT JOIN public.coin_transaction ct
	ON ct.user_id = u.id

	GROUP BY u.id
),
-- users rank inside their company in percentage
user_rank_inside_company AS
(
	SELECT 
		u.id user_id,
		ROUND((uc.total_coins_aquired_per_user / cac.avg_coins_aquired_by_company)::double precision * 100) user_rank_by_coin_percentage
	FROM public.user u
	
	LEFT JOIN company_avg_coins cac
	ON cac.company_id = u.company_id
	
	LEFT JOIN user_coins uc
	ON uc.user_id = u.id
)

SELECT 
	u.id user_id,
	u.email user_email,

	-- videos to be repeated count
	(
		SELECT 
			COALESCE(SUM(is_recommended_for_practise::int), 0)
		FROM public.user_practise_recommendation_view uprv
		WHERE uprv.user_id = u.id
	) videos_to_be_repeated_count,

	-- questions to be repeated count
	(
		SELECT
			COUNT(*)::int
		FROM public.question qu

		LEFT JOIN public.question_version qv
		ON qv.id = qu.id

		LEFT JOIN public.given_answer ga
		ON ga.question_version_id = qv.id

		LEFT JOIN public.answer_session ase
		ON ase.id = ga.answer_session_id

		WHERE ase.user_id = u.id
		AND qv.video_version_id IS NOT NULL
		AND ga.state = 'CORRECT'
	) questions_to_be_repeated_count,

	-- completed video count 
	(
		SELECT 
			COUNT(cicv.course_item_completion_id)::int
		FROM public.course_item_completion_view cicv
		WHERE cicv.user_id = u.id
	) completed_video_count,

	-- total watch time
	(
		SELECT 
			SUM(usav.length_seconds)::int
		FROM public.user_session_view usav

		WHERE usav.user_id = u.id
	) total_session_length_seconds,

	-- answered questions count
	(
		SELECT
			COUNT(*)::int
		FROM public.question qu

		LEFT JOIN public.question_version qv
		ON qv.id = qu.id

		LEFT JOIN public.given_answer ga
		ON ga.question_version_id = qv.id

		LEFT JOIN public.answer_session ase
		ON ase.id = ga.answer_session_id

		WHERE ase.user_id = u.id
		AND qv.video_version_id IS NOT NULL
	) answered_questions_count,

	-- total correct answer rate
	CASE WHEN ast.total_given_answer_count = 0
		THEN 0
		ELSE CAST(float8 (ast.total_correct_given_answer_count::double precision / ast.total_given_answer_count * 100) as numeric)
	END total_correct_answer_rate,

	-- rank inside company (top x percentage)
	CASE 
		WHEN uric.user_rank_by_coin_percentage > 90
		THEN 10
		ELSE 100 - uric.user_rank_by_coin_percentage
	END rank_inside_company

FROM public.user u

LEFT JOIN answer_stats ast
ON ast.user_id = u.id

LEFT JOIN user_rank_inside_company uric
ON uric.user_id = u.id

WHERE u.deletion_date IS NULL -- AND u.is_invitation_accepted = true

ORDER BY u.id
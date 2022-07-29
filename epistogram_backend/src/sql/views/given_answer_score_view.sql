WITH latest_answers AS 
(
	SELECT
		MAX(av.id) answer_version_id
	FROM public.answer an

	LEFT JOIN public.answer_version av
	ON av.answer_id = an.id

	GROUP BY an.id
),
answer_given_answer AS
(
	SELECT 
		av.id,
		av.question_version_id,
		ad.is_correct,
		ga.id given_answer_id,
		ase.user_id,
		ase.id answer_session_id,
		(
			SELECT 
				COUNT(*) 
			FROM public.answer_version av2

			WHERE av2.question_version_id = av.question_version_id 
		) answers_count,
		(
			SELECT 
				SUM(ad2.is_correct::int) 
			FROM public.answer_version av2
			
			LEFT JOIN public.answer_data ad2
			ON ad2.id = av2.answer_data_id

			WHERE av2.question_version_id = av.question_version_id 
		) correct_answers_count
	FROM latest_answers la
	
	LEFT JOIN public.answer_version av
	ON av.id = la.answer_version_id
	
	LEFT JOIN public.answer_given_answer_bridge agab
	ON agab.answer_version_id = av.id
	
	LEFT JOIN public.given_answer ga
	ON ga.id = agab.given_answer_id

	LEFT JOIN public.answer_data ad
	ON ad.id = av.answer_data_id
	
	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id
	
	WHERE ga.id IS NOT NULL
	
	ORDER BY av.question_version_id
),
given_answer_points AS 
(
	SELECT 
		*,
		CASE 
			-- When user not answered the question
			-- it's 0 point per answer
			WHEN aga.given_answer_id IS NULL
				THEN 0
	
			-- When there is only one correct answer
			-- and the user answered it correctly
			-- then it's 4 points
			WHEN aga.given_answer_id IS NOT NULL 
			AND aga.is_correct IS TRUE 
			AND aga.correct_answers_count = 1
				THEN 4
	
			-- When there is more than 1 correct
			-- answers and the given answer is correct
			-- the user gets 4 / answers_count points
			WHEN aga.given_answer_id IS NOT NULL 
			AND aga.is_correct IS TRUE
				THEN 4 / aga.answers_count
	
			-- When there is more than 1 correct
			-- answers and the given answer is NOT correct
			-- the user gets MINUS 2 * (4 / answers_count) points
			-- so there is a penalty for answering incorrectly
			WHEN aga.given_answer_id IS NOT NULL 
			AND aga.is_correct IS FALSE
				THEN -1 * (2 * (4 / aga.answers_count))
			ELSE 0
		END given_answer_points
	FROM answer_given_answer aga
),
given_answer_points_limited AS
(
	SELECT
		*,
		CASE
			WHEN gap.given_answer_points > 4
				THEN 4
			WHEN gap.given_answer_points < 4
				THEN 0
			ELSE gap.given_answer_points
		END given_answer_points_limited
	FROM given_answer_points gap
)

SELECT 
	gapl.id answer_version_id,
	gapl.question_version_id,
	gapl.is_correct,
	gapl.given_answer_id,
	gapl.answer_session_id,
	gapl.user_id,
	gapl.given_answer_points_limited given_answer_points
FROM given_answer_points_limited gapl


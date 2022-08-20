WITH
given_answer_stats_flat_cte AS
(
	SELECT 
		qv.id question_version_id,
		ase.user_id,
		av.id answer_version_id,
		SUBSTRING(ad.text, 1, 10) answer_text,
		ad.is_correct answer_is_correct,
		agab.id anser_given_answer_bridge_id,
		agab.id IS NOT NULL is_answer_given,
	
		-- INCLUSIVE is_correct 
		-- if not given, and answer is incorrect
		-- or given and answer is correct
		(agab.id IS NOT NULL AND ad.is_correct) OR (agab.id IS NULL AND ad.is_correct = false) is_correct,
	
		-- INCLUSIVE is_incorrect 
		-- if given but answer is incorrect
		-- or not given but the answer is correct
		(agab.id IS NULL AND ad.is_correct) OR (agab.id IS NOT NULL AND ad.is_correct = false) is_incorrect
	FROM public.question_version qv
	
	LEFT JOIN public.latest_given_answer_view lgav
	ON lgav.question_version_id = qv.id
	
	LEFT JOIN public.given_answer ga
	ON ga.id = lgav.given_answer_id
	
	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id
	
	LEFT JOIN public.answer_version av
	ON av.question_version_id = qv.id
	
	LEFT JOIN public.answer_data ad
	ON ad.id = av.answer_data_id
	
	LEFT JOIN public.answer_given_answer_bridge agab
	ON agab.given_answer_id = ga.id
	AND agab.answer_version_id = av.id
	
	ORDER BY
		ase.user_id,
		qv.id
),
given_answer_stats_cte AS 
(
	SELECT 
		gasfc.question_version_id,
		gasfc.user_id,
		COUNT(gasfc.answer_version_id)::numeric answer_count,
		SUM(gasfc.is_correct::int)::numeric correct_answer_count,
		SUM(gasfc.is_incorrect::int)::numeric incorrect_answer_count,
		SUM(gasfc.is_answer_given::int)::numeric given_answer_count
	FROM given_answer_stats_flat_cte gasfc
	GROUP BY
		gasfc.question_version_id,
		gasfc.user_id
	
	ORDER BY
		gasfc.user_id,
		gasfc.question_version_id
),
given_answer_score_cte AS 
(
	SELECT
		sq.user_id,	
		sq.question_version_id,
	
		-- do not count score 
		-- when user is null aka no answer yet
		CASE WHEN sq.user_id IS NOT NULL 
			THEN ROUND(GREATEST(0, sq.correct_answer_score - sq.incorrect_answer_score) * consts.question_max_score)::int
			ELSE 0
		END score
	FROM 
	(
		SELECT 
			gasc.user_id,	
			gasc.question_version_id,
			gasc.correct_answer_count / gasc.answer_count correct_answer_score,
			gasc.incorrect_answer_count / gasc.answer_count * consts.incorrect_answer_value_multiplier incorrect_answer_score
		FROM given_answer_stats_cte gasc
		CROSS JOIN public.constant_values_view consts
	) sq
	CROSS JOIN public.constant_values_view consts
)
SELECT * FROM given_answer_score_cte


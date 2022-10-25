-- MIGRATION VERSION: migration9

-- BEGIN TRANSACTION
BEGIN;

-- STORE MIGRATION VERSION
CREATE TABLE IF NOT EXISTS public.migration_version
(
	version_name varchar,
	creation_date timestamptz
);

INSERT INTO public.migration_version
VALUES ('migration9', now()); 

ALTER TABLE public.migration_version 
DROP CONSTRAINT IF EXISTS unique_mig_ver;

ALTER TABLE public.migration_version
ADD CONSTRAINT unique_mig_ver 
UNIQUE (version_name);

-- DROP SOFT SCHEMA

-- DROP VIEWS
DROP VIEW IF EXISTS admin_user_courses_view CASCADE;
DROP VIEW IF EXISTS course_overview_view CASCADE;
DROP VIEW IF EXISTS course_learning_stats_view CASCADE;
DROP VIEW IF EXISTS user_learning_overview_stats_view CASCADE;
DROP VIEW IF EXISTS courses_progress_list_view CASCADE;
DROP VIEW IF EXISTS available_course_view CASCADE;
DROP VIEW IF EXISTS user_video_stats_view CASCADE;
DROP VIEW IF EXISTS user_module_stats_view CASCADE;
DROP VIEW IF EXISTS course_all_items_completed_view CASCADE;
DROP VIEW IF EXISTS playlist_view CASCADE;
DROP VIEW IF EXISTS user_overview_view CASCADE;
DROP VIEW IF EXISTS tempomat_calculation_data_view CASCADE;
DROP VIEW IF EXISTS exam_result_view CASCADE;
DROP VIEW IF EXISTS user_performance_comparison_stats_view CASCADE;
DROP VIEW IF EXISTS user_learning_page_stats_view CASCADE;
DROP VIEW IF EXISTS home_page_stats_view CASCADE;
DROP VIEW IF EXISTS exam_result_stats_view CASCADE;
DROP VIEW IF EXISTS assignable_role_view CASCADE;
DROP VIEW IF EXISTS user_role_assign_company_view CASCADE;
DROP VIEW IF EXISTS role_list_view CASCADE;
DROP VIEW IF EXISTS company_view CASCADE;
DROP VIEW IF EXISTS assignable_permission_view CASCADE;
DROP VIEW IF EXISTS user_permission_view CASCADE;
DROP VIEW IF EXISTS user_course_completion_original_estimation_view CASCADE;
DROP VIEW IF EXISTS pretest_result_view CASCADE;
DROP VIEW IF EXISTS exam_player_data_view CASCADE;
DROP VIEW IF EXISTS course_details_view CASCADE;
DROP VIEW IF EXISTS course_admin_content_view CASCADE;
DROP VIEW IF EXISTS user_engagement_view CASCADE;
DROP VIEW IF EXISTS improve_yourself_page_stats_view CASCADE;
DROP VIEW IF EXISTS admin_home_page_overview_view CASCADE;
DROP VIEW IF EXISTS user_reaction_time_view CASCADE;
DROP VIEW IF EXISTS user_inactive_course_view CASCADE;
DROP VIEW IF EXISTS user_weekly_course_item_progress_view CASCADE;
DROP VIEW IF EXISTS user_daily_course_item_progress_view CASCADE;
DROP VIEW IF EXISTS user_course_recommended_item_quota_view CASCADE;
DROP VIEW IF EXISTS user_course_progress_view CASCADE;
DROP VIEW IF EXISTS course_progress_view CASCADE;
DROP VIEW IF EXISTS user_course_progress_actual_view CASCADE;
DROP VIEW IF EXISTS user_course_completion_current_view CASCADE;
DROP VIEW IF EXISTS user_active_course_view CASCADE;
DROP VIEW IF EXISTS signup_completed_view CASCADE;
DROP VIEW IF EXISTS user_spent_time_ratio_view CASCADE;
DROP VIEW IF EXISTS course_spent_time_view CASCADE;
DROP VIEW IF EXISTS course_admin_short_view CASCADE;
DROP VIEW IF EXISTS user_exam_stats_view CASCADE;
DROP VIEW IF EXISTS user_performance_view CASCADE;
DROP VIEW IF EXISTS user_performance_answer_group_view CASCADE;
DROP VIEW IF EXISTS user_module_performance_view CASCADE;
DROP VIEW IF EXISTS user_module_performance_answer_group_view CASCADE;
DROP VIEW IF EXISTS user_daily_progress_view CASCADE;
DROP VIEW IF EXISTS user_answer_view CASCADE;
DROP VIEW IF EXISTS most_productive_time_range_view CASCADE;
DROP VIEW IF EXISTS exam_completed_view CASCADE;
DROP VIEW IF EXISTS correct_answer_rates_split_view CASCADE;
DROP VIEW IF EXISTS answer_session_group_view CASCADE;
DROP VIEW IF EXISTS answer_session_evaluation_view CASCADE;
DROP VIEW IF EXISTS answer_session_view CASCADE;
DROP VIEW IF EXISTS user_video_practise_progress_view CASCADE;
DROP VIEW IF EXISTS user_video_playback_seconds_view CASCADE;
DROP VIEW IF EXISTS user_session_daily_view CASCADE;
DROP VIEW IF EXISTS user_session_block_view CASCADE;
DROP VIEW IF EXISTS user_latest_activity_view CASCADE;
DROP VIEW IF EXISTS user_daily_activity_chart_view CASCADE;
DROP VIEW IF EXISTS exam_highest_score_answer_session_view CASCADE;
DROP VIEW IF EXISTS daily_tip_view CASCADE;
DROP VIEW IF EXISTS course_state_view CASCADE;
DROP VIEW IF EXISTS course_item_edit_view CASCADE;
DROP VIEW IF EXISTS course_item_count_view CASCADE;
DROP VIEW IF EXISTS course_item_view CASCADE;
DROP VIEW IF EXISTS course_admin_detailed_view CASCADE;
DROP VIEW IF EXISTS company_associated_courses_view CASCADE;
DROP VIEW IF EXISTS coin_transaction_view CASCADE;
DROP VIEW IF EXISTS video_version_view CASCADE;
DROP VIEW IF EXISTS video_player_data_view CASCADE;
DROP VIEW IF EXISTS video_playback_sample_view CASCADE;
DROP VIEW IF EXISTS video_cursor_seconds_view CASCADE;
DROP VIEW IF EXISTS user_session_view CASCADE;
DROP VIEW IF EXISTS user_role_view CASCADE;
DROP VIEW IF EXISTS user_prequiz_answers_view CASCADE;
DROP VIEW IF EXISTS user_practise_recommendation_view CASCADE;
DROP VIEW IF EXISTS user_course_bridge_view CASCADE;
DROP VIEW IF EXISTS user_assigned_auth_item_view CASCADE;
DROP VIEW IF EXISTS signup_question_view CASCADE;
DROP VIEW IF EXISTS shop_item_view CASCADE;
DROP VIEW IF EXISTS shop_item_stateful_view CASCADE;
DROP VIEW IF EXISTS schema_version_view CASCADE;
DROP VIEW IF EXISTS question_data_view CASCADE;
DROP VIEW IF EXISTS prequiz_question_view CASCADE;
DROP VIEW IF EXISTS practise_question_view CASCADE;
DROP VIEW IF EXISTS practise_question_info_view CASCADE;
DROP VIEW IF EXISTS personality_trait_view CASCADE;
DROP VIEW IF EXISTS personality_trait_category_view CASCADE;
DROP VIEW IF EXISTS module_player_view CASCADE;
DROP VIEW IF EXISTS module_edit_view CASCADE;
DROP VIEW IF EXISTS latest_video_view CASCADE;
DROP VIEW IF EXISTS latest_given_answer_view CASCADE;
DROP VIEW IF EXISTS latest_exam_view CASCADE;
DROP VIEW IF EXISTS latest_course_version_view CASCADE;
DROP VIEW IF EXISTS latest_answer_session_view CASCADE;
DROP VIEW IF EXISTS given_answer_view CASCADE;
DROP VIEW IF EXISTS exam_version_view CASCADE;
DROP VIEW IF EXISTS exam_score_view CASCADE;
DROP VIEW IF EXISTS course_video_length_view CASCADE;
DROP VIEW IF EXISTS course_video_count_view CASCADE;
DROP VIEW IF EXISTS course_shop_item_list_view CASCADE;
DROP VIEW IF EXISTS course_rating_question_view CASCADE;
DROP VIEW IF EXISTS course_questions_success_view CASCADE;
DROP VIEW IF EXISTS course_module_overview_view CASCADE;
DROP VIEW IF EXISTS course_length_estimation_view CASCADE;
DROP VIEW IF EXISTS course_item_completion_view CASCADE;
DROP VIEW IF EXISTS course_completion_view CASCADE;
DROP VIEW IF EXISTS constant_values_view CASCADE;
DROP VIEW IF EXISTS company_permission_view CASCADE;
DROP VIEW IF EXISTS comment_list_view CASCADE;
DROP VIEW IF EXISTS coin_balance_view CASCADE;
DROP VIEW IF EXISTS coin_acquire_per_course_view CASCADE;
DROP VIEW IF EXISTS activity_streak_view CASCADE;


-- DROP FUNCTIONS
DROP FUNCTION IF EXISTS acquire_task_lock_fn;
DROP FUNCTION IF EXISTS create_daily_tip_fn;
DROP FUNCTION IF EXISTS get_user_session_first_activity_id;


-- DROP CONSTRAINTS
ALTER TABLE public.coin_transaction DROP CONSTRAINT IF EXISTS coin_transaction_valid_relation_enforce_constraint;
ALTER TABLE public.activation_code DROP CONSTRAINT IF EXISTS activation_code_uniqe_constraint;
ALTER TABLE public.role_permission_bridge DROP CONSTRAINT IF EXISTS role_permission_bridge_constraint;
ALTER TABLE public.role DROP CONSTRAINT IF EXISTS role_constraint;


-- DROP INDICES
DROP INDEX IF EXISTS user_email_unique_index;
DROP INDEX IF EXISTS single_current_course_bridge_unique_index;


-- DROP TRIGGERS



-- TRANSFORM TABLES / MIGRATE DATA
-- TEST MIGRATION 
create table test_table (
	aname varchara
)

-- CREATE SOFT SCHEMA

-- CREATE VIEWS

--CREATE VIEW: activity_streak_view
CREATE VIEW activity_streak_view
AS
SELECT 
	ast.*,
	(EXTRACT (EPOCH FROM ast.end_date - ast.start_date) / 86400)::int AS length_days
FROM activity_streak ast;

--CREATE VIEW: coin_acquire_per_course_view
CREATE VIEW coin_acquire_per_course_view
AS
SELECT
	ct.id,
	ct.user_id,
	co.id course_id,
	SUM(ct.amount)::int amount
FROM public.course co

LEFT JOIN public.course_version cv
ON cv.course_id = co.id

LEFT JOIN public.module_version mv
ON mv.course_version_id = cv.id

LEFT JOIN public.video_version vv
ON vv.module_version_id = mv.id

LEFT JOIN public.exam_version ev
ON ev.module_version_id = mv.id

LEFT JOIN public.question_version qv
ON qv.video_version_id = vv.id 
AND qv.exam_version_id = ev.id

LEFT JOIN public.given_answer ga
ON ga.question_version_id = qv.id

LEFT JOIN public.coin_transaction ct
ON ct.given_answer_id = ga.id

GROUP BY co.id, ct.user_id, ct.id;

--CREATE VIEW: coin_balance_view
CREATE VIEW coin_balance_view
AS
SELECT 
	u.id AS user_id, 
	CASE WHEN SUM(amount) IS NULL THEN 0 ELSE SUM(amount) END AS coin_balance 
FROM public.user u

LEFT JOIN public.coin_transaction ca
ON ca.user_id = u.id

GROUP BY 
	u.id;

--CREATE VIEW: comment_list_view
CREATE VIEW comment_list_view
AS
SELECT
	CASE
		WHEN co.is_anonymous IS NOT TRUE
		THEN CONCAT(all_user.last_name, ' ', all_user.first_name) 
	END full_name,
	sf.file_path avatar_url,
	co.id,
	co.text comment_text,
	co.creation_date,
	vv.video_id,
	co.parent_comment_id,
	co.is_anonymous,
	co.is_question,
	all_user.id user_id,
	owner_user.id current_user_id,

	-- true if owner_user liked the comment
	(l.deletion_date IS NULL AND l.user_id IS NOT NULL) is_like,

	-- count of all likes on the comment
	(
		SELECT
			COUNT(1)
		FROM public.like l
		WHERE l.comment_id = co.id
		AND l.deletion_date IS NULL
	)::int comment_like_count,

	-- virtual thread id for ordering
	CASE
		WHEN co.parent_comment_id IS NULL
		THEN co.id
		ELSE co.parent_comment_id
	END thread_id
FROM public.comment co

LEFT JOIN public.user all_user
ON all_user.id = co.user_id

LEFT JOIN storage_file sf
ON all_user.avatar_file_id = sf.id

LEFT JOIN public.video_version vv
ON vv.id = co.video_version_id

CROSS JOIN public.user owner_user

LEFT JOIN public.like l
ON l.comment_id = co.id
AND l.user_id = owner_user.id
AND l.deletion_date IS NULL

-- first order by threads then creation_date
ORDER BY thread_id, creation_date, parent_comment_id desc;

--CREATE VIEW: company_permission_view
CREATE VIEW company_permission_view
AS

-- select permissions from the 
-- roles assinged to companies
SELECT
	co.id assignee_company_id,
	rab.context_company_id,
    NULL context_course_id,
	rpb.role_id,
	rpb.permission_id permission_id
FROM public.company co

INNER JOIN public.role_assignment_bridge rab
	ON rab.assignee_company_id = co.id

LEFT JOIN public.role r
	ON r.id = rab.role_id

LEFT JOIN public.role_permission_bridge rpb
ON rpb.role_id = r.id

UNION 

-- select permissions assigned to companies
SELECT
	co.id assignee_company_id,
	pab.context_company_id,
    pab.context_course_id,
	NULL::int role_id,
	pab.permission_id permission_id
FROM public.company co

INNER JOIN public.permission_assignment_bridge pab
	ON pab.assignee_company_id = co.id

ORDER BY 
	assignee_company_id,
	context_company_id,
	permission_id;

--CREATE VIEW: constant_values_view
CREATE VIEW constant_values_view
AS
SELECT 
    2.0 incorrect_answer_value_multiplier,
    4.0 question_max_score;

--CREATE VIEW: course_completion_view
CREATE VIEW course_completion_view
AS
SELECT 
	cv.course_id,
	cc.user_id
FROM public.course_completion cc

LEFT JOIN public.course_version cv
ON cv.id = cc.course_version_id

GROUP BY
	cv.course_id,
	cc.user_id
;

--CREATE VIEW: course_item_completion_view
CREATE VIEW course_item_completion_view
AS
WITH 
course_item_completion_cte AS 
(
    SELECT 
		ase.exam_version_id,
		null::int video_version_id,
		ase.user_id,
		ase.id answer_session_id,
		ec.completion_date
	FROM public.exam_completion ec
	LEFT JOIN public.answer_session ase
	ON ase.id = ec.answer_session_id
    UNION ALL
    SELECT 
		null::int exam_version_id,
		vc.video_version_id,
		vc.user_id,
		null::int answer_session_id,
		vc.completion_date
	FROM public.video_completion vc
)
SELECT
    cice.user_id,
    cice.video_version_id,
    vv.video_id,
    cice.exam_version_id,
    ev.exam_id,
    cice.answer_session_id,
    cice.completion_date,
    cv.id course_version_id,
    cv.course_id,
	mv.module_id,
    ex.is_pretest
FROM course_item_completion_cte cice

LEFT JOIN public.video_version vv
ON vv.id = cice.video_version_id

LEFT JOIN public.exam_version ev
ON ev.id = cice.exam_version_id

LEFT JOIN public.exam ex
ON ex.id = ev.exam_id

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id
OR mv.id = ev.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id
;

--CREATE VIEW: course_length_estimation_view
CREATE VIEW course_length_estimation_view
AS
SELECT 
	sq.*,
	sq.total_video_seconds + sq.total_exam_seconds total_length_seconds
FROM
(
	SELECT 
		cv.id course_id,
		(
			SELECT 
				COALESCE(SUM(vd.video_file_length_seconds), 0)::int
			FROM public.video_version vv

			LEFT JOIN public.module_version mv
			ON mv.course_version_id = cv.id AND mv.id = vv.module_version_id
			
			LEFT JOIN public.video_data vd
			ON vd.id = vv.video_data_id

			WHERE mv.course_version_id = cv.id
		) total_video_seconds,
		(
			SELECT 
				COUNT(1)::int * 20 total_exam_seconds 
			FROM public.exam_version ev
			
			LEFT JOIN public.exam e
			ON e.id = ev.exam_id
			
			LEFT JOIN public.module_version mv
			ON mv.course_version_id = cv.id AND mv.id = ev.module_version_id
			
			WHERE e.is_pretest = false
			AND e.is_signup = false
			AND mv.course_version_id = cv.id
		)
	FROM public.course_version cv
) sq;

--CREATE VIEW: course_module_overview_view
CREATE VIEW course_module_overview_view
AS
SELECT 
	co.id course_id,
	mo.id module_id,
	md.name module_name,
	vd.title video_title,
	vd.video_file_length_seconds video_length_seconds
FROM public.course co

LEFT JOIN public.course_version cv
ON cv.course_id = co.id

LEFT JOIN public.module_version mv
ON mv.course_version_id = cv.id

LEFT JOIN public.module_data md
ON md.id = mv.module_data_id

LEFT JOIN public.module mo
ON mo.id = mv.module_id

LEFT JOIN public.video_version vv
ON vv.module_version_id = mv.id

LEFT JOIN public.video_data vd
ON vd.id = vv.video_data_id

WHERE md.order_index != 0

ORDER BY
	co.id,
	md.order_index,
	vd.order_index;

--CREATE VIEW: course_questions_success_view
CREATE VIEW course_questions_success_view
AS
SELECT 
	--sq.*,
	sq.user_id,
	sq.course_id,
	COUNT(sq.latest_given_answer_id)::int total_answer_count,
	SUM((ga.state = 'CORRECT')::int)::int correct_answer_count
FROM 
(
	SELECT 
		u.id user_id,
		c.id course_id,
		vv.id video_version_id,
		qv.id question_version_id,
		MAX(ga.id) latest_given_answer_id
	FROM public.course c
	
	LEFT JOIN public.course_version cv
	ON cv.course_id = c.id

	LEFT JOIN public.user u
	ON true
	
	LEFT JOIN public.module_version mv
	ON mv.course_version_id = cv.id

	LEFT JOIN public.video_version vv
	ON vv.module_version_id = mv.id

	LEFT JOIN public.question_version qv
	ON qv.video_version_id = vv.id

	LEFT JOIN public.answer_session ase
	ON ase.user_id = u.id AND ase.video_version_id = vv.id 

	LEFT JOIN public.given_answer ga
	ON ga.question_version_id = qv.id
		AND ga.answer_session_id = ase.id

	GROUP BY u.id, vv.id, qv.id, c.id
) sq

LEFT JOIN public.given_answer ga
ON ga.id = sq.latest_given_answer_id

GROUP BY sq.user_id, sq.course_id

ORDER BY sq.user_id, sq.course_id;

--CREATE VIEW: course_rating_question_view
CREATE VIEW course_rating_question_view
AS
SELECT 
	u.id user_id,
	co.id course_id,
	crg.id group_id,
	crg.name group_name,
	crq.id question_id,
	crq.text question_text,
	crq.type question_type,
	crqua.value answer_value,
	crqua.text answer_text
FROM public.course_rating_group crg

LEFT JOIN public.course_rating_question crq
ON crq.course_rating_group_id = crg.id

CROSS JOIN public.user u

CROSS JOIN public.course co

LEFT JOIN public.course_rating_question_user_answer crqua
ON crqua.user_id = u.id 
	AND crqua.course_id = co.id 
	AND crqua.course_rating_question_id = crq.id
	
ORDER BY 
	u.id,
	co.id,
	crg.id,
	crq.id;

--CREATE VIEW: course_shop_item_list_view
CREATE VIEW course_shop_item_list_view
AS
SELECT
    cv.course_id,
    cd.title,
    sf.file_path cover_file_path
FROM public.course_version cv

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

WHERE cd.visibility = 'private';

--CREATE VIEW: course_video_count_view
CREATE VIEW course_video_count_view
AS
SELECT 
    COUNT(vv.id)::int video_count, 
    mv.course_version_id
FROM public.video_version vv

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id

GROUP BY mv.course_version_id;

--CREATE VIEW: course_video_length_view
CREATE VIEW course_video_length_view
AS
SELECT 
    mv.course_version_id,
    COALESCE(SUM(vd.video_file_length_seconds), 0)::int sum_length_seconds
FROM public.video v

LEFT JOIN public.video_version vv
ON vv.video_id = v.id

LEFT JOIN public.video_data vd
ON vd.id = vv.video_data_id

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id

-- filter signup exam
WHERE mv.course_version_id IS NOT NULL

GROUP BY
    mv.course_version_id;

--CREATE VIEW: exam_score_view
CREATE VIEW exam_score_view
AS
WITH
flat_cte AS 
(
	SELECT
		ase.user_id,
		ev.id exam_version_id,
		ase.id answer_session_id,
		qv.id question_version_id,
		ga.score,
        qd.max_score question_max_score,
		ed.title
	FROM public.exam_version ev
	
	LEFT JOIN public.exam_data ed
	ON ed.id = ev.exam_data_id 

	INNER JOIN public.answer_session ase
	ON ase.exam_version_id = ev.id
	
	LEFT JOIN public.question_version qv
	ON qv.exam_version_id = ev.id
	
	LEFT JOIN public.question_data qd
	ON qd.id = qv.question_data_id

	LEFT JOIN public.given_answer ga
	ON ga.question_version_id = qv.id
	AND ga.answer_session_id = ase.id
	
	ORDER BY
		ase.user_id,
		ev.id,
		ase.id,
		qv.id
),
grouped_cte AS 
(
	SELECT
		flat.user_id,
		flat.exam_version_id,
		flat.answer_session_id,
		COUNT(*)::int question_count,
		COALESCE(SUM(flat.score), 0)::int exam_score,
		COALESCE(SUM(flat.question_max_score), 0)::int exam_max_score,
		COALESCE(SUM(CASE WHEN flat.score IS NOT NULL THEN 1 ELSE 0 END), 0)::int answered_question_count
	FROM flat_cte flat

	GROUP BY 
		flat.exam_version_id,
		flat.answer_session_id,
		flat.user_id
	
	ORDER BY
		flat.user_id,
		flat.exam_version_id,
		flat.answer_session_id
)
SELECT 
	grouped.*,
	ROUND(grouped.exam_score::numeric / grouped.exam_max_score::numeric * 100, 1)::int score_percentage
FROM grouped_cte grouped;

--CREATE VIEW: exam_version_view
CREATE VIEW exam_version_view
AS
WITH 
latest_version AS
(
	SELECT MAX(id) id, exam_id
	FROM public.exam_version
	GROUP BY exam_id
)
SELECT 
	v.id exam_id,
	vv.id exam_version_id,
	vd.id exam_data_id,
	mv.id module_version_id,
	mv.course_version_id
FROM latest_version lv

LEFT JOIN public.exam v
ON v.id = lv.exam_id

LEFT JOIN public.exam_version vv
ON vv.id = lv.id

LEFT JOIN public.exam_data vd
ON vd.id = vv.exam_data_id

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id
;

--CREATE VIEW: given_answer_view
CREATE VIEW given_answer_view
AS
SELECT 
	ev.id exam_version_id,
	vv.id video_version_id,
	qv.id question_version_id,
	av.id answer_version_id,
	av.answer_id,
    ad.is_correct
FROM public.question_version qv

LEFT JOIN public.exam_version ev
ON ev.id = qv.exam_version_id

LEFT JOIN public.video_version vv
ON vv.id = qv.video_version_id

LEFT JOIN public.answer_version av
ON av.question_version_id = qv.id

LEFT JOIN public.answer_data ad
ON ad.id = av.answer_data_id

ORDER BY 
	ev.id,
    vv.id,
    qv.id,
	av.id;

--CREATE VIEW: latest_answer_session_view
CREATE VIEW latest_answer_session_view
AS
SELECT 
    ase.user_id,
    ase.exam_version_id,
    ase.video_version_id,
    MAX(ase.id) answer_session_id
FROM public.answer_session ase
WHERE ase.exam_version_id IS NOT NULL 
OR ase.video_version_id IS NOT NULL
GROUP BY
    ase.user_id,
    ase.exam_version_id,
    ase.video_version_id;

--CREATE VIEW: latest_course_version_view
CREATE VIEW latest_course_version_view
AS
SELECT MAX(cv.id) version_id, cv.course_id
FROM public.course_version cv
GROUP BY cv.course_id;

--CREATE VIEW: latest_exam_view
CREATE VIEW latest_exam_view
AS
SELECT 
    ev.exam_id,
    MAX(ev.id) exam_version_id,
    cv.course_id,
    ex.is_pretest
FROM public.exam_version ev

LEFT JOIN public.exam ex
ON ex.id = ev.exam_id

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id

GROUP BY 
	ev.exam_id,
	cv.course_id,
	ex.is_pretest;

--CREATE VIEW: latest_given_answer_view
CREATE VIEW latest_given_answer_view
AS
SELECT 
	MAX(ga.id) given_answer_id,
	ga.question_version_id,
	ase.user_id
FROM public.given_answer ga

LEFT JOIN public.answer_session ase
ON ase.id = ga.answer_session_id

GROUP BY
	ase.user_id,
	ga.question_version_id;

--CREATE VIEW: latest_video_view
CREATE VIEW latest_video_view
AS
SELECT 
    vv.video_id,
    MAX(vv.id) video_version_id,
    cv.course_id
FROM public.video_version vv

LEFT JOIN public.video vi
ON vi.id = vv.video_id

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id

GROUP BY 
	vv.video_id,
	cv.course_id;

--CREATE VIEW: module_edit_view
CREATE VIEW module_edit_view
AS
SELECT 
	mv.id module_version_id,
	mv.module_id,
	mv.course_version_id,
	mod.is_pretest_module,
	md.name,
	md.description,
	md.order_index,
	sf.file_path cover_file_path
FROM public.module_version mv

LEFT JOIN public.module_data md
ON md.id = mv.module_data_id

LEFT JOIN public.module mod
ON mod.id = mv.module_id

LEFT JOIN public.storage_file sf
ON sf.id = md.image_file_id

ORDER BY
	md.order_index;

--CREATE VIEW: module_player_view
CREATE VIEW module_player_view
AS
WITH
latest_module_version_ids AS 
(
	SELECT MAX(mv.id) version_id, mv.module_id
	FROM public.module_version mv
	GROUP BY mv.module_id
)
SELECT 
	mo.id module_id,
	mv.id module_version_id,
	sf.file_path image_file_path,
	md.order_index,
	md.name,
	md.description
FROM public.module mo

LEFT JOIN latest_module_version_ids lmvi
ON lmvi.module_id = mo.id

LEFT JOIN public.module_version mv
ON mv.id = lmvi.version_id

LEFT JOIN public.module_data md
ON md.id = mv.module_data_id

LEFT JOIN public.storage_file sf
ON sf.id = md.image_file_id

WHERE md.order_index != 0


;

--CREATE VIEW: personality_trait_category_view
CREATE VIEW personality_trait_category_view
AS
SELECT 
	ptc.*,
	(
		SELECT COUNT(dt.id)::int
		FROM public.daily_tip dt 
		WHERE dt.is_max = false 
			AND dt.personality_trait_category_id = ptc.id 
	) min_tips_count,
	(
		SELECT COUNT(dt.id)::int
		FROM public.daily_tip dt 
		WHERE dt.is_max = true 
			AND dt.personality_trait_category_id = ptc.id 
	) max_tips_count
FROM public.personality_trait_category ptc;

--CREATE VIEW: personality_trait_view
CREATE VIEW personality_trait_view
AS
WITH 
latest_question_versions AS
(
	SELECT 
		qv.id version_id, 
		qv.personality_trait_category_id
	FROM public.question_version qv
	
	WHERE qv.personality_trait_category_id IS NOT NULL
	
),
latest_given_answer AS
(
	SELECT 
		MAX(ga.id) ga_id, 
		ga.question_version_id, 
		ase.user_id
	FROM public.given_answer ga
	
	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id
	
	GROUP BY ga.question_version_id, ase.user_id
),
calc_scores AS
(
	SELECT
		u.id user_id,
		u.email,
		ptc.id personality_trait_category_id,
		COUNT(ga.id) given_answer_count,
		COALESCE(SUM((ga.state = 'CORRECT')::int), 0)::int max_score,
		COALESCE(SUM((ga.state <> 'CORRECT')::int), 0)::int min_score
	FROM public.personality_trait_category ptc
	
	CROSS JOIN public.user u
	
	LEFT JOIN latest_question_versions lqv
	ON lqv.personality_trait_category_id = ptc.id
	
	LEFT JOIN public.question_version qv
	ON qv.id = lqv.version_id
	
	LEFT JOIN latest_given_answer lga
	ON lga.question_version_id = qv.id 
	AND lga.user_id = u.id
	
	LEFT JOIN public.given_answer ga
	ON ga.id = lga.ga_id
	
	GROUP BY 
		u.id,
		ptc.id
	
	ORDER BY 
		u.id,
		ptc.id
)
SELECT 
	u.id user_id,
	ptc.id trait_category_id,
	ptc.title trait_category_title,
	cs.max_score,
	cs.min_score,
	CASE WHEN cs.max_score > cs.min_score 
		THEN ptc.max_label 
		ELSE ptc.min_label
	END active_label,
	CASE WHEN cs.max_score > cs.min_score 
		THEN ptc.max_description 
		ELSE ptc.min_description
	END active_description,
	ptc.min_label,
	ptc.max_label,
	ptc.min_description,
	ptc.max_description
FROM public.personality_trait_category ptc

CROSS JOIN public.user u

LEFT JOIN calc_scores cs
ON cs.personality_trait_category_id = ptc.id 
AND cs.user_id = u.id

ORDER BY 
	u.id
;

--CREATE VIEW: practise_question_info_view
CREATE VIEW practise_question_info_view
AS
WITH
latest_given_answer_cte AS
(
    SELECT
        ase.user_id,
        ga.question_version_id,
        MAX(ga.id) latest_id,
        COUNT(*)::int answer_count,
        SUM(CASE WHEN ga.is_practise_answer THEN 1 ELSE 0 END)::int practise_answer_count
    FROM given_answer ga

    LEFT JOIN public.answer_session ase
    ON ase.id = ga.answer_session_id
        
    INNER JOIN public.question_version qv
    ON qv.id = ga.question_version_id
    AND qv.video_version_id IS NOT NULL

    GROUP BY
        ga.question_version_id,
        ase.user_id

    ORDER BY
        ase.user_id
)
SELECT
    lgac.user_id,
    qv.question_id,
    lgac.question_version_id,
    lgac.answer_count,
    lgac.practise_answer_count,
    latest_ga.creation_date given_answer_date,
    latest_ga.id given_answer_id,
    latest_ga.state = 'CORRECT' is_correct,
    ase.is_practise is_practise
FROM latest_given_answer_cte lgac

LEFT JOIN public.given_answer latest_ga
ON latest_ga.id = lgac.latest_id

LEFT JOIN public.answer_session ase
ON ase.id = latest_ga.answer_session_id

INNER JOIN public.question_version qv
ON qv.id = latest_ga.question_version_id


;

--CREATE VIEW: practise_question_view
CREATE VIEW practise_question_view
AS
WITH
practise_question_ids AS 
(
	SELECT 
		qv.question_id, 
		ase.user_id,
		COUNT(ga.id) given_answer_count,
		MAX(ga.id) latest_given_answer_id
	FROM public.question_version qv

	INNER JOIN public.given_answer ga
	ON ga.question_version_id = qv.id

	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id

	WHERE qv.video_version_id IS NOT NULL
	
	GROUP BY 
		qv.question_id, 
		ase.user_id
),
practise_question_counts AS 
(
	SELECT 
		pqi.question_id,
		pqi.user_id,
		COUNT(ga.id) practise_answer_count
	FROM practise_question_ids pqi
	
	LEFT JOIN public.question_version qv
	ON qv.question_id = pqi.question_id
	
	LEFT JOIN public.given_answer ga
	ON ga.question_version_id = qv.id
	
	INNER JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id
	AND ase.is_practise
	
	GROUP BY 
		pqi.question_id,
		pqi.user_id
),
practise_questions AS
(
	SELECT 
		pqi.question_id, 
		pqi.user_id,
		pqi.given_answer_count,
		pqi.latest_given_answer_id
	FROM practise_question_ids pqi
	
	LEFT JOIN practise_question_counts pqc
	ON pqc.question_id = pqi.question_id
	AND pqc.user_id = pqi.user_id
	
	LEFT JOIN public.given_answer ga
	ON ga.id = pqi.latest_given_answer_id
	
	WHERE (pqc.practise_answer_count < 2) AND 
	(
		(
			-- incorrect video answer 
			ga.is_practise_answer = false 
			AND  
			ga.state <> 'CORRECT'
			AND 
			ga.creation_date + INTERVAL '5 MINUTES' < NOW() 
		)
		OR
		(
			-- correct video answer 
			ga.is_practise_answer = false 
			AND  
			ga.state = 'CORRECT'
			AND 
			ga.creation_date + INTERVAL '20 MINUTES' < NOW() 
		)
		OR
		(
			-- incorrect practise answer 
			ga.is_practise_answer = true 
			AND  
			ga.state <> 'CORRECT'
			AND 
			ga.creation_date + INTERVAL '60 MINUTES' < NOW() 
		)
	)
),
latest_question_version AS 
(
	SELECT 
		MAX(qv.id) version_id, 
		qv.question_id
	FROM public.question_version qv
	GROUP BY qv.question_id
)
SELECT
	qv.id question_version_id,
	qd.question_text,
	qd.type_id question_type_id,
	av.id answer_id,
	ad.text answer_text,
	pq.user_id,
	pq.latest_given_answer_id,
	pq.given_answer_count
FROM practise_questions pq

LEFT JOIN latest_question_version lqv
ON lqv.question_id = pq.question_id

LEFT JOIN public.question_version qv
ON qv.id = lqv.version_id

LEFT JOIN public.question_data qd
ON qd.id = qv.question_data_id

LEFT JOIN public.answer_version av
ON av.question_version_id = qv.id

LEFT JOIN public.answer_data ad
ON ad.id = av.answer_data_id













;

--CREATE VIEW: prequiz_question_view
CREATE VIEW prequiz_question_view
AS
SELECT 
	pq.id question_id,
	pq.text question_text,
	pq.is_numeric_answer is_numeric_answer,
	pq.min_value,
	pq.max_value,
	pq.min_label,
	pq.max_label,
	pq.step_value,
	pq.value_postfix,
	pa.id answer_id,
	pa.text answer_text
FROM public.prequiz_question pq

LEFT JOIN public.prequiz_answer pa
ON pa.question_id = pq.id

ORDER BY 
	pq.id,
	pa.id;

--CREATE VIEW: question_data_view
CREATE VIEW question_data_view
AS
SELECT
    ev.id exam_version_id,
	vv.id video_version_id,
	mv.course_version_id course_version_id,
    qv.question_id,
    qv.id question_version_id,
    qd.id question_data_id,
    qd.question_text,
	qd.image_url,
	qd.order_index,
	qd.show_up_time_seconds,
	qd.type_id,
    ad.text answer_text,
    av.id answer_version_id,
    av.answer_id answer_id
FROM public.question_version qv

LEFT JOIN public.exam_version ev
ON ev.id = qv.exam_version_id

LEFT JOIN public.video_version vv
ON vv.id = qv.video_version_id

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id
OR mv.id = vv.module_version_id

LEFT JOIN public.question_data qd
ON qd.id = qv.question_data_id

LEFT JOIN public.answer_version av
ON av.question_version_id = qv.id

LEFT JOIN public.answer_data ad
ON ad.id = av.answer_data_id;

--CREATE VIEW: schema_version_view
CREATE VIEW schema_version_view
AS
SELECT '18:40:53 2022-10-23 CEDT' last_modification_date, '0.01' version
;

--CREATE VIEW: shop_item_stateful_view
CREATE VIEW shop_item_stateful_view
AS
SELECT 
	sq.*,
	CASE WHEN sq.course_id IS NULL 
		THEN sq.purchase_count < sq.purchase_limit
		ELSE sq.purchase_count = 0 
	END AS can_purchase 
FROM 
(
	SELECT
		si.id,
		u.id AS user_id,
		(
			SELECT COUNT(id)::integer FROM public.coin_transaction ct
			WHERE ct.shop_item_id = si.id AND ct.user_id = u.id
		) AS purchase_count,
		si.course_id,
		CASE WHEN cv.id IS NULL 
			THEN si.name 
			ELSE cd.title
		END AS name,
		si.purchase_limit,
		si.coin_price,
		si.currency_price,
		sic.id AS shop_item_category_id,
		sic.name AS shop_item_category_name,
		si.details_url AS details_url,
		CASE WHEN cv.id IS NULL 
			THEN sisf.file_path
			ELSE cosf.file_path
		END AS cover_file_path
	FROM shop_item si

	LEFT JOIN public.user u
	ON 1 = 1

	LEFT JOIN public.course_version cv
	ON cv.id = si.course_id
	
	LEFT JOIN public.course_data cd
	ON cd.id = cv.course_data_id

	LEFT JOIN public.shop_item_category sic
	ON sic.id = si.shop_item_category_id

	LEFT JOIN public.storage_file sisf
	ON sisf.id = si.cover_file_id

	LEFT JOIN public.storage_file cosf
	ON cosf.id = cd.cover_file_id

	ORDER BY user_id, id
) sq;

--CREATE VIEW: shop_item_view
CREATE VIEW shop_item_view
AS
SELECT
	si.id,
	si.course_id,
	CASE WHEN cv.id IS NULL 
		THEN si.name 
		ELSE cd.title
	END AS name,
	si.purchase_limit,
	si.coin_price,
	si.currency_price,
	sic.id AS shop_item_category_id,
	sic.name AS shop_item_category_name,
	CASE WHEN cv.id IS NULL 
		THEN sisf.file_path
		ELSE cosf.file_path
	END AS cover_file_path
FROM shop_item si

LEFT JOIN public.course_version cv
ON cv.id = si.course_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.shop_item_category sic
ON sic.id = si.shop_item_category_id

LEFT JOIN public.storage_file sisf
ON sisf.id = si.cover_file_id

LEFT JOIN public.storage_file cosf
ON cosf.id = cd.cover_file_id

ORDER BY id;

--CREATE VIEW: signup_question_view
CREATE VIEW signup_question_view
AS
WITH 
latest_signup_exam_version AS
(
	SELECT MAX(ev.id) version_id
	FROM public.exam_version ev
	INNER JOIN public.exam e
	ON e.id = ev.exam_id AND e.is_signup
),
latest_given_answer_ids AS
(
	SELECT 
		MAX(ga.id) given_answer_id,
		ase.id answer_session_id,
		ga.question_version_id
	FROM public.given_answer ga
	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id
	GROUP BY
		ase.id,
		ga.question_version_id
)
SELECT 
	u.id user_id,
	qv.question_id,
	qv.id question_version_id,
	qd.question_text question_text,
	qd.image_url image_url,
	qd.type_id type_id,
	av.answer_id,
	av.id answer_version_id,
	ad.text answer_text,
	lgai.given_answer_id,
	ga.state = 'CORRECT' is_correct,
	agab.answer_version_id given_answer_version_id,
	agab.answer_version_id = av.id is_given_answer 
FROM latest_signup_exam_version lsev

CROSS JOIN public.user u

LEFT JOIN public.exam_version ev
ON ev.id = lsev.version_id

LEFT JOIN public.question_version qv
ON qv.exam_version_id = ev.id

LEFT JOIN public.answer_version av
ON av.question_version_id = qv.id

LEFT JOIN public.answer_session ase
ON ase.user_id = u.id
AND ase.exam_version_id = ev.id
	
LEFT JOIN latest_given_answer_ids lgai
ON lgai.question_version_id = qv.id
AND lgai.answer_session_id = ase.id

LEFT JOIN public.given_answer ga
ON ga.id = lgai.given_answer_id
	
LEFT JOIN public.answer_given_answer_bridge agab
ON agab.given_answer_id = lgai.given_answer_id

LEFT JOIN public.answer_data ad
ON ad.id = av.answer_data_id

LEFT JOIN public.question_data qd
ON qd.id = qv.question_data_id

ORDER BY
	 u.id,
	 md5(qv.id || '1'), -- randomize
	 av.id
	 
	;

--CREATE VIEW: user_assigned_auth_item_view
CREATE VIEW user_assigned_auth_item_view
AS
SELECT * FROM 
(
	SELECT assignee_user_id, permission_id, null role_id, context_company_id, false is_role
	FROM permission_assignment_bridge
	UNION 
	SELECT assignee_user_id, null permission_id, role_id, context_company_id, true is_role
	FROM role_assignment_bridge
) sq

WHERE sq.assignee_user_id IS NOT NULL ;

--CREATE VIEW: user_course_bridge_view
CREATE VIEW user_course_bridge_view
AS
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
	ucb.start_date::date start_date,
	ucb.previsioned_completion_date::date previsioned_completion_date,
	ucb.previsioned_completion_date::date - ucb.start_date::date previsioned_length_days,
	ucb.required_completion_date::date required_completion_date,
	ucb.required_completion_date::date - CURRENT_DATE required_length_days
FROM public.user_course_bridge ucb;

--CREATE VIEW: user_practise_recommendation_view
CREATE VIEW user_practise_recommendation_view
AS
WITH 

-- get the latest given answer id per question_version 
latest_given_answer_ids AS 
(
	SELECT 
		MAX(ga.id) given_answer_id, 
		ga.question_version_id,
		ase.user_id
	FROM given_answer ga
	
	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id
	
	GROUP BY 
		ga.question_version_id,
		ase.user_id
),

-- get the total, and correct given 
-- answer counts from all given answers 
-- even from the practise section on home screen 
answer_counts AS
(
	SELECT 
		vv.id video_version_id,
		COUNT(ga.id) total_given_answer_count,
		SUM((ga.state = 'CORRECT')::int) total_correct_answer_count
	FROM public.video_version vv
	
	LEFT JOIN public.question_version qv
	ON qv.video_version_id = vv.id
	
	LEFT JOIN public.given_answer ga
	ON ga.question_version_id = qv.id
	
	GROUP BY 
		vv.id,
		ga.question_version_id
),

-- calculate if video is recommended for 
-- practise by checking if all question - answers are correct
-- even if they're answered in the practise dialog on home page
video_is_recommended AS
(
	SELECT 
		vv.id video_version_id,
		ase.user_id,
		SUM((ga.state = 'CORRECT')::int) != COUNT(ga.id) is_recommended
	FROM public.video_version vv
	
	LEFT JOIN public.question_version qv
	ON qv.video_version_id = vv.id
	
	LEFT JOIN latest_given_answer_ids lgai
	ON lgai.question_version_id = qv.id
	
	LEFT JOIN public.given_answer ga
	ON ga.id = lgai.given_answer_id
	
	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id
	
	GROUP BY
		vv.id,
		ase.user_id
)
SELECT 
    vv.id video_version_id,
	vv.video_id,
    vir.user_id,
	cv.id course_version_id,
    ac.total_given_answer_count::int,
    ac.total_correct_answer_count::int,
    vir.is_recommended is_recommended_for_practise
FROM public.video_version vv

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id
	
LEFT JOIN video_is_recommended vir
ON vir.video_version_id = vv.id

LEFT JOIN answer_counts ac
ON ac.video_version_id = vv.id;

--CREATE VIEW: user_prequiz_answers_view
CREATE VIEW user_prequiz_answers_view
AS
WITH 
prequiz_question_answers_cte AS
(
	SELECT 
		pua.user_id,
		pua.course_id,
		pua.question_id,
		pua.value raw_value,
		pa.value answer_value,
		pa.id answer_id
	FROM public.prequiz_user_answer pua

	LEFT JOIN public.prequiz_answer pa
	ON pa.id = pua.answer_id
    
    ORDER BY 
        user_id, 
        course_id,
        question_id
)
SELECT 
	ucb.user_id,
	ucb.course_id,
	(
		SELECT pqa.raw_value
		FROM prequiz_question_answers_cte pqa
		WHERE pqa.user_id = ucb.user_id 
			AND pqa.course_id = ucb.course_id
			AND pqa.question_id = 1
	) experience,
	(
		SELECT pqa.answer_id
		FROM prequiz_question_answers_cte pqa
		WHERE pqa.user_id = ucb.user_id 
			AND pqa.course_id = ucb.course_id
			AND pqa.question_id = 2
	) planned_usage_answer_id,
	(
		SELECT ROUND((pqa.raw_value * 60) / 7)
		FROM prequiz_question_answers_cte pqa
		WHERE pqa.user_id = ucb.user_id 
			AND pqa.course_id = ucb.course_id
			AND pqa.question_id = 3
	) estimated_minutes_per_day
FROM public.user_course_bridge ucb

ORDER BY
	ucb.user_id,
	ucb.course_id;

--CREATE VIEW: user_role_view
CREATE VIEW user_role_view
AS
WITH 
god_roles AS
(
	SELECT 
		u.id assignee_user_id,
		NULL::int assignment_bridge_id,
		co.id context_company_id,
		ro.id role_id,
		false is_inherited
	FROM public.company co
	
	LEFT JOIN public.role ro
	ON ro.is_custom = false OR ro.company_id = co.id
	
	INNER JOIN public.user u
	ON u.is_god
),
assigned_roles AS
(
	SELECT 
		u.id assignee_user_id,
		rab.id assignment_bridge_id,
		rab.context_company_id,
		rab.role_id,
		false is_inherited
	FROM public.user u
	
	INNER JOIN public.role_assignment_bridge rab
	ON rab.assignee_user_id = u.id
),
comp_inherited_roles AS 
(
	SELECT 
		u.id assignee_user_id,
		rab.id assignment_bridge_id,
		rab.context_company_id,
		rab.role_id,
		true is_inherited
	FROM public.user u
	
	INNER JOIN public.role_assignment_bridge rab
	ON rab.assignee_company_id = u.company_id
),
all_roles AS 
(
	SELECT * FROM god_roles
	UNION
	SELECT * FROM assigned_roles 
	UNION
	SELECT * FROM comp_inherited_roles
)
SELECT 
	all_roles.assignment_bridge_id,
	co.id context_company_id,
	co.name context_company_name,
	ro.id role_id,
	ro.name role_name,
	u.id assignee_user_id,
	all_roles.is_inherited,
	pe.id permission_id,
	pe.code permission_code
FROM all_roles

LEFT JOIN public.company co
ON co.id = all_roles.context_company_id 

LEFT JOIN public.role ro
ON ro.id = all_roles.role_id

LEFT JOIN public.user u
ON u.id = all_roles.assignee_user_id

LEFT JOIN public.role_permission_bridge rpb
ON rpb.role_id = all_roles.role_id 

LEFT JOIN public.permission pe 
ON pe.id = rpb.permission_id 

ORDER BY
	u.id,
	co.id,
	ro.id
	
	;

--CREATE VIEW: user_session_view
CREATE VIEW user_session_view
AS
SELECT 
	acse.*,
	EXTRACT(EPOCH FROM (acse.end_date - acse.start_date))::int AS length_seconds 
FROM public.activity_session AS acse
;

--CREATE VIEW: video_cursor_seconds_view
CREATE VIEW video_cursor_seconds_view
AS
SELECT
    vv.id video_version_id,
    u.id user_id,
    CASE WHEN MAX(vps.to_seconds) IS NULL
        THEN 0
        ELSE MAX(vps.to_seconds)
    END to_seconds
FROM public.video_version vv

CROSS JOIN public.user u

LEFT JOIN public.video_playback_sample vps
ON vps.video_version_id = vv.id 
AND vps.user_id = u.id
AND vps.from_seconds < 1
    
GROUP BY 
    vv.id,
    u.id
	
ORDER BY 
    u.id,
	vv.id;

--CREATE VIEW: video_playback_sample_view
CREATE VIEW video_playback_sample_view
AS
SELECT 
	vps.id,
	vps.video_version_id,
	vps.user_id,
	vps.from_seconds,
	vps.to_seconds,
	vps.creation_date,
	ROUND ((vps.to_seconds - vps.from_seconds)::numeric, 3) total_playback_duration
FROM public.video_playback_sample vps
;

--CREATE VIEW: video_player_data_view
CREATE VIEW video_player_data_view
AS
SELECT 
	vv.video_id video_id,
	vv.id video_version_id,
	vd.id video_data_id,
	mv.id module_version_id,
	mv.course_version_id,
    vd.subtitle,
    vd.title,
    vd.description,
    sf.file_path thumbnail_url,
    sf2.file_path video_file_path
FROM public.video_version vv

LEFT JOIN public.video_data vd
ON vd.id = vv.video_data_id

LEFT JOIN public.storage_file sf
ON sf.id = vd.thumbnail_file_id

LEFT JOIN public.storage_file sf2
ON sf2.id = vd.video_file_id

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id

;

--CREATE VIEW: video_version_view
CREATE VIEW video_version_view
AS
WITH 
latest_version AS
(
	SELECT MAX(id) id, video_id
	FROM public.video_version
	GROUP BY video_id
)
SELECT 
	v.id video_id,
	vv.id video_version_id,
	vd.id video_data_id,
	mv.id module_version_id,
	mv.course_version_id
FROM latest_version lv

LEFT JOIN public.video v
ON v.id = lv.video_id

LEFT JOIN public.video_version vv
ON vv.id = lv.id

LEFT JOIN public.video_data vd
ON vd.id = vv.video_data_id

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id
;

--CREATE VIEW: coin_transaction_view
CREATE VIEW coin_transaction_view
AS
SELECT 
	ca.id,
	ca.user_id,
	ca.creation_date,
	ca.amount,
	vd.title video_title,
	qd.question_text question_text,
	sisv.name shop_item_name,
	CASE WHEN ca.activity_session_id IS NOT NULL
		THEN 'activity'
		ELSE CASE WHEN ca.video_id IS NOT NULL
			THEN 'video_watched'
			ELSE CASE WHEN ca.given_answer_id IS NOT NULL
				THEN 'correct_answer'
				ELSE CASE WHEN ca.given_answer_streak_id IS NOT NULL
					THEN 'answer_streak'
					ELSE CASE WHEN ca.activity_streak_id IS NOT NULL 
						THEN 'activity_streak'
						ELSE CASE WHEN ca.shop_item_id IS NOT NULL 
							THEN 'shop_item_purchase'
							ELSE CASE WHEN ca.is_gifted
								THEN 'gifted'
								ELSE 'unknown'
							END
						END
					END
				END 
			END 
		END 
	END reason
FROM public.coin_transaction ca

-- video info
LEFT JOIN public.video v ON v.id = ca.video_id
LEFT JOIN public.video_version vv ON vv.video_id = v.id
LEFT JOIN public.video_data vd ON vd.id = vv.video_data_id

-- question info
LEFT JOIN public.given_answer ga ON ga.id = ca.given_answer_id
LEFT JOIN public.question_version qv ON qv.id = ga.question_version_id
LEFT JOIN public.question_data qd ON qd.id = qv.question_data_id

-- shop item info
LEFT JOIN public.shop_item_stateful_view sisv ON sisv.id = ca.shop_item_id AND sisv.user_id = ca.user_id

ORDER BY 
	creation_date DESC
;

--CREATE VIEW: company_associated_courses_view
CREATE VIEW company_associated_courses_view
AS
SELECT 
    com.id company_id,
    co.id course_id,
    co.deletion_date IS NOT NULL is_deleted,
    cv.id course_version_id,
    cab.id IS NOT NULL is_assigned,
    pab.id IS NOT NULL is_default,
    cover_file.file_path cover_file_path,
    cd.title
FROM public.company com 

CROSS JOIN public.course co 

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.course_id = co.id

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id 

LEFT JOIN public.course_access_bridge cab
ON cab.course_id = co.id 
AND cab.company_id = com.id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.storage_file cover_file
ON cover_file.id = cd.cover_file_id

LEFT JOIN public.permission pe
ON pe.code = 'WATCH_COURSE'

LEFT JOIN public.permission_assignment_bridge pab
ON pab.assignee_company_id = com.id
AND pab.permission_id = pe.id
AND pab.context_course_id = co.id

ORDER BY 
    com.id,
    cab.id IS NOT NULL DESC,
    co.id;

--CREATE VIEW: course_admin_detailed_view
CREATE VIEW course_admin_detailed_view
AS
SELECT 
	lcvv.course_id,
    cd.title title,
    cd.short_description short_description,
    cd.description description,
    cd.difficulty difficulty,
    cd.benchmark benchmark,
    cd.previously_completed_count previously_completed_count,
    cd.language language_name,
    cd.technical_requirements technical_requirements,
	cd.skill_benefits skill_benefits,
	cd.visibility visibility,
	cd.human_skill_benefits human_skill_benefits,
	cd.human_skill_benefits_description human_skill_benefits_description,
	cd.requirements_description technical_requirements_description,
	
	-- cat 
	cc.id category_id,
	cc.name category_name,
	
	-- subcat
	scc.id sub_category_id,
	scc.name sub_category_name,
	
	-- teacher 
	tea.id teacher_id,
	tea.first_name teacher_first_name,
	tea.last_name teacher_last_name,
	sf.file_path cover_file_path
FROM public.latest_course_version_view lcvv

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

LEFT JOIN public.user tea
ON tea.id = cd.teacher_id

LEFT JOIN public.course_category cc
ON cc.id = cd.category_id

LEFT JOIN public.course_category scc
ON scc.id = cd.sub_category_id
	
ORDER BY
	lcvv.course_id;

--CREATE VIEW: course_item_view
CREATE VIEW course_item_view
AS
WITH
exam_item AS
(
	SELECT
		mv.course_version_id,
		NULL::int video_version_id,
		NULL::int video_id,
		ev.id exam_version_id,
		e.id exam_id,
		mv.id module_version_id,
		ed.order_index item_order_index,
		ed.title item_title,
		ed.subtitle item_subtitle,
		CASE 
			WHEN e.is_signup THEN 'signup'
			WHEN e.is_pretest THEN 'pretest'
			WHEN ed.is_final THEN 'final'
			ELSE 'exam'
		END item_type,
		'exam_version@' || ev.id version_code
	FROM public.exam_version ev

	LEFT JOIN public.module_version mv
	ON mv.id = ev.module_version_id

	LEFT JOIN public.exam e
	ON e.id = ev.exam_id

	LEFT JOIN public.exam_data ed
	ON ed.id = ev.exam_data_id
),
video_item AS
(
	SELECT
		mv.course_version_id,
		vv.id video_version_id,
		v.id video_id,
		NULL::int exam_version_id,
		NULL::int exam_id,
		mv.id module_version_id,
		vd.order_index item_order_index,
		vd.title item_title,
		vd.subtitle item_subtitle,
		'video' item_type,
		'video_version@' || vv.id version_code
	FROM public.video_version vv

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id

	LEFT JOIN public.video_data vd
	ON vd.id = vv.video_data_id

	LEFT JOIN public.video v
	ON v.id = vv.video_id
),
items_combined AS
(
	SELECT * FROM video_item
	UNION ALL
	SELECT * FROM exam_item
)
SELECT
	cv.id course_version_id,
	md.name module_name,
	md.order_index module_order_index,
	mv.id module_version_id,
	mo.id module_id,
	ic.video_version_id,
	ic.video_id,
	ic.exam_version_id,
	ic.exam_id,
	ic.item_order_index,
	ic.item_title,
	ic.item_subtitle,
	ic.item_type,
	ic.version_code
FROM public.latest_course_version_view lcvv

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.module_version mv
ON mv.course_version_id = cv.id

LEFT JOIN public.module_data md
ON md.id = mv.module_data_id

LEFT JOIN public.module mo
ON mo.id = mv.module_id

INNER JOIN items_combined ic
ON ic.course_version_id = cv.id
AND ic.module_version_id = mv.id

ORDER BY
	cv.id,
	md.order_index,
	ic.item_order_index
;

--CREATE VIEW: course_item_count_view
CREATE VIEW course_item_count_view
AS
SELECT 
	co.id course_id,
	COUNT(*)::int item_count
FROM public.course co 

LEFT JOIN public.course_version cv
ON cv.course_id = co.id

LEFT JOIN public.course_item_view civ
ON civ.course_version_id = cv.id 
	AND civ.item_type != 'pretest'

GROUP BY
	co.id
	
ORDER BY
	co.id;

--CREATE VIEW: course_item_edit_view
CREATE VIEW course_item_edit_view
AS
SELECT 
	civ.exam_version_id,
	civ.video_version_id,
    CASE WHEN civ.item_type = 'video' 
		THEN vd.title
		ELSE ed.title 
	END title,
    vd.subtitle,
	vd.video_file_length_seconds video_length_seconds,
	sf.file_path video_file_path,
	qv.id question_version_id,
    qd.question_text question_text,
    qd.show_up_time_seconds question_show_up_time_seconds,
    av.id answer_version_id,
    ad.text answer_text,
    ad.is_correct answer_is_correct,
	qd.module_id
FROM public.course_item_view civ

LEFT JOIN public.question_version qv
ON qv.exam_version_id = civ.exam_version_id
OR qv.video_version_id = civ.video_version_id

LEFT JOIN public.question_data qd
ON qd.id = qv.question_data_id

LEFT JOIN public.answer_version av
ON av.question_version_id = qv.id

LEFT JOIN public.answer_data ad 
ON ad.id = av.answer_data_id

LEFT JOIN public.video_version vv
ON vv.id = civ.video_version_id

LEFT JOIN public.video_data vd
ON vd.id = vv.video_data_id

LEFT JOIN public.exam_version ev
ON ev.id = civ.exam_version_id

LEFT JOIN public.video_data ed
ON ed.id = ev.exam_data_id

LEFT JOIN public.storage_file sf
ON sf.id = vd.video_file_id

ORDER BY
	civ.video_version_id,
	civ.exam_version_id,
	qv.id;

--CREATE VIEW: course_state_view
CREATE VIEW course_state_view
AS
WITH 
sq as 
(
    SELECT 
        ucb.*,
        ucb.id IS NOT NULL has_bridge,
        ccv.user_id IS NOT NULL is_completed
    FROM public.course co

    CROSS JOIN public.user u

    LEFT JOIN public.course_completion_view ccv
    ON ccv.course_id = co.id
    AND ccv.user_id = u.id
        
    INNER JOIN public.user_course_bridge ucb
    ON ucb.user_id = u.id
    AND ucb.course_id = co.id
)
SELECT 
    sq.*,
    --COALESCE(sq.is_current, false) is_current,
    sq.has_bridge = true AND sq.is_completed = false in_progress
FROM sq
    
ORDER BY 
    sq.user_id,
    sq.course_id;

--CREATE VIEW: daily_tip_view
CREATE VIEW daily_tip_view
AS
WITH user_trait_choices AS
(
	SELECT 
		ptv.user_id,
		ptv.trait_category_id,
		ptv.max_score > ptv.min_score is_max
	FROM public.personality_trait_view ptv
)
SELECT 
	dt.id daily_tip_id,
	u.id user_id,
	dt.description,
	dt.personality_trait_category_id,
	sf.file_path video_file_path,
	latest_occurance.latest_creation_date last_occurrence_date,
	latest_occurance.latest_creation_date IS NULL is_new,
	latest_occurance.latest_creation_date::date IS NOT DISTINCT FROM NOW()::date is_current_tip,
	dt.is_max tip_is_max,
	utc.is_max user_choice_in_category_is_max
FROM daily_tip dt

CROSS JOIN public.user u

LEFT JOIN 
(
	SELECT 
		dto.user_id, 
		dto.daily_tip_id,
		MAX(dto.creation_date) latest_creation_date 
	FROM public.daily_tip_occurrence dto
	GROUP BY 
		dto.daily_tip_id,
		dto.user_id 
) latest_occurance
ON latest_occurance.user_id = u.id 
	AND latest_occurance.daily_tip_id = dt.id

LEFT JOIN storage_file AS sf 
ON sf.id = dt.video_file_id

LEFT JOIN user_trait_choices utc
ON utc.user_id = u.id 
	AND utc.trait_category_id = dt.personality_trait_category_id
	
WHERE dt.is_max = utc.is_max
	
ORDER BY
	u.id,
	latest_occurance.latest_creation_date ASC NULLS FIRST,
	dt.id;

--CREATE VIEW: exam_highest_score_answer_session_view
CREATE VIEW exam_highest_score_answer_session_view
AS
SELECT 
    rns.user_id,
    rns.exam_id,
    rns.exam_version_id,
    rns.answer_session_id,
    rns.exam_score,
    rns.is_highest_score
FROM 
(
    SELECT
        esv.user_id,
        ev.exam_id,
        ev.id exam_version_id,
        esv.answer_session_id,
        esv.exam_score,
        ROW_NUMBER() OVER (
            PARTITION BY 
                esv.user_id,
                ev.exam_id 
            ORDER BY 
                esv.exam_score DESC
        ) = 1 is_highest_score
    FROM public.exam_score_view esv

    LEFT JOIN public.exam_version ev
    ON ev.id = esv.exam_version_id 
) rns 

WHERE rns.is_highest_score;

--CREATE VIEW: user_daily_activity_chart_view
CREATE VIEW user_daily_activity_chart_view
AS
-- This view only provides data for the
-- learning insights page daily activity
-- chart

WITH generated_days_of_the_week AS
(
	SELECT generate_series(0, 6) day_of_the_week
),
generated_days_with_users AS
(
	SELECT
		u.id user_id,
		gdotw.day_of_the_week
	FROM generated_days_of_the_week gdotw
	
	CROSS JOIN public.user u
),
user_session_activity_groups AS
(
	SELECT 
		usv.user_id,
		EXTRACT(isodow FROM usv.start_date) day_of_the_week,
		SUM(usv.length_seconds) total_session_length_seconds
	FROM public.user_session_view usv
	
	GROUP BY usv.user_id, day_of_the_week
)

SELECT 
	gdwu.user_id,
	usag.total_session_length_seconds,
	gdwu.day_of_the_week
FROM generated_days_with_users gdwu

LEFT JOIN user_session_activity_groups usag
ON usag.day_of_the_week = gdwu.day_of_the_week
AND usag.user_id = gdwu.user_id

ORDER BY gdwu.day_of_the_week;

--CREATE VIEW: user_latest_activity_view
CREATE VIEW user_latest_activity_view
AS
WITH session_view_max AS (
	SELECT
	usev.user_id,
	
	MAX(usa.creation_date) latest_activity_date
	FROM public.user_session_view usev
	
	LEFT JOIN public.user_session_activity usa
	ON usa.activity_session_id = usev.id

	GROUP BY usev.user_id
), 
user_total_session_length AS
(
	SELECT 
		usav.user_id,
		SUM(usav.length_seconds)::int total_session_length_seconds
	FROM public.user_session_view usav

	GROUP BY usav.user_id
)
SELECT
	u.id,
	u.email,
	usl.total_session_length_seconds * interval '1 sec' total_spent_seconds,
	svm.latest_activity_date
FROM public.user u

LEFT JOIN session_view_max svm
ON svm.user_id = u.id

LEFT JOIN user_total_session_length usl
ON usl.user_id = u.id

WHERE u.deletion_date IS NULL

ORDER BY svm.latest_activity_date DESC NULLS LAST;

--CREATE VIEW: user_session_block_view
CREATE VIEW user_session_block_view
AS
WITH
session_average AS
(
	SELECT
		usv.user_id user_id,
		(AVG(start_date::time) + AVG(end_date::time)) / 2 average_time_center
	FROM public.user_session_view usv
	GROUP BY usv.user_id
)

SELECT
	u.id user_id,
	CASE 
		WHEN sa.average_time_center >= '0:00:00.0'::time AND sa.average_time_center <= '3:00:00.0'::time
			THEN '0:00-3:00' 
		WHEN sa.average_time_center > '3:00:00.0'::time AND sa.average_time_center <= '6:00:00.0'::time
			THEN '3:00-6:00'
		WHEN sa.average_time_center > '6:00:00.0'::time AND sa.average_time_center <= '9:00:00.0'::time
			THEN '6:00-9:00'
		WHEN sa.average_time_center > '9:00:00.0'::time AND sa.average_time_center <= '12:00:00.0'::time
			THEN '9:00-12:00' 
		WHEN sa.average_time_center > '12:00:00.0'::time AND sa.average_time_center <= '15:00:00.0'::time
			THEN '12:00-15:00' 
		WHEN sa.average_time_center > '15:00:00.0'::time AND sa.average_time_center <= '18:00:00.0'::time
			THEN '15:00-18:00' 
		WHEN sa.average_time_center > '18:00:00.0'::time AND sa.average_time_center <= '21:00:00.0'::time
			THEN '18:00-21:00' 
		WHEN sa.average_time_center > '21:00:00.0'::time AND sa.average_time_center <= '24:00:00.0'::time
			THEN '21:00-0:00'
	END average_session_block
FROM public.user u

LEFT JOIN session_average sa
ON sa.user_id = u.id;

--CREATE VIEW: user_session_daily_view
CREATE VIEW user_session_daily_view
AS
SELECT 
	sq.user_id user_id,
	COUNT(sq.date)::int session_count
FROM 
(
	SELECT 
		usv.user_id,
		usv.start_date::date date
	FROM public.user_session_view usv
	
	WHERE usv.start_date::date = now()::date
) sq

GROUP BY 
	sq.user_id,
	sq.date
	
ORDER BY 
	sq.user_id
;

--CREATE VIEW: user_video_playback_seconds_view
CREATE VIEW user_video_playback_seconds_view
AS
SELECT 
    vpsv.user_id,
    vv.video_id video_id,
    SUM(vpsv.total_playback_duration) total_playback_seconds
FROM public.video_playback_sample_view vpsv

LEFT JOIN public.video_version vv
ON vv.id = vpsv.video_version_id

GROUP BY
    vpsv.user_id,
    vv.id
;

--CREATE VIEW: user_video_practise_progress_view
CREATE VIEW user_video_practise_progress_view
AS
SELECT 
    sq2.*,
    playback_duration / length_seconds * 100 watch_percentage
FROM
(
    SELECT 
		sq.user_id,
		sq.video_id,
		MIN(sq.creation_date) creation_date,
		SUM(sq.total_playback_duration) playback_duration,
		sq.length_seconds
    FROM

	-- squash
 
	(
		SELECT 
			vpsv.user_id,
			vv.video_id,
			vv.id video_version_id,
			vpsv.creation_date,
			MIN(from_seconds),
			MAX(to_seconds),
			vd.video_file_length_seconds length_seconds,
			vpsv.total_playback_duration,
			ROW_NUMBER() OVER 
			(
				ORDER BY vpsv.creation_date
			) - ROW_NUMBER() OVER 
			(
				PARTITION BY vv.video_id
				ORDER BY vpsv.creation_date
			) grp
			FROM public.video_playback_sample_view vpsv
		
		LEFT JOIN public.video_version vv 
		ON vv.id = vpsv.video_version_id
		
		LEFT JOIN public.video_data vd
		ON vd.id = vv.video_data_id
  		
		GROUP BY 
			vd.video_file_length_seconds,
			vpsv.user_id,
			vv.video_id,
			vv.id,
			vpsv.creation_date,
			vpsv.total_playback_duration
	) sq
    
    GROUP BY 
        sq.grp,
        sq.video_id,
        sq.user_id,
        sq.length_seconds
) sq2;

--CREATE VIEW: answer_session_view
CREATE VIEW answer_session_view
AS
-- total and total correct given answer count,
-- and answered question count
WITH
answer_stats AS
(
	SELECT
		ase.user_id,
		ase.id answer_session_id,
		COUNT (ga.id)::int given_answer_count,
		SUM ((ga.state = 'CORRECT')::int)::int correct_given_answer_count,
		(
			SELECT
				COUNT(*)
			FROM public.question_version qv

			LEFT JOIN public.given_answer ga
			ON ga.question_version_id = qv.id

			WHERE ga.answer_session_id = ase.id
		) answered_question_count
	FROM public.given_answer ga

	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id

	GROUP BY ase.user_id, ase.id
)
SELECT
	ase.id answer_session_id,
	ase.user_id,
	ase.exam_version_id,
	ase.video_version_id,
    ase.start_date,
	esv.exam_score answer_session_acquired_points,
	esv.score_percentage answer_session_success_rate,
	esv.score_percentage > COALESCE(ed.acceptance_threshold, 60) is_successful,
	ast.answered_question_count,
	ast.correct_given_answer_count,
	ast.given_answer_count,
	cic.completion_date IS NOT NULL is_completed,
	cic.completion_date end_date,
	CASE
		WHEN ase.is_practise
			THEN 'practise'
		WHEN e.id = 0
			THEN 'signup'
		WHEN e.is_pretest
			THEN 'pretest'
		WHEN ase.video_version_id IS NOT NULL
			THEN 'video'
		WHEN ase.exam_version_id IS NOT NULL
			THEN 'exam'
		ELSE NULL
	END answer_session_type
FROM public.answer_session ase

LEFT JOIN answer_stats ast
ON ast.user_id = ase.user_id
AND ast.answer_session_id = ase.id

LEFT JOIN public.exam_score_view esv
ON esv.answer_session_id = ase.id

LEFT JOIN public.exam_version ev
ON ev.id = ase.exam_version_id

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id

LEFT JOIN public.exam e
ON ev.exam_id = e.id

LEFT JOIN public.course_item_completion_view cic
ON cic.answer_session_id = ase.id
;

--CREATE VIEW: answer_session_evaluation_view
CREATE VIEW answer_session_evaluation_view
AS
WITH 
non_practise_answer_sessions AS 
(
	SELECT ase.* FROM public.answer_session_view ase
	WHERE ase.answer_session_type <> 'practise'
),
total_question_count AS 
(
	-- exam quesitons 
	SELECT 
		ev.id exam_version_id,
		NULL::int video_version_id,
		COUNT(qv.id) question_count
	FROM public.exam_version ev
	
	LEFT JOIN public.question_version qv
	ON qv.exam_version_id = ev.id
	
	GROUP BY
		ev.id
	
	UNION ALL
	
	-- video questions 
	SELECT 
		NULL::int exam_version_id,
		vv.id video_version_id,
		COUNT(qv.id) question_count
	FROM public.video_version vv
	
	LEFT JOIN public.question_version qv
	ON qv.video_version_id = vv.id
	
	GROUP BY
		vv.id
),
ga_count AS 
(
	SELECT 
		ga.answer_session_id,
		COUNT(1) answered_count,
		COALESCE(SUM((ga.state = 'CORRECT')::int)::int, 0) correct_count
	FROM given_answer ga
	GROUP BY
		ga.answer_session_id
)
SELECT 
	ase.answer_session_id,
	u.id user_id,
	ase.video_version_id,
	ase.exam_version_id,
	
	-- total_question_count
	tqc.question_count,
	
	-- answered_question_count
	COALESCE(gac.answered_count, 0) answered_question_count,
	
	-- is_completed
	COALESCE(tqc.question_count = gac.answered_count 
		AND gac.answered_count > 0, false) is_completed,
		
	-- correct_answer_count
	COALESCE(gac.correct_count, 0) correct_answer_count,
	
	-- is_successful
	ase.is_successful,
		
	-- correct_answer_rate
	ase.answer_session_success_rate correct_answer_rate
--	COALESCE(CASE WHEN tqc.question_count > 0
--		THEN ROUND(gac.correct_count::decimal / tqc.question_count * 100)
--		ELSE 0
--	END, 0) correct_answer_rate
FROM non_practise_answer_sessions ase

LEFT JOIN public.user u
ON u.id = ase.user_id

-- total quesiton count
LEFT JOIN total_question_count tqc
ON tqc.exam_version_id = ase.exam_version_id
OR tqc.video_version_id = ase.video_version_id

-- ga count 
LEFT JOIN ga_count gac
ON gac.answer_session_id = ase.answer_session_id;

--CREATE VIEW: answer_session_group_view
CREATE VIEW answer_session_group_view
AS
-- Returns the average success rate of the
-- answer_session groupped by answer_session_type

SELECT
    asv.user_id,
    cv.course_id,
	mv.module_id,
    asv.answer_session_type,
    asv.start_date,
    AVG(asv.answer_session_success_rate) answer_session_success_rate
FROM public.answer_session_view asv

LEFT JOIN public.video_version vv
ON vv.id = asv.video_version_id

LEFT JOIN public.exam_version ev
ON ev.id = asv.exam_version_id

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id
OR mv.id = ev.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id

WHERE asv.answer_session_type != 'pretest'

GROUP BY 
    asv.user_id,
    cv.course_id,
	mv.module_id,
    asv.answer_session_type,
    asv.start_date;

--CREATE VIEW: correct_answer_rates_split_view
CREATE VIEW correct_answer_rates_split_view
AS
SELECT
    u.id user_id,
    co.id course_id,
	mv.module_id module_id,
    asgv.start_date,
    CASE 
        WHEN asgv.answer_session_type = 'exam'
        THEN asgv.answer_session_success_rate
    END exam_correct_answer_rate,
    CASE 
        WHEN asgv.answer_session_type = 'practise'
        THEN asgv.answer_session_success_rate
    END practise_correct_answer_rate,
    CASE 
        WHEN asgv.answer_session_type = 'video'
        THEN asgv.answer_session_success_rate
    END video_correct_answer_rate
FROM public.user u

CROSS JOIN public.course co

LEFT JOIN public.course_version cv
ON cv.course_id = co.id

LEFT JOIN public.module_version mv
ON mv.course_version_id = cv.id

LEFT JOIN public.answer_session_group_view asgv
ON asgv.user_id = u.id
AND asgv.course_id = co.id

ORDER BY u.id;

--CREATE VIEW: exam_completed_view
CREATE VIEW exam_completed_view
AS
SELECT 
	u.id user_id,
	ev.id exam_version_id,
	mv.course_version_id,
	ed.is_final is_final_exam,
	ed.order_index order_index,
	SUM (asv.is_completed::int) completed_session_count,
	SUM (asv.is_completed::int) > 0 has_completed_session,
	
	SUM (asv.is_successful::int) successful_session_count,
	SUM (asv.is_successful::int) > 0 has_successful_session,
	
	SUM (asv.is_successful::int) = 1 single_successful_session
FROM public.exam_version ev

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id

CROSS JOIN public.user u

LEFT JOIN public.answer_session_evaluation_view asv
ON asv.exam_version_id = ev.id AND asv.user_id = u.id

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id

GROUP BY
	ev.id,
	u.id,
	mv.course_version_id,
	ed.order_index,
	ed.is_final
	
ORDER BY 
	u.id,
	ev.id;

--CREATE VIEW: most_productive_time_range_view
CREATE VIEW most_productive_time_range_view
AS
WITH generated_session_blocks (generated_session_block, block_end_time) AS 
(
	VALUES
	(text '0:00-3:00', '3:00:00.0'::time),  -- explicit type in 1st row 
	('3:00-6:00', '6:00:00.0'::time),
	('6:00-9:00', '9:00:00.0'::time),
	('9:00-12:00', '12:00:00.0'::time),
	('12:00-15:00', '15:00:00.0'::time),
	('15:00-18:00', '18:00:00.0'::time),
	('18:00-21:00', '21:00:00.0'::time),
	('21:00-0:00', '24:00:00.0'::time)
), 
user_performance_with_session_blocks AS
(
	SELECT
		carsv.user_id,
		CASE 
			WHEN carsv.start_date::time <= '3:00:00.0'::time
				THEN '0:00-3:00' 
			WHEN carsv.start_date::time <= '6:00:00.0'::time
				THEN '3:00-6:00'
			WHEN carsv.start_date::time <= '9:00:00.0'::time
				THEN '6:00-9:00'
			WHEN carsv.start_date::time <= '12:00:00.0'::time
				THEN '9:00-12:00' 
			WHEN carsv.start_date::time <= '15:00:00.0'::time
				THEN '12:00-15:00' 
			WHEN carsv.start_date::time <= '18:00:00.0'::time
				THEN '15:00-18:00' 
			WHEN carsv.start_date::time <= '21:00:00.0'::time
				THEN '18:00-21:00' 
			WHEN carsv.start_date::time <= '24:00:00.0'::time
				THEN '21:00-0:00'
		END session_block,
		AVG(carsv.exam_correct_answer_rate) exam_correct_answer_rate,
		AVG(carsv.practise_correct_answer_rate) practise_correct_answer_rate,
		AVG(carsv.video_correct_answer_rate) video_correct_answer_rate
	FROM public.correct_answer_rates_split_view carsv
	
	GROUP BY carsv.user_id, carsv.start_date
)

SELECT 
	u.id user_id,
	gsb.generated_session_block session_block,
	(
        COALESCE(upwsb.exam_correct_answer_rate * 2.5, 0) +
        COALESCE(upwsb.video_correct_answer_rate * 1.5, 0) +
        COALESCE(upwsb.practise_correct_answer_rate, 0)
    )::int / 5 performance_percentage
FROM generated_session_blocks gsb

CROSS JOIN public.user u

LEFT JOIN user_performance_with_session_blocks upwsb
ON upwsb.user_id = u.id
AND upwsb.session_block = gsb.generated_session_block

ORDER BY u.id, gsb.block_end_time;

--CREATE VIEW: user_answer_view
CREATE VIEW user_answer_view
AS
SELECT 
   ga.id given_answer_id,
   ga.state = 'CORRECT' given_answer_is_correct,
   ga.elapsed_seconds,
   ga.answer_session_id,
   asv.user_id,
   vv.video_id,
   ev.exam_id,
   cv.course_id course_id,
   asv.answer_session_type
FROM public.given_answer ga

LEFT JOIN public.answer_session_view AS asv
ON asv.answer_session_id = ga.answer_session_id

LEFT JOIN public.exam_version ev 
ON ev.id = asv.exam_version_id

LEFT JOIN public.video_version vv
ON vv.id = asv.video_version_id

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id
OR mv.id = vv.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id;

--CREATE VIEW: user_daily_progress_view
CREATE VIEW user_daily_progress_view
AS
WITH

-- practise question spent time calculation 
practise_question_spent_time AS 
(
	SELECT 
		u.id user_id,
		ga.course_id,
		ga.creation_date,
		(COUNT(ga.id) * 15)::integer spent_seconds 
	FROM public.user u

	LEFT JOIN public.answer_session_view asv
	ON asv.user_id = u.id AND asv.answer_session_type = 'practise'

	LEFT JOIN 
	(
		SELECT 
			ga.id,
			cv.course_id,
			ga.answer_session_id,
			DATE_TRUNC('day', ga.creation_date) creation_date
		FROM public.given_answer ga
	
		LEFT JOIN public.question_version qv
		ON qv.id = ga.question_version_id

		LEFT JOIN public.video_version vv
		ON vv.id = qv.video_version_id
		
		LEFT JOIN public.module_version mv
		ON mv.id = vv.module_version_id
		
		LEFT JOIN public.course_version cv
		ON cv.id = mv.course_version_id
	) ga
	ON ga.answer_session_id = asv.answer_session_id

	WHERE ga.id IS NOT NULL
	
	GROUP BY 
		u.id,
		ga.course_id,
		ga.creation_date

	ORDER BY
		u.id,
		ga.course_id,
		ga.creation_date
),

-- exam spent time
exam_spent_time AS 
(
	SELECT 
		u.id user_id,
		asv.course_id,
		asv.creation_date,
		SUM(asv.elapsed_seconds) spent_seconds
	FROM public.user u

	LEFT JOIN 
	(
		SELECT 
			asv.answer_session_id,
			asv.user_id,
			cv.course_id,
			ev.exam_id,
			DATE_TRUNC('day', asv.end_date) creation_date,
			EXTRACT(EPOCH FROM asv.end_date - start_date) elapsed_seconds	
		FROM public.answer_session_view asv
		
		LEFT JOIN public.exam_version ev
		ON ev.id = asv.exam_version_id
		
		LEFT JOIN public.module_version mv
		ON mv.id = ev.module_version_id
		
		LEFT JOIN public.course_version cv
		ON cv.id = mv.course_version_id

		WHERE asv.start_date IS NOT NULL AND asv.end_date IS NOT NULL 
	) asv
	ON asv.user_id = u.id

	LEFT JOIN public.exam e
	ON e.id = asv.exam_id

	WHERE e.id <> 1 AND e.id IS NOT NULL

	GROUP BY
		u.id,
		asv.course_id,
		asv.creation_date

	ORDER BY
		u.id,
		asv.course_id,
		asv.creation_date
),

-- video watch spent time 
video_watch_spent_time AS
(
	SELECT 
		u.id user_id,
		vps.course_id,
		vps.creation_date,
		COALESCE(SUM(vps.elapsed_seconds), 0) spent_seconds
	FROM public.user u

	LEFT JOIN 
	(
		SELECT 
			vps.id,
			DATE_TRUNC('day', vps.creation_date) creation_date,
			vps.user_id,
			vv.video_id,
			cv.course_id,
			vps.to_seconds - vps.from_seconds elapsed_seconds
		FROM public.video_playback_sample vps
		
		LEFT JOIN public.video_version vv
		ON vv.id = vps.video_version_id
		
		LEFT JOIN public.module_version mv
		ON mv.id = vv.module_version_id
		
		LEFT JOIN public.course_version cv
		ON cv.id = mv.course_version_id
	) vps
	ON vps.user_id = u.id
	
	LEFT JOIN public.video v
	ON vps.video_id = v.id

	WHERE v.id IS NOT NULL
	
	GROUP BY
		u.id,
		vps.course_id,
		vps.creation_date

	ORDER BY
		u.id,
		vps.course_id,
		vps.creation_date
),

-- video question spent time 
video_question_spent_time AS 
(
	SELECT 
		u.id user_id,
		cv.course_id course_id,
		ga.creation_date,
		COALESCE(SUM(ga.elapsed_seconds), 0) spent_seconds
	FROM public.user u

	LEFT JOIN public.answer_session_view asv
	ON asv.video_version_id IS NOT NULL 
		AND asv.user_id = u.id

	LEFT JOIN 
	(
		SELECT
			ga.id,
			ga.answer_session_id,
			ga.elapsed_seconds,
			DATE_TRUNC('day', ga.creation_date) creation_date
		FROM public.given_answer ga
	) ga
	ON ga.answer_session_id = asv.answer_session_id

	LEFT JOIN public.video_version vv
	ON vv.id = asv.video_version_id
	
	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id

	WHERE ga.creation_date IS NOT NULL

	GROUP BY
		u.id,
		cv.course_id,
		ga.creation_date

	ORDER BY
		u.id,
		cv.course_id,
		ga.creation_date
)

-- main query 
SELECT 
	u.id user_id,
	co.id course_id,
	asd.creation_date,
	SUM (asd.spent_seconds) spent_seconds
FROM public.user u

CROSS JOIN public.course co

LEFT JOIN 
(
	SELECT 
		pqst.user_id,
		NULL::int course_id,
		pqst.creation_date,
		pqst.spent_seconds,
		'practise_question' tag
	FROM practise_question_spent_time pqst
	UNION 
	SELECT 
		est.user_id,
		est.course_id,
		est.creation_date,
		est.spent_seconds,
		'exam' tag
	FROM exam_spent_time est
	UNION 
	SELECT 
		vwst.user_id,
		vwst.course_id,
		vwst.creation_date,
		vwst.spent_seconds,
		'video_watch' tag
	FROM video_watch_spent_time vwst
	UNION 
	SELECT 
		vqst.user_id,
		vqst.course_id,
		vqst.creation_date,
		vqst.spent_seconds,
		'video_question' tag
	FROM video_question_spent_time vqst
) asd
ON asd.user_id = u.id AND asd.course_id = co.id

GROUP BY
	u.id,
	co.id,
	asd.creation_date

ORDER BY
	u.id,
	co.id
;

--CREATE VIEW: user_module_performance_answer_group_view
CREATE VIEW user_module_performance_answer_group_view
AS
SELECT
	carsv.user_id,
	carsv.course_id,
	carsv.module_id,
	AVG(carsv.exam_correct_answer_rate)::double precision exam_correct_answer_rate,
	AVG(carsv.practise_correct_answer_rate)::double precision practise_correct_answer_rate,
	AVG(carsv.video_correct_answer_rate)::double precision video_correct_answer_rate
FROM public.correct_answer_rates_split_view carsv

GROUP BY carsv.user_id, carsv.course_id, carsv.module_id

ORDER BY carsv.user_id, carsv.course_id, carsv.module_id;

--CREATE VIEW: user_module_performance_view
CREATE VIEW user_module_performance_view
AS
SELECT
    u.id user_id,
    upagv.course_id,
	upagv.module_id,
	
    -- one module avg per row
    (
        COALESCE(upagv.exam_correct_answer_rate * 2.5, 0) +
        COALESCE(upagv.video_correct_answer_rate * 1.5, 0) +
        COALESCE(upagv.practise_correct_answer_rate, 0)
    )::double precision / 5 performance_percentage
FROM public.user u

LEFT JOIN public.user_module_performance_answer_group_view upagv
ON upagv.user_id = u.id
;

--CREATE VIEW: user_performance_answer_group_view
CREATE VIEW user_performance_answer_group_view
AS
SELECT
	carsv.user_id,
	carsv.course_id,
	AVG(carsv.exam_correct_answer_rate)::double precision exam_correct_answer_rate,
	AVG(carsv.practise_correct_answer_rate)::double precision practise_correct_answer_rate,
	AVG(carsv.video_correct_answer_rate)::double precision video_correct_answer_rate
FROM public.correct_answer_rates_split_view carsv

GROUP BY carsv.user_id, carsv.course_id;

--CREATE VIEW: user_performance_view
CREATE VIEW user_performance_view
AS
SELECT
    u.id user_id,
    upagv.course_id,
	
    -- one course avg per row
    (
        COALESCE(upagv.exam_correct_answer_rate * 2.5, 0) +
        COALESCE(upagv.video_correct_answer_rate * 1.5, 0) +
        COALESCE(upagv.practise_correct_answer_rate, 0)
    )::double precision / 5 performance_percentage
FROM public.user u

LEFT JOIN public.user_performance_answer_group_view upagv
ON upagv.user_id = u.id
;

--CREATE VIEW: user_exam_stats_view
CREATE VIEW user_exam_stats_view
AS
SELECT DISTINCT ON (e.id)
	e.id exam_id,
	ed.title exam_title,
	u.id user_id,
	cv.course_id,
	asv.answer_session_success_rate correct_answer_rate,
	CASE 
		WHEN asv.is_successful
		THEN false
		ELSE true
	END should_practise_exam,
	ROUND(asv.answer_session_acquired_points / 4) correct_answer_count,
	EXTRACT(EPOCH FROM (asv.end_date - asv.start_date)::time)::int exam_length_seconds,
	asv.end_date last_completion_date,
	(
		SELECT
			AVG(ga.elapsed_seconds) average_reaction_time
		FROM public.given_answer ga
		WHERE ga.answer_session_id = asv.answer_session_id
	)
FROM public.exam e

LEFT JOIN public.exam_version ev
ON ev.exam_id = e.id

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id

LEFT JOIN public.answer_session_view asv
ON asv.exam_version_id = ev.id

LEFT JOIN public.given_answer ga
ON ga.answer_session_id = asv.answer_session_id

LEFT JOIN public.user u
ON u.id = asv.user_id

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id

WHERE /*asv.end_date IS NOT NULL
AND*/ u.id IS NOT NULL
AND e.is_pretest IS FALSE
AND e.is_signup IS FALSE

ORDER BY e.id, asv.end_date desc;

--CREATE VIEW: course_admin_short_view
CREATE VIEW course_admin_short_view
AS
WITH 
exam_count AS 
(
	SELECT COUNT(ev.id) exam_count, mv.course_version_id
	FROM public.exam_version ev
	
	LEFT JOIN public.module_version mv
	ON mv.id = ev.module_version_id
	
	GROUP BY mv.course_version_id
)
SELECT 
	lcvv.course_id,
	cd.title title,
	co.deletion_date IS NOT NULL is_deleted,
	cc.id category_id,
	cc.name category_name,
	scc.id sub_category_id,
	scc.name sub_category_name,
	u.id teacher_id,
	u.first_name teacher_first_name,
	u.last_name teacher_last_name,
	sf.file_path cover_file_path,
	cvcv.video_count,
	ec.exam_count
FROM public.latest_course_version_view lcvv

LEFT JOIN public.course_version cv 
ON cv.id = lcvv.version_id

LEFT JOIN public.course co
ON co.id = cv.course_id

LEFT JOIN public.course_data cd 
ON cd.id = cv.course_data_id 

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

LEFT JOIN public.user u
ON u.id = cd.teacher_id

LEFT JOIN public.course_category cc
ON cc.id = cd.category_id

LEFT JOIN public.course_category scc
ON scc.id = cd.sub_category_id

LEFT JOIN public.course_video_count_view cvcv
ON cvcv.course_version_id = lcvv.version_id

LEFT JOIN exam_count ec
ON ec.course_version_id = lcvv.version_id
	
ORDER BY
	lcvv.course_id;

--CREATE VIEW: course_spent_time_view
CREATE VIEW course_spent_time_view
AS
WITH 
exam_elapsed_time_cte AS
(
	SELECT 
		asev.user_id,
		cv.course_id,
		EXTRACT(EPOCH FROM SUM(cicv.completion_date - asev.start_date)) exam_elapsed_time
	FROM public.exam_version ev

	LEFT JOIN public.module_version mv
	ON mv.id = ev.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id

	INNER JOIN public.answer_session_view asev
	ON asev.exam_version_id = ev.id 
	AND asev.start_date IS NOT NULL

	INNER JOIN public.course_item_completion_view cicv
	ON cicv.answer_session_id = asev.answer_session_id

	WHERE asev.answer_session_type = 'exam'
	AND cicv.completion_date IS NOT NULL

	GROUP BY asev.user_id, cv.course_id
),
video_watch_elapsed_time_cte AS
(
	SELECT 
		vps.user_id,
		cv.course_id,
		SUM(vps.to_seconds - vps.from_seconds) video_elapsed_time
	FROM public.video_playback_sample vps

	LEFT JOIN public.video_version vv
	ON vv.id = vps.video_version_id 

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id

	GROUP BY 
		cv.course_id, 
		vps.user_id
),
video_question_elapsed_time_cte AS
(
	SELECT
		asv.user_id,
		cv.course_id,
		SUM(ga.elapsed_seconds) video_question_elapsed_time
	FROM public.given_answer ga
	
	LEFT JOIN public.answer_session_view asv
	ON asv.answer_session_id = ga.answer_session_id
	
	LEFT JOIN public.question_version qv
	ON qv.id = ga.question_version_id
	
	LEFT JOIN public.video_version vv
	ON vv.id = qv.video_version_id

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id
	
	WHERE ga.is_practise_answer IS NOT TRUE
	
	GROUP BY asv.user_id, cv.course_id
),
practise_question_elapsed_time_cte AS
(
	SELECT
		asv.user_id,
		cv.course_id,
		(COUNT(ga.id) * 15)::integer practise_question_elapsed_time
	FROM public.given_answer ga
	
	LEFT JOIN public.answer_session_view asv
	ON asv.answer_session_id = ga.answer_session_id
	
	LEFT JOIN public.question_version qv
	ON qv.id = ga.question_version_id
	
	LEFT JOIN public.video_version vv
	ON vv.id = qv.video_version_id

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id
	
	WHERE ga.is_practise_answer IS TRUE
	
	GROUP BY asv.user_id, cv.course_id
),

spent_time_sum_view_cte AS
(
	SELECT 
		eetc.user_id,
		eetc.course_id,
		SUM(eetc.exam_elapsed_time) total_exam_session_elapsed_time,
		SUM(vwetc.video_elapsed_time) total_video_watch_elapsed_time,
		SUM(vqetc.video_question_elapsed_time) total_video_question_elapsed_time,
		SUM(pqetc.practise_question_elapsed_time) total_practise_question_elapsed_time
	FROM exam_elapsed_time_cte eetc

	LEFT JOIN video_watch_elapsed_time_cte vwetc
	ON vwetc.user_id = eetc.user_id
	AND vwetc.course_id = eetc.course_id

	LEFT JOIN video_question_elapsed_time_cte vqetc
	ON vqetc.user_id = eetc.user_id
	AND vqetc.course_id = eetc.course_id
	
	LEFT JOIN practise_question_elapsed_time_cte pqetc
	ON pqetc.user_id = eetc.user_id
	AND pqetc.course_id = eetc.course_id
	
	GROUP BY eetc.user_id, eetc.course_id
)

SELECT 
	u.id user_id,
	co.id course_id,
	stsvc.total_exam_session_elapsed_time,
	stsvc.total_video_watch_elapsed_time,
	stsvc.total_video_question_elapsed_time,
	stsvc.total_practise_question_elapsed_time,
	(
		COALESCE(eetc.exam_elapsed_time, 0)
		+ COALESCE(vwetc.video_elapsed_time, 0)
		+ COALESCE(vqetc.video_question_elapsed_time, 0)
		+ COALESCE(pqetc.practise_question_elapsed_time, 0)
	) total_spent_seconds
FROM public.user u

CROSS JOIN public.course co

LEFT JOIN exam_elapsed_time_cte eetc
ON eetc.user_id = u.id
AND eetc.course_id = co.id

LEFT JOIN video_watch_elapsed_time_cte vwetc
ON vwetc.user_id = u.id
AND vwetc.course_id = co.id

LEFT JOIN video_question_elapsed_time_cte vqetc
ON vqetc.user_id = u.id
AND vqetc.course_id = co.id

LEFT JOIN practise_question_elapsed_time_cte pqetc
ON pqetc.user_id = u.id
AND pqetc.course_id = co.id

LEFT JOIN spent_time_sum_view_cte stsvc
ON stsvc.user_id = u.id
AND stsvc.course_id = co.id

ORDER BY 
	u.id,
	co.id;

--CREATE VIEW: user_spent_time_ratio_view
CREATE VIEW user_spent_time_ratio_view
AS
SELECT
    u.id user_id,
    COALESCE(SUM(cstv.total_exam_session_elapsed_time)::int, 0) total_exam_session_elapsed_time,
    COALESCE(SUM(cstv.total_video_watch_elapsed_time)::int, 0) total_video_watch_elapsed_time,
    COALESCE(SUM(cstv.total_practise_question_elapsed_time)::int + SUM(cstv.total_video_question_elapsed_time)::int, 0) total_question_elapsed_time,
    COALESCE(SUM(usv.length_seconds)::int - SUM(cstv.total_spent_seconds)::int, 0) other_total_spent_seconds
FROM public.user u

LEFT JOIN public.course_spent_time_view cstv
ON u.id = cstv.user_id

LEFT JOIN user_session_view usv
ON cstv.user_id = usv.user_id

GROUP BY
    u.id;

--CREATE VIEW: signup_completed_view
CREATE VIEW signup_completed_view
AS
SELECT 
	u.id user_id,
	asev.is_completed is_signup_complete
FROM public.user u

LEFT JOIN public.answer_session_view asv 
ON asv.user_id = u.id 
AND asv.answer_session_type = 'signup'

LEFT JOIN public.answer_session_evaluation_view asev
ON asev.answer_session_id = asv.answer_session_id
		
ORDER BY
	u.id;

--CREATE VIEW: user_active_course_view
CREATE VIEW user_active_course_view
AS
SELECT
	cosv.course_id,
	cosv.user_id,
	cd.title,
	sf.file_path cover_file_path
FROM public.course_state_view cosv

LEFT JOIN public.course co
ON co.id = cosv.course_id

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.course_id = co.id

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

WHERE cosv.in_progress
;

--CREATE VIEW: user_course_completion_current_view
CREATE VIEW user_course_completion_current_view
AS
SELECT 
	sq.*,
	
	-- previsioned progress
	sq.start_date + (INTERVAL '1' day * sq.previsioned_length_days) previsioned_completion_date,
	GREATEST(0, sq.previsioned_length_days - sq.days_elapsed_since_start) remaining_days,
	CEIL(sq.total_item_count::numeric / sq.previsioned_length_days) previsioned_items_per_day,
	CEIL(sq.total_item_count / sq.previsioned_length_days::numeric * sq.days_elapsed_since_start) previsioned_items_completed_by_now,
	CEIL(100.0 / sq.previsioned_length_days * sq.days_elapsed_since_start) previsioned_percent_completed_by_now,

	-- required progress
	GREATEST(0, sq.required_length_days - COALESCE(sq.days_elapsed_since_start, 0)) required_remaining_days,
	CEIL(sq.total_item_count::numeric / sq.required_length_days) required_items_per_day,
	CEIL(sq.total_item_count / sq.required_length_days::numeric * COALESCE(sq.days_elapsed_since_start, 1)) required_items_completed_by_now,
	CEIL(100.0 / sq.required_length_days * COALESCE(sq.days_elapsed_since_start, 1)) required_percent_completed_by_now
FROM 
(
	SELECT 
		ucbv.user_id user_id,
		ucbv.course_id course_id,
		ucbv.start_date,
		ucbv.required_completion_date,
		ucbv.previsioned_length_days,
		ucbv.required_length_days,
		now()::date - ucbv.start_date days_elapsed_since_start,
		cicv.item_count total_item_count
	FROM public.user_course_bridge_view ucbv

	LEFT JOIN public.course_item_count_view cicv
	ON cicv.course_id = ucbv.course_id

	ORDER BY
		ucbv.user_id,
		ucbv.course_id
) sq;

--CREATE VIEW: user_course_progress_actual_view
CREATE VIEW user_course_progress_actual_view
AS
SELECT 
	sq.*,
	NULLIF(sq.total_completed_item_count, 0) / NULLIF(sq.days_elapsed_since_start::double precision, 0) avg_completed_items_per_day,
	ROUND(NULLIF(sq.total_completed_item_count, 0) / NULLIF(sq.total_item_count::double precision, 0) * 100) completed_percentage,
	sq.total_item_count - sq.total_completed_item_count remaining_item_count
FROM 
(
	SELECT 
		ucb.user_id user_id,
		ucb.course_id,
		now()::date - ucb.start_date::date + 1 days_elapsed_since_start,
		COUNT(*)::int total_completed_item_count,
		coicv.item_count total_item_count
	FROM public.user_course_bridge ucb 

	LEFT JOIN public.course_item_completion_view cicv
	ON cicv.user_id = ucb.user_id
	AND cicv.course_id = ucb.course_id

	LEFT JOIN public.course_item_count_view coicv
	ON ucb.course_id = coicv.course_id

-- 	WHERE cicv IS NOT NULL
	
	GROUP BY
		ucb.user_id,
		ucb.course_id,
		ucb.start_date,
		coicv.item_count
) sq;

--CREATE VIEW: course_progress_view
CREATE VIEW course_progress_view
AS
SELECT
	u.id user_id,
	co.id course_id,
	cd.title course_title,
	ucpav.total_item_count total_course_item_count,
	ucpav.total_completed_item_count completed_course_item_count,
	(ucpav.total_completed_item_count::double precision / ucpav.total_item_count * 100)::int progress_percentage,
	ucb.current_item_code,
	ucb.stage_name current_stage_name
FROM public.user u

CROSS JOIN public.course co

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.course_id = co.id

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.user_course_progress_actual_view ucpav
ON ucpav.course_id = co.id
AND ucpav.user_id = u.id

LEFT JOIN public.user_course_bridge ucb
ON ucb.user_id = u.id
AND ucb.course_id = co.id

LEFT JOIN public.course_completion cc
ON cc.user_id = u.id
AND cc.course_version_id = cv.id

WHERE ucb.id IS NOT NULL
AND cc.id IS NULL
;

--CREATE VIEW: user_course_progress_view
CREATE VIEW user_course_progress_view
AS
SELECT
	sq.*,

	-- Calculate lag behind either from 
	--     start_date to current_date and start_date to previsioned progress 
	--     or required progress
	CASE
		WHEN ucb.required_completion_date IS NOT NULL AND ucb.start_date IS NOT NULL
			THEN sq.required_percent_completed_by_now - sq.completed_percentage
		WHEN ucb.required_completion_date IS NULL AND ucb.start_date IS NOT NULL
			THEN sq.previsioned_percent_completed_by_now - sq.completed_percentage
		ELSE null
	END lag_behind_percentage,

	ucb.tempomat_mode
FROM 
(
	SELECT 
		ucccv.user_id,
		ucccv.course_id,
		ucccv.previsioned_percent_completed_by_now,
		ucccv.required_percent_completed_by_now,
		COALESCE(ucpa.completed_percentage, 0) completed_percentage,
		ucpa.remaining_item_count,
		ucccv.previsioned_length_days,
		ucccv.total_item_count,
		ucccv.remaining_days
	FROM public.user_course_completion_current_view ucccv

	LEFT JOIN public.user_course_progress_actual_view ucpa
	ON ucpa.course_id = ucccv.course_id 
		AND ucpa.user_id = ucccv.user_id
) sq

LEFT JOIN public.user_course_bridge ucb
ON ucb.course_id = sq.course_id AND ucb.user_id = sq.user_id
;

--CREATE VIEW: user_course_recommended_item_quota_view
CREATE VIEW user_course_recommended_item_quota_view
AS
SELECT 
	ucb.user_id,
	ucb.course_id,
	ucccv.previsioned_items_per_day recommended_items_per_day,
	LEAST (cicv.item_count, ucccv.previsioned_items_per_day * 7) recommended_items_per_week
FROM public.user_course_bridge ucb

LEFT JOIN public.course_item_count_view cicv
ON cicv.course_id = ucb.course_id

LEFT JOIN public.user_course_completion_current_view ucccv
ON ucccv.course_id = ucb.course_id 
	AND ucccv.user_id = ucb.user_id ;

--CREATE VIEW: user_daily_course_item_progress_view
CREATE VIEW user_daily_course_item_progress_view
AS
WITH completed_items AS
(
	SELECT 
		cicv.user_id,
		cicv.course_id,
		cicv.video_version_id,
		vd.title,
		DATE_TRUNC('day', cicv.completion_date) completion_date
	FROM public.course_item_completion_view cicv
	
	LEFT JOIN public.video_version vv
	ON vv.id = cicv.video_version_id
	
	LEFT JOIN public.video_data vd
	ON vd.id = vv.video_data_id

	WHERE cicv.is_pretest IS NOT TRUE
	AND cicv.video_version_id IS NOT NULL
),
completed_item_groups AS
(
	SELECT 
		ci.user_id,
		ci.course_id,
		ci.completion_date,
		COUNT(ci.completion_date)::int completed_item_count
	FROM completed_items ci

	GROUP BY 
		ci.user_id,
		ci.course_id,
		ci.completion_date
)

SELECT 
	cig.user_id,
	cig.course_id,
	cig.completion_date,
	cig.completed_item_count,
	cig.completed_item_count::double precision / cicv.item_count::double precision * 100 completed_percentage,
	cig.completion_date::date - ucb.start_date::date offset_days_from_start,
	cig.completion_date = DATE_TRUNC('day', now()) is_current
FROM completed_item_groups cig

LEFT JOIN public.user_course_bridge ucb
ON ucb.course_id = cig.course_id 
AND ucb.user_id = cig.user_id

LEFT JOIN public.course_item_count_view cicv
ON cicv.course_id = cig.course_id 

ORDER BY cig.completion_date;

--CREATE VIEW: user_weekly_course_item_progress_view
CREATE VIEW user_weekly_course_item_progress_view
AS
SELECT 
	sq.user_id,
	sq.course_id,
	sq.completion_date_trunc completion_date,
	sq.completion_date_trunc = DATE_TRUNC('week', now()) is_current,
	SUM(sq.completed_item_count)::int completed_item_count
FROM 
(
	SELECT 
		udcipv.*,
		DATE_TRUNC('week', udcipv.completion_date) completion_date_trunc
	FROM public.user_daily_course_item_progress_view udcipv
) sq

GROUP BY
	sq.user_id,
	sq.course_id,
	sq.completion_date_trunc;

--CREATE VIEW: user_inactive_course_view
CREATE VIEW user_inactive_course_view
AS
/*
* Gets every course that is:
* - Started in the last 30 days AND
* - Inactive for the last 14 days AND
* - The progress is less than 50%
*/
SELECT
    user_course_sessions.user_id user_id,
    COUNT(course_id) inactive_course_count
FROM (
    SELECT DISTINCT ON (course_id)
        usv.user_id user_id,
        usv.end_date session_end_date,
        cv.course_id course_id,
        EXTRACT(WEEK FROM usv.start_date) AS week,
        COUNT(cv.course_id * -10) points
    FROM public.user_session_view usv

    LEFT JOIN public.user_session_activity AS usa
    ON usa.activity_session_id = usv.id

    LEFT JOIN public.video_version vv
    ON vv.id = usa.video_version_id

    LEFT JOIN public.exam_version ev
    ON ev.id = usa.exam_version_id

    LEFT JOIN public.module_version mv
    ON mv.id = vv.module_version_id
    OR mv.id = ev.module_version_id
	
	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id

    LEFT JOIN public.course_progress_view AS cpv
    ON cpv.user_id = usv.user_id
    AND cpv.course_id = cv.course_id

    LEFT JOIN public.user_course_bridge AS ucb
    ON ucb.user_id = usv.user_id
    AND ucb.course_id = cv.course_id

    WHERE usv.start_date > CURRENT_DATE - 30 -- sessions only from the last 30 days
    AND usv.end_date < CURRENT_DATE - 14 -- no session since 14 days
    AND ucb.creation_date > CURRENT_DATE - 30 -- courses started in the last 30 days
    AND cpv.progress_percentage < 50 -- courses with less than 50 percent progress
    AND usv.length_seconds != 0 -- no empty sessions
    AND usv.is_finalized = true -- no not finalized sessions

    GROUP BY usv.user_id, usv.start_date, usv.end_date, cv.course_id

    ORDER BY course_id, usv.end_date desc -- important for distinct on so it can get the latest session for course
) user_course_sessions

GROUP BY user_course_sessions.user_id

;

--CREATE VIEW: user_reaction_time_view
CREATE VIEW user_reaction_time_view
AS
-- user exams with correct answer rate and completion length seconds
WITH user_exam AS (
    SELECT
        u.id user_id,
        ev.exam_id,
        asv.answer_session_id answer_session_id,
        EXTRACT(SECONDS FROM asv.end_date - asv.start_date) exam_length_seconds,
        asv.answer_session_success_rate exam_correct_answer_rate
    FROM public.user u
    
    LEFT JOIN public.answer_session_view asv
    ON asv.user_id = u.id
	
	LEFT JOIN public.exam_version ev
	ON ev.id = asv.exam_version_id
    
    WHERE
        asv.answer_session_type = 'exam'
        AND end_date IS NOT NULL
),

-- single and all users exam completion length averages
user_exam_averages AS (
    SELECT
        sq.user_id,
        100.0 * (sq.average_exam_length_seconds - sq.total_average_exam_length_seconds) /
        sq.total_average_exam_length_seconds exam_length_percent_diff
    FROM (
        SELECT
            u.id user_id,
            (
                SELECT AVG(ue.exam_length_seconds)
                FROM user_exam ue
            ) total_average_exam_length_seconds,
            (
                SELECT
                    AVG(ue.exam_length_seconds) average_exam_length_seconds
                FROM user_exam ue
                WHERE ue.user_id = u.id
                AND ue.exam_correct_answer_rate > 0.70 -- exam correct answer rate should be larger than 70%
            ) average_exam_length_seconds
        FROM public.user u
        GROUP BY
            u.id
    ) sq
),

-- single user exam completion points from comparing to all users average
user_exam_points AS (
    SELECT
        uea.*,
        CASE
            WHEN (uea.exam_length_percent_diff > 65)
                THEN 0
            WHEN (uea.exam_length_percent_diff > 55)
                THEN 10
            WHEN (uea.exam_length_percent_diff > 45)
                THEN 20
            WHEN (uea.exam_length_percent_diff > 30)
                THEN 25
            WHEN (uea.exam_length_percent_diff > 15)
                THEN 30
            WHEN (uea.exam_length_percent_diff > -15)
                THEN 50
            WHEN (uea.exam_length_percent_diff > -25)
                THEN 65
            WHEN (uea.exam_length_percent_diff > -35)
                THEN 80
            WHEN (uea.exam_length_percent_diff > -50)
                THEN 90
            WHEN (uea.exam_length_percent_diff < -50)
                THEN 100
            ELSE NULL
        END user_exam_length_points
    
    FROM user_exam_averages uea
),


user_answers AS (
    SELECT
        ga.id given_answer_id,
        ga.state = 'CORRECT' given_answer_is_correct,
        ga.elapsed_seconds,
        ga.answer_session_id,
        asv.user_id,
        asv.start_date,
        asv.end_date,
        asv.answer_session_type
    FROM public.given_answer ga
    
    LEFT JOIN public.answer_session_view AS asv
    ON asv.answer_session_id = ga.answer_session_id
),


-- single and all users reaction time averages from video quiz questions
user_reaction_averages AS (
    SELECT
        sq.*,
        100.0 * (sq.average_reaction_time - sq.total_average_reaction_time) / sq.total_average_reaction_time reaction_time_percent_diff
    FROM (
        SELECT
            u.id user_id,
            (
                SELECT AVG(ua.elapsed_seconds)
                FROM user_answers ua
                WHERE ua.elapsed_seconds IS NOT NULL
                AND ua.user_id = u.id
            ) average_reaction_time,
            (
                SELECT AVG(ua.elapsed_seconds)
                FROM user_answers ua
                WHERE ua.elapsed_seconds IS NOT NULL
            ) total_average_reaction_time
        FROM public.user u
    ) sq
),

-- single user reaction time points from comparing to all users average
user_reaction_points AS (
    SELECT
        ura.user_id,
        ura.reaction_time_percent_diff,
        CASE
            WHEN (ura.reaction_time_percent_diff > 65)
                THEN 0
            WHEN (ura.reaction_time_percent_diff > 55)
                THEN 10
            WHEN (ura.reaction_time_percent_diff > 45)
                THEN 20
            WHEN (ura.reaction_time_percent_diff > 30)
                THEN 25
            WHEN (ura.reaction_time_percent_diff > 15)
                THEN 30
            WHEN (ura.reaction_time_percent_diff > -15)
                THEN 50
            WHEN (ura.reaction_time_percent_diff > -25)
                THEN 65
            WHEN (ura.reaction_time_percent_diff > -35)
                THEN 80
            WHEN (ura.reaction_time_percent_diff > -50)
                THEN 90
            WHEN (ura.reaction_time_percent_diff < -50)
                THEN 100
            ELSE NULL
        END user_reaction_time_points
    
    FROM user_reaction_averages ura
)

SELECT
    u.id user_id,
    COALESCE(uep.user_exam_length_points, 0) user_exam_length_points,
    COALESCE(urp.user_reaction_time_points, 0) user_reaction_time_points,
    (COALESCE(urp.user_reaction_time_points::double precision, 0) * 3 + COALESCE(uep.user_exam_length_points::double precision, 0)) / 4 total_user_reaction_time_points,
    urp.reaction_time_percent_diff
FROM public.user u

LEFT JOIN public.user_performance_answer_group_view upagv
ON upagv.user_id = u.id

LEFT JOIN user_exam_points uep
ON uep.user_id = u.id

LEFT JOIN user_reaction_points urp
ON urp.user_id = u.id

GROUP BY
    u.id,
    uep.user_exam_length_points,
    urp.user_reaction_time_points,
    urp.reaction_time_percent_diff;

--CREATE VIEW: admin_home_page_overview_view
CREATE VIEW admin_home_page_overview_view
AS
WITH
latest_course_activity_cte AS
(
	SELECT 
		cic.user_id,
		cv.course_id,
		MAX(cic.completion_date) latest_course_item_completion_date
	FROM public.course_item_completion_view cic

	LEFT JOIN public.video_version vv
	ON vv.id = cic.video_version_id

	LEFT JOIN public.exam_version ev
	ON ev.id = cic.exam_version_id

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id
	OR mv.id = ev.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id

	GROUP BY cic.user_id, cv.course_id
),

is_final_exam_completed_cte AS 
(
    SELECT
        cv.course_id,
        cic.user_id,
        (COUNT(*) > 0) is_final_exam_completed
    FROM public.course_item_completion_view cic

    LEFT JOIN public.exam_version ev
    ON ev.id = cic.exam_version_id

    LEFT JOIN public.exam_data ed
    ON ed.id = ev.exam_data_id

    LEFT JOIN public.module_version mv
    ON mv.id = ev.module_version_id

    LEFT JOIN public.course_version cv
    ON cv.id = mv.course_version_id

    WHERE ed.is_final IS TRUE
    
    GROUP BY 
        cv.course_id,
        cic.user_id
),
active_user_count_cte AS
(
	SELECT
		lcac.course_id,
		u.company_id,
		COUNT(*) active_user_count
	FROM latest_course_activity_cte lcac

	LEFT JOIN is_final_exam_completed_cte ifecc
	ON ifecc.user_id = lcac.user_id
	AND ifecc.course_id = lcac.course_id
	AND ifecc.is_final_exam_completed IS NOT TRUE
	
	LEFT JOIN public.user u
	ON u.id = lcac.user_id
	
	WHERE lcac.latest_course_item_completion_date > CURRENT_DATE - 14	
	
	GROUP BY lcac.course_id, u.company_id
),
suspended_user_count_cte AS
(
	SELECT
		lcac.course_id,
		u.company_id,
		COUNT(*) suspended_user_count
	FROM latest_course_activity_cte lcac

	LEFT JOIN is_final_exam_completed_cte ifecc
	ON ifecc.user_id = lcac.user_id
	AND ifecc.course_id = lcac.course_id
	AND ifecc.is_final_exam_completed IS NOT TRUE
	
	LEFT JOIN public.user u
	ON u.id = lcac.user_id
	
	WHERE lcac.latest_course_item_completion_date < CURRENT_DATE - 14	
	
	GROUP BY lcac.course_id, u.company_id
),
completed_user_count_cte AS
(
	SELECT
		lcac.course_id,
		u.company_id,
		COUNT(*) completed_user_count
	FROM latest_course_activity_cte lcac

	INNER JOIN is_final_exam_completed_cte ifecc
	ON ifecc.user_id = lcac.user_id
	AND ifecc.course_id = lcac.course_id
	AND ifecc.is_final_exam_completed IS TRUE
	
	LEFT JOIN public.user u
	ON u.id = lcac.user_id
		
	GROUP BY lcac.course_id, u.company_id
),
course_avg_performance_cte AS
(
	SELECT
		upv.course_id,
		u.company_id,
		AVG(upv.performance_percentage) avg_performance_percentage
	FROM public.user_performance_view upv
	
	LEFT JOIN public.user u
	ON u.id = upv.user_id
	
	WHERE upv.performance_percentage != 0
	
	GROUP BY upv.course_id, u.company_id
),
course_difficulty_count_cte AS
(
	SELECT
		cv.course_id,
		u.company_id,
		COUNT(*) difficult_videos_count
	FROM public.video_rating vr
	
	LEFT JOIN public.video_version vv
	ON vv.id = vr.video_version_id
	
	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id
	
	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id
	
	LEFT JOIN public.user u
	ON vr.user_id = u.id
	
	WHERE vr.difficulty > 4
	
	GROUP BY cv.course_id, u.company_id
),
questions_to_be_answered_count_cte AS
(
	SELECT
		u.company_id,
		cv.course_id,
		COUNT(*) questions_to_be_answered_count
	FROM public.comment com
	
	LEFT JOIN public.user u
	ON com.user_id = u.id
	
	LEFT JOIN public.video_version vv
	ON vv.id = com.video_version_id
	
	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id
	
	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id
	
	WHERE 
	com.id NOT IN 
	(
		SELECT
			comp.id
		FROM public.comment comp

		INNER JOIN public.comment comc
		ON comc.parent_comment_id = comp.id
	)
	AND com.parent_comment_id IS NULL
	
	GROUP BY u.company_id, cv.course_id
)

SELECT
	co.id course_id,
	comp.id company_id,
	COALESCE(aucc.active_user_count, 0) active_users_count,
	COALESCE(succ.suspended_user_count, 0) suspended_users_count,
	COALESCE(cucc.completed_user_count, 0) completed_users_count,
	capc.avg_performance_percentage avg_course_performance_percentage,
	COALESCE(cdcc.difficult_videos_count, 0) difficult_videos_count,
	COALESCE(qtbacc.questions_to_be_answered_count, 0) questions_waiting_to_be_answered
FROM public.course co

CROSS JOIN public.company comp

LEFT JOIN active_user_count_cte aucc
ON aucc.course_id = co.id
AND aucc.company_id = comp.id

LEFT JOIN suspended_user_count_cte succ
ON succ.course_id = co.id
AND succ.company_id = comp.id

LEFT JOIN completed_user_count_cte cucc
ON cucc.course_id = co.id
AND cucc.company_id = comp.id

LEFT JOIN course_avg_performance_cte capc
ON capc.course_id = co.id
AND capc.company_id = comp.id

LEFT JOIN course_difficulty_count_cte cdcc
ON cdcc.course_id = co.id
AND cdcc.company_id = comp.id

LEFT JOIN questions_to_be_answered_count_cte qtbacc
ON qtbacc.course_id = co.id
AND qtbacc.company_id = comp.id
;

--CREATE VIEW: improve_yourself_page_stats_view
CREATE VIEW improve_yourself_page_stats_view
AS
SELECT
    u.id user_id,

    -- time range with the most performance
    (
        SELECT
            (array_agg(mptrv.session_block ORDER BY mptrv.performance_percentage DESC))[1]
        FROM public.most_productive_time_range_view mptrv
        WHERE mptrv.user_id = u.id
    ) most_productive_time_range,

    -- day of the week with the most session time on avg
    (
		SELECT 
			udacv.day_of_the_week
		FROM public.user_daily_activity_chart_view udacv
		WHERE udacv.user_id = u.id
		AND udacv.total_session_length_seconds = 
			(
				SELECT 
					MAX(udacv2.total_session_length_seconds) 
				FROM public.user_daily_activity_chart_view udacv2
				WHERE udacv2.user_id = u.id
			)
    ) most_active_day
FROM public.user u;

--CREATE VIEW: user_engagement_view
CREATE VIEW user_engagement_view
AS
WITH
sessions AS
(
	SELECT
		usv.user_id user_id,
		EXTRACT(WEEK FROM start_date) week_num,
		usv.length_seconds > 60 * 15 is_longer_than_fifteen_minutes,
		usv.length_seconds < 60 * 5 AND usv.length_seconds != 0 is_shorter_than_five_minutes
	FROM public.user_session_view usv
	WHERE usv.is_finalized = true
),
session_groups AS
(
	SELECT
		s.user_id user_id,
		s.week_num week_num,
		COUNT(1) total_session_count,
		SUM(s.is_longer_than_fifteen_minutes::int) is_longer_than_fifteen_minutes_count,
		SUM(s.is_shorter_than_five_minutes::int) is_shorter_than_five_minutes_count
	FROM sessions s
	GROUP BY
		s.week_num,
		s.user_id
),
session_points AS
(
	SELECT
		sg.user_id user_id,
		SUM(LEAST (sg.total_session_count * 1, 10)) session_count_points,
		SUM(LEAST (sg.is_longer_than_fifteen_minutes_count * 5, 40)) is_longer_than_fifteen_minutes_points,
		SUM(GREATEST (sg.is_shorter_than_five_minutes_count * -3, -15)) is_shorter_than_five_minutes_points
	FROM session_groups sg
	GROUP BY
		sg.user_id
),
total_session_length_points AS
(
	SELECT
		-- gets points for total session length
		sq.user_id user_id,
        CASE
            -- if total length of sessions longer than 360 minutes then 50 points
			WHEN sq.length_minutes > 360
                THEN 50
            -- if total length of sessions longer than 240 minutes then 45 points
			WHEN sq.length_minutes > 240
                THEN 45
            -- if total length of sessions longer than 180 minutes then 40 points
			WHEN sq.length_minutes > 180
                THEN 40
            -- if total length of sessions longer than 120 minutes then 30 points
			WHEN sq.length_minutes > 120
                THEN 30
            -- if total length of sessions longer than 60 minutes then 15 points
            WHEN sq.length_minutes > 60
                THEN 15
            -- if total length of sessions longer than 0 minutes then 10 points
            WHEN sq.length_minutes > 0
                THEN 10
            ELSE 0
        END total_session_length_points
	FROM
	(
		SELECT
			usv.user_id,
			SUM(usv.length_seconds) / 60 length_minutes
		FROM user_session_view usv
		WHERE usv.start_date > CURRENT_DATE - 30
		GROUP BY usv.user_id
	) sq
)

SELECT
	u.id user_id,
	(tslp.total_session_length_points
	+ sp.session_count_points
	+ sp.is_longer_than_fifteen_minutes_points
	+ sp.is_shorter_than_five_minutes_points
	+ COALESCE(uicv.inactive_course_count, 0) * -10::int)::int engagement_points
FROM public.user u

LEFT JOIN session_points sp
ON sp.user_id = u.id

LEFT JOIN total_session_length_points tslp
ON tslp.user_id = u.id

LEFT JOIN public.user_inactive_course_view uicv
ON uicv.user_id = u.id;

--CREATE VIEW: course_admin_content_view
CREATE VIEW course_admin_content_view
AS
WITH
question_version_answer_counts AS 
(
	SELECT 
		qv.id question_version_id, 
		COUNT(av.id) answer_count,
		COALESCE(SUM(ad.is_correct::int), 0) correct_answer_count
	FROM public.question_version qv 

	LEFT JOIN public.answer_version av
	ON av.question_version_id = qv.id

	LEFT JOIN public.answer_data ad
	ON ad.id = av.answer_data_id

	GROUP BY
		qv.id,
		qv.video_version_id,
		qv.exam_version_id
),
questions AS 
(
	SELECT 
		qv.id question_version_id, 
		qd.question_text question_text, 
		qv.video_version_id,
		qv.exam_version_id,
		qvac.answer_count,
		qvac.correct_answer_count,
		qvac.answer_count = 0 issue_answers_missing,
		qvac.correct_answer_count = 0 issue_correct_answers_missing
	FROM public.question_version qv 

	LEFT JOIN public.question_data qd
	ON qd.id = qv.question_data_id

	LEFT JOIN public.answer_version av
	ON av.question_version_id = qv.id

	LEFT JOIN public.answer_data ad
	ON ad.id = av.answer_data_id
	
	LEFT JOIN question_version_answer_counts qvac
	ON qvac.question_version_id = qv.id
),
items AS
(
	SELECT 
		sq.video_version_id,
		sq.exam_version_id,
		sq.question_count,
		sq.question_count = 0 issue_questions_missing,
		sq.question_issues question_issues
	FROM 
	(
		SELECT 
			civ.video_version_id,
			civ.exam_version_id,
			COUNT(qs.question_version_id) question_count,
			STRING_AGG(qs.question_text || CASE WHEN qs.issue_answers_missing THEN ': ans_miss' ELSE ': corr_ans_miss' END, CHR(10)) 
				FILTER (WHERE qs.issue_answers_missing OR qs.issue_correct_answers_missing) question_issues,
			COALESCE(SUM(qs.issue_answers_missing::int), 0) missing_answers_issues_count,
			COALESCE(SUM(qs.issue_correct_answers_missing::int), 0) missing_correct_answers_count
		FROM public.course_item_view civ
		
		LEFT JOIN questions qs
		ON qs.video_version_id = civ.video_version_id 
		OR qs.exam_version_id = civ.exam_version_id

		GROUP BY
			civ.video_version_id,
			civ.exam_version_id
	) sq
	
	ORDER BY
		sq.question_count DESC
)
SELECT 
	casv.course_id,
	lcvv.version_id course_version_id,
	civ.module_name,
	civ.module_order_index,
	civ.module_version_id,
	civ.video_version_id,
	civ.exam_version_id,
	civ.item_order_index,
	civ.item_title,
	civ.item_subtitle,
	civ.item_type,
	civ.version_code,
	CONCAT_WS(
		CHR(10), 
		CASE WHEN it.issue_questions_missing THEN 'questions_missing' END, 
		it.question_issues) errors,
	CONCAT_WS(
		CHR(10), 
		CASE WHEN civ.item_type = 'video' AND vd.video_file_length_seconds > 480 
			THEN 'video_too_long' END) warnings,
	vd.video_file_length_seconds video_length
FROM public.course_admin_short_view casv

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.course_id = casv.course_id

LEFT JOIN public.course_item_view civ
ON civ.course_version_id = lcvv.version_id

LEFT JOIN items it
ON it.video_version_id = civ.video_version_id 
OR it.exam_version_id = civ.exam_version_id

LEFT JOIN public.video_version vv
ON vv.id = it.video_version_id

LEFT JOIN public.video_data vd
ON vd.id = vv.video_data_id

ORDER BY 
	casv.course_id, 
	civ.module_order_index,
	civ.item_order_index
;

--CREATE VIEW: course_details_view
CREATE VIEW course_details_view
AS
SELECT 
	co.id course_id,
	u.id user_id,
    cd.title title,
    cd.short_description short_description,
    cd.description description,
    cd.difficulty difficulty,
    cd.benchmark benchmark,
    cd.previously_completed_count previously_completed_count,
    cd.language language_name,
    cd.technical_requirements technical_requirements,
	cd.skill_benefits skill_benefits,
	cd.visibility visibility,
	cd.human_skill_benefits human_skill_benefits,
	cd.human_skill_benefits_description human_skill_benefits_description,
	cd.modification_date modification_date,
	ucb.current_item_code,
	ucb.stage_name,
	
	-- cat 
	cc.id category_id,
	cc.name category_name,
	
	-- subcat
	scc.id sub_category_id,
	scc.name sub_category_name,
	
	-- teacher 
	tuser.id teacher_id,
	tuser.first_name teacher_first_name,
	tuser.last_name teacher_last_name,
	
	-- teacher info
	tinfo.skills teacher_skills,
	tinfo.course_count teacher_course_count,
	tinfo.student_count teacher_student_count,
	tinfo.video_count teacher_video_count,
	tinfo.rating teacher_rating,
	tinfo.description teacher_description,
	tinfo.badges teacher_badges,
	
	-- teacher avatar 
	tavatarsf.file_path teacher_avatar_file_path,
	
	-- cover
	sf.file_path cover_file_path,
	
	-- calculated
	(
		SELECT cvcv.video_count
		FROM public.course_video_count_view cvcv
		WHERE cvcv.course_version_id = cv.id
	) total_video_count,
	(
		SELECT cvlv.sum_length_seconds
		FROM public.course_video_length_view cvlv
		WHERE cvlv.course_version_id = cv.id
	) total_video_sum_length_seconds,
	(
		SELECT 
			COALESCE(COUNT(mo.id), 0)::int
		FROM public.module mo
		
		LEFT JOIN public.module_version mv
		ON mv.id = mo.id
		
		LEFT JOIN public.course_version cv
		ON cv.id = mv.course_version_id
		
		LEFT JOIN public.course lco
		ON lco.id = cv.course_id
		
		WHERE lco.id = co.id
	) total_module_count,
	(
		SELECT 
			COALESCE(COUNT(qv.id), 0)::int
		FROM public.video v 
		
		LEFT JOIN public.video_version vv
		ON vv.video_id = v.id
		
			LEFT JOIN public.module_version mv
		ON mv.id = vv.module_version_id
		
		LEFT JOIN public.course_version cv
		ON cv.id = mv.course_version_id
		
		LEFT JOIN public.course lco
		ON lco.id = cv.course_id
		
		LEFT JOIN public.question_version qv
		ON qv.video_version_id = vv.id
		
		WHERE lco.id = co.id
	) total_video_question_count,
	true can_start_course
FROM public.course co

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.course_id = co.id

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

CROSS JOIN public.user u

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

LEFT JOIN public.user tuser
ON tuser.id = cd.teacher_id

LEFT JOIN public.storage_file tavatarsf
ON tavatarsf.id = tuser.avatar_file_id

LEFT JOIN public.teacher_info tinfo
ON tinfo.user_id = tuser.id

LEFT JOIN public.course_category cc
ON cc.id = cd.category_id

LEFT JOIN public.user_course_bridge ucb
ON ucb.user_id = u.id
AND ucb.course_id = cv.course_id

LEFT JOIN public.course_category scc
ON scc.id = cd.sub_category_id
	
ORDER BY
	u.id,
	co.id;

--CREATE VIEW: exam_player_data_view
CREATE VIEW exam_player_data_view
AS
WITH
latest_exam_version_cte AS (
    SELECT
        ev.exam_id,
        MAX(ev.id) version_id
    FROM public.exam_version ev
    GROUP BY
        ev.exam_id
),
successful_answer_sessions AS (
	SELECT
		*
	FROM public.answer_session_view asev

 	WHERE asev.is_successful
),
latest_answer_session_data AS (
	SELECT
		lasv.user_id,
		lasv.exam_version_id,
		lasv.answer_session_id,
		asv.correct_given_answer_count correct_answer_count,
		asv.answered_question_count total_question_count,
		asv.answer_session_success_rate correct_answer_rate,
		asv.is_successful
	FROM public.latest_answer_session_view lasv

	LEFT JOIN public.answer_session_view asv
	ON asv.answer_session_id = lasv.answer_session_id
)
SELECT
	u.id user_id,
	ex.id exam_id,
	ev.id exam_version_id,
	false is_deleted,
	ex.is_pretest,
	ex.is_signup,
	ed.title title,
	ed.subtitle subtitle,
	ed.description description,
	ed.thumbnail_url thumbnail_url,
	ed.order_index order_index,
	ed.is_final is_final_exam,
	lcvv.course_id course_id,
	mv.module_id module_id,
	ed.retake_limit retake_limit,
	(
		SELECT
			COUNT(1)::int
		FROM successful_answer_sessions sas
		WHERE sas.exam_version_id = ev.id AND sas.user_id = u.id
	) successful_completion_count,
	(
		SELECT
			COUNT(1) <= ed.retake_limit OR ed.retake_limit IS NULL
		FROM successful_answer_sessions sas
		WHERE sas.exam_version_id = ev.id
		AND sas.user_id = u.id
	) can_retake,
	lasd.answer_session_id,
	lasd.correct_answer_count,
	lasd.total_question_count,
	lasd.correct_answer_rate,
	lasd.total_question_count IS NOT NULL is_completed_previously
FROM public.exam ex

LEFT JOIN latest_exam_version_cte levc
ON levc.exam_id = ex.id

LEFT JOIN public.exam_version ev
ON ev.id = levc.version_id

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.version_id = mv.course_version_id

CROSS JOIN public.user u

LEFT JOIN latest_answer_session_data lasd
ON lasd.user_id = u.id
AND lasd.exam_version_id = levc.version_id

ORDER BY
	u.id,
	ex.id
;

--CREATE VIEW: pretest_result_view
CREATE VIEW pretest_result_view
AS
SELECT  
	lasv.user_id,
	lasv.answer_session_id,
	lasv.exam_version_id,
	cv.course_id,
	esv.score_percentage,
	cic.completion_date
FROM public.latest_answer_session_view lasv

INNER JOIN public.exam_version ev
ON ev.id = lasv.exam_version_id

INNER JOIN public.exam e
ON e.id = ev.exam_id
AND e.is_pretest = true

INNER JOIN public.exam_score_view esv
ON esv.answer_session_id = lasv.answer_session_id

INNER JOIN public.course_item_completion_view cic
ON cic.answer_session_id = lasv.answer_session_id

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id;

--CREATE VIEW: user_course_completion_original_estimation_view
CREATE VIEW user_course_completion_original_estimation_view
AS

SELECT 
	sq.*,
	DATE_TRUNC('days', sq.start_date) + (INTERVAL '1' day * sq.previsioned_duration_days) previsioned_completion_date,
	CEIL(sq.total_item_count::double precision / sq.previsioned_duration_days) previsioned_items_per_day
FROM 
(
	SELECT 
		ucb.user_id user_id,
		ucb.course_id course_id,
		cicv.item_count total_item_count,
		DATE_TRUNC('days', ucb.creation_date) start_date,
		upav.estimated_minutes_per_day,
		CEIL(clev.total_length_seconds / 60.0) course_duration_minutes,
		CEIL(clev.total_length_seconds / 60.0 / upav.estimated_minutes_per_day) previsioned_duration_days
	FROM public.user_course_bridge ucb

	LEFT JOIN public.user_prequiz_answers_view upav
	ON upav.user_id = ucb.user_id 
		AND upav.course_id = ucb.course_id

	LEFT JOIN public.course_length_estimation_view clev
	ON clev.course_id = ucb.course_id

	LEFT JOIN public.course_item_count_view cicv
	ON cicv.course_id = ucb.course_id

	ORDER BY
		ucb.user_id,
		ucb.course_id
) sq;

--CREATE VIEW: user_permission_view
CREATE VIEW user_permission_view
AS
WITH 
user_assigned_permissions AS 
(
	SELECT 
		u.id assignee_user_id,
		pab.context_company_id,
		pab.context_course_id,
		NULL::int role_id,
		pab.permission_id,
		pab.id assignment_bridge_id
	FROM public.user u

	INNER JOIN public.permission_assignment_bridge pab
	ON pab.assignee_user_id = u.id
),
role_inherited_permissions AS 
(
	SELECT
		u.id assignee_user_id,
		rab.context_company_id,
		NULL::int context_course_id,
		rpb.role_id,
		rpb.permission_id,
		NULL::int assignment_bridge_id
	FROM public.user u

	INNER JOIN public.role_assignment_bridge rab
	ON rab.assignee_user_id = u.id
	
	LEFT JOIN public.role_permission_bridge rpb
	ON rpb.role_id = rab.role_id
),
company_inherited_permissions AS 
(
	SELECT 
		u.id assignee_user_id, 
		cpv.context_company_id, 
		cpv.context_course_id, 
		cpv.role_id,
		cpv.permission_id,
		NULL::int assignment_bridge_id
	FROM public.company_permission_view cpv
	
	INNER JOIN public.user u
	ON u.company_id = cpv.assignee_company_id
),
inherited_or_assigned_permissions AS 
(
	-- permissions assigned to user 
	SELECT uap.*
	FROM user_assigned_permissions uap

	UNION

	-- role inherited permissions 
	SELECT rip.*
	FROM role_inherited_permissions rip

	UNION

	-- permissions inherited from user's company
	SELECT cip.* 
	FROM company_inherited_permissions cip
),
watch_course_permissions AS 
(
	SELECT 
        cab.user_id assignee_user_id,
		cab.course_id context_course_id,
		pe.id permission_id
    FROM public.course_access_bridge cab

    LEFT JOIN public.permission pe 
	ON pe.code = 'WATCH_COURSE'
),
survey_permissions AS 
(
	SELECT 
        u.id assignee_user_id,
		pe.id permission_id,
		u.company_id context_company_id
    FROM public.user u
	
	LEFT JOIN public.signup_completed_view scv
	ON scv.user_id = u.id
	
    LEFT JOIN public.permission pe 
	ON pe.code = 'BYPASS_SURVEY'
	
	WHERE u.is_survey_required = false 
	OR scv.is_signup_complete
),
user_god_permissions AS (
	SELECT 
		u.id assignee_user_id,
		co.id context_company_id,
		cour.id context_course_id,
		comm.id context_comment_id,
		pe.id permission_id
	FROM public.permission pe

	LEFT JOIN public.company co
	ON pe.scope = 'COMPANY'
	
	LEFT JOIN public.course cour
	ON pe.scope = 'COURSE'
	
	LEFT JOIN public.comment comm
	ON pe.scope = 'COMMENT'
	
	INNER JOIN public.user u
	ON u.is_god = true
	
	ORDER BY
		u.id,
		co.id,
		cour.id,
		pe.id
),
comment_permissions AS 
(
	SELECT 
		co.user_id assignee_user_id,
		co.id context_comment_id,
		pe.id permission_id
	FROM public.comment co
	
	LEFT JOIN public.permission pe
	ON pe.code = 'EDIT_COMMENT' 
	OR pe.code = 'DELETE_COMMENT'
),
all_permissions AS 
(
	SELECT
		cp.assignee_user_id,
		NULL::int context_company_id,
		NULL::int context_course_id,
		cp.context_comment_id,
		NULL::int role_id,
		cp.permission_id,
		NULL::int assignment_bridge_id 
	FROM comment_permissions cp
	
	UNION
	
	-- permissions assigned to user 
	SELECT 
		ioa.assignee_user_id,
		ioa.context_company_id,
		ioa.context_course_id,
		NULL::int context_comment_id,
		ioa.role_id,
		ioa.permission_id,
		ioa.assignment_bridge_id
	FROM inherited_or_assigned_permissions ioa

	UNION

	-- god permissions only the best of us can have
	SELECT 
		ugp.assignee_user_id,
		ugp.context_company_id,
		ugp.context_course_id,
		ugp.context_comment_id,
		NULL::int role_id,
		ugp.permission_id,
		NULL::int assignment_bridge_id
	FROM user_god_permissions ugp

	UNION

-- 	watch course permissions 
	SELECT 
		wcp.assignee_user_id,
		NULL::int context_company_id,
		wcp.context_course_id,
		NULL::int context_comment_id,
		NULL::int role_id,
		wcp.permission_id,
		NULL::int assignment_bridge_id
	FROM watch_course_permissions wcp

	UNION

-- 	watch course permissions 
	SELECT 
		supe.assignee_user_id,
		supe.context_company_id,
		NULL::int context_course_id,
		NULL::int context_comment_id,
		NULL::int role_id,
		supe.permission_id,
		NULL::int assignment_bridge_id
	FROM survey_permissions supe
),
v AS 
(
	SELECT
		u.id assignee_user_id,
		
		-- context company
		co.id context_company_id,
		co.name context_company_name,
		
		-- context course 
		ap.context_course_id,
		cd.title context_course_name,
		
		-- context course 
		ap.context_comment_id,
	
		pe.id permission_id,
		pe.code permission_code,
		pe.scope permission_scope,
		parent_ro.id parent_role_id,
		parent_ro.name parent_role_name,
		ap.assignment_bridge_id
	FROM public.user u

	INNER JOIN all_permissions ap
	ON ap.assignee_user_id = u.id

	INNER JOIN public.permission pe
	ON pe.id = ap.permission_id

	LEFT JOIN public.company co
	ON co.id = ap.context_company_id

	LEFT JOIN public.latest_course_version_view lcv
	ON lcv.course_id = ap.context_course_id
	
	LEFT JOIN public.course_version cv
	ON cv.id = lcv.version_id
	
	LEFT JOIN public.course_data cd
	ON cd.id = cv.course_data_id

	LEFT JOIN public.role parent_ro
	ON parent_ro.id = ap.role_id

	ORDER BY
		u.id,
		ap.context_company_id,
		ap.context_course_id,
		pe.id
)
SELECT * FROM v
;

--CREATE VIEW: assignable_permission_view
CREATE VIEW assignable_permission_view
AS
-- Assignable permission view for a user in a company
-- ther's intentionally no context_course_id present since we 
-- are assigning course level permissions in a course level admin page as well.

WITH 
permissions AS 
(
	SELECT 
		upv.assignee_user_id,
		upv.context_company_id,
		pe.id permission_id,
		pe.code permission_code,
		pe.scope permission_scope
	FROM public.permission pe
	
	INNER JOIN public.user_permission_view upv
	ON (upv.permission_code = 'ASSIGN_COMPANY_PERMISSIONS' AND pe.scope = 'COMPANY')
	OR (upv.permission_code = 'ASSIGN_GLOBAL_PERMISSIONS' AND pe.scope = 'USER')
	OR (upv.permission_code = 'ASSIGN_COURSE_PERMISSIONS' AND pe.scope = 'COURSE')
)
SELECT * FROM permissions

ORDER BY
	assignee_user_id,
	permission_scope,
	context_company_id,
	permission_id	;

--CREATE VIEW: company_view
CREATE VIEW company_view
AS
SELECT 
	u.id user_id,
	co.id company_id,
	co.deletion_date IS NOT NULL is_deleted,
	co.name company_name,
	upv.assignee_user_id IS NOT NULL can_manage,
	co.is_survey_required
FROM company co 

CROSS JOIN public.user u

LEFT JOIN public.user_permission_view upv
ON upv.context_company_id = co.id 
	AND upv.assignee_user_id = u.id 
	AND upv.permission_code = 'MANAGE_COMPANY';

--CREATE VIEW: role_list_view
CREATE VIEW role_list_view
AS
WITH 
roles AS 
(
	SELECT 
		upv.assignee_user_id, 
		r.id role_id
	FROM public.role r

	INNER JOIN public.user_permission_view upv
	ON (upv.context_company_id = r.company_id AND upv.permission_code = 'VIEW_CUSTOM_ROLES')
	OR (r.company_id IS NULL AND upv.permission_code = 'VIEW_PREDEFINED_ROLES')
)
SELECT 
	u.id user_id,
	u.email user_email,
	co.id owner_company_id,
	r.deletion_date IS NOT NULL is_deleted,
	r.id role_id,
	r.name role_name,
	co.name owner_name,
	pe.id permission_id,
	pe.code permission_code
FROM roles

LEFT JOIN public.user u
ON u.id = roles.assignee_user_id

LEFT JOIN public.role r
ON r.id = roles.role_id

LEFT JOIN public.company co
ON co.id = r.company_id

LEFT JOIN public.role_permission_bridge rpb
ON rpb.role_id = r.id

LEFT JOIN public.permission pe
ON pe.id = rpb.permission_id

ORDER BY
	u.id,
	co.id,
	r.id,
	pe.id
;

--CREATE VIEW: user_role_assign_company_view
CREATE VIEW user_role_assign_company_view
AS
SELECT 
	u.id user_id,
	co.id company_id,
	co.name company_name,
	upv.assignee_user_id IS NOT NULL can_assign
FROM public.company co

CROSS JOIN public.user u

LEFT JOIN public.user_permission_view upv
ON upv.context_company_id = co.id
AND upv.assignee_user_id = u.id
AND upv.permission_code = 'ASSIGN_ROLES_TO_COMPANY'

ORDER BY
	u.id,
	co.id;

--CREATE VIEW: assignable_role_view
CREATE VIEW assignable_role_view
AS
WITH 
assignable_role_ids AS 
(
	SELECT 
		u.id assigner_user_id,
		upv.context_company_id,
		ro.id role_id,
		ro.name role_name
	FROM public.user u
	
	LEFT JOIN public.user_permission_view upv
	ON upv.assignee_user_id = u.id
	AND (upv.permission_code = 'ASSIGN_PREDEFINED_ROLES' 
		OR upv.permission_code = 'ASSIGN_CUSTOM_ROLES')
	
	INNER JOIN public.role ro
	ON (ro.is_custom = false AND upv.permission_code = 'ASSIGN_PREDEFINED_ROLES') 
	OR (ro.company_id = upv.context_company_id AND upv.permission_code = 'ASSIGN_CUSTOM_ROLES') 
	
	ORDER BY 
		u.id,
		upv.context_company_id,
		ro.id
),
roles AS
(
	SELECT 
		assigner_u.id assigner_user_id,
		assignee_u.id assignee_user_id,
		co.id context_company_id,
		co.name context_company_name,
		ro.id role_id,
		ro.name role_name,
		ro.is_custom,
		CASE WHEN ro.is_custom THEN co.id ELSE NULL END owner_company_id,
		CASE WHEN ro.is_custom THEN co.name ELSE NULL END owner_company_name,
		urv.role_id IS NOT NULL is_assigned,
		CASE WHEN assignee_u.is_god THEN false ELSE ari.role_id IS NOT NULL END can_assign 
	FROM public.user assigner_u
	
	CROSS JOIN public.user assignee_u
	
	CROSS JOIN public.company co

	LEFT JOIN public.role ro
	ON ro.is_custom = false OR ro.company_id = co.id
	
	LEFT JOIN public.user_role_view urv
	ON urv.assignee_user_id = assignee_u.id
	AND urv.role_id = ro.id 
	AND (urv.context_company_id IS NULL OR urv.context_company_id = co.id) 
	
	LEFT JOIN assignable_role_ids ari
	ON ari.assigner_user_id = assigner_u.id
		AND ari.role_id = ro.id
		AND ari.context_company_id = co.id
	
	ORDER BY 
		assigner_user_id,
		assignee_user_id,
		context_company_id,
		role_id
),
perm_join AS 
(
	SELECT 
		ro.*,
		pe.id permission_id,
		pe.code permission_code
	FROM roles ro

	LEFT JOIN public.role_permission_bridge rpb
	ON rpb.role_id = ro.role_id
	
	LEFT JOIN public.permission pe
	ON pe.id = rpb.permission_id

	ORDER BY 
		ro.assigner_user_id,
		ro.assignee_user_id,
		ro.context_company_id,
		ro.role_id,
		rpb.permission_id
)
SELECT * FROM perm_join
-- SELECT * FROM assignable_role_ids

-- WHERE assigner_user_id = 1 AND context_company_id = 2 AND assignee_user_id = 2


;

--CREATE VIEW: exam_result_stats_view
CREATE VIEW exam_result_stats_view
AS
WITH
question_correct_answer_rates AS
(
	SELECT
		ase.id answer_session_id,
		ase.user_id,
		qv.id question_version_id,
		AVG((ga.state = 'CORRECT')::int)::int * 100 correct_answer_rate
	FROM public.given_answer ga

	LEFT JOIN public.question_version qv
	ON qv.id = ga.question_version_id

	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id

	GROUP BY ase.id, ase.user_id, qv.id
),
fully_correctly_answered_questions AS
(
    SELECT
        qcar.answer_session_id,
        COUNT(qcar.correct_answer_rate = 100 OR NULL)::int fully_correctly_answered_questions_count
    FROM question_correct_answer_rates qcar

    GROUP BY qcar.answer_session_id
),
answer_session_lengths AS
(
	SELECT
		asv.answer_session_id,
		asv.start_date,
		asv.end_date,
		EXTRACT(EPOCH FROM (asv.end_date::time - asv.start_date::time))::double precision AS length_seconds
	FROM public.answer_session_view asv

	WHERE asv.start_date IS NOT NULL
	AND asv.end_date IS NOT NULL
),
avg_exam_score_per_company_cte AS
(
	SELECT
		u.company_id,
		ev.exam_id,
		AVG(esv.score_percentage)::int avg_score_percentage
	FROM public.exam_score_view esv

	LEFT JOIN public.exam_version ev
	ON ev.id = esv.exam_version_id

	LEFT JOIN public.answer_session ase
	ON ase.id = esv.answer_session_id

	LEFT JOIN public.user u
	ON u.id = ase.user_id

	GROUP BY
		u.company_id,
		ev.exam_id
),
question_count AS
(
	SELECT
		ev.id exam_version_id,
		COUNT(qv.id)::int question_count
	FROM public.exam_version ev

	LEFT JOIN public.question_version qv
	ON qv.exam_version_id = ev.id

	GROUP BY  ev.id
)
SELECT
	u.id user_id,
	ev.id exam_version_id,
	ase.id answer_session_id,
	fcaq.fully_correctly_answered_questions_count,
    qc.question_count question_count,
	asl.length_seconds::int exam_length_seconds,
	esv.score_percentage,
	esv.exam_score,
	esv.exam_max_score,
	esv.answered_question_count,
	aespcc.avg_score_percentage,
	esv.score_percentage - aespcc.avg_score_percentage score_percentage_diff_from_avg,
    ehsasv.is_highest_score IS NOT DISTINCT FROM true is_highest_score_session
FROM answer_session ase

LEFT JOIN public.user u
ON u.id = ase.user_id

LEFT JOIN public.exam_highest_score_answer_session_view ehsasv
ON ehsasv.answer_session_id = ase.id

LEFT JOIN public.exam_version ev
ON ev.id = ase.exam_version_id

LEFT JOIN public.exam e
ON e.id = ev.exam_id

LEFT JOIN answer_session_lengths asl
ON asl.answer_session_id = ase.id

LEFT JOIN avg_exam_score_per_company_cte aespcc
ON aespcc.company_id = u.company_id
AND aespcc.exam_id = e.id

LEFT JOIN fully_correctly_answered_questions fcaq
ON fcaq.answer_session_id = ase.id

LEFT JOIN question_count qc
ON qc.exam_version_id = ase.id

LEFT JOIN public.exam_score_view esv
ON esv.answer_session_id = ase.id

-- filter signup exam
WHERE e.id != 1

ORDER BY
	u.id,
	e.id,
	ase.id
;

--CREATE VIEW: home_page_stats_view
CREATE VIEW home_page_stats_view
AS
SELECT 
    u.id user_id,

    -- videos to be repeated count
	(
		SELECT 
			COALESCE(SUM(is_recommended_for_practise::int), 0)
		FROM public.user_practise_recommendation_view uprv
		WHERE uprv.user_id = u.id
	) videos_to_be_repeated_count,
    
    -- completed video count in the last 30 days
    (
        SELECT 
            COUNT(*)::int
        FROM public.course_item_completion_view cicv
        
        WHERE cicv.user_id = u.id
        AND cicv.completion_date > CURRENT_DATE - 30 
        AND cicv.video_version_id IS NOT NULL
        AND cicv.is_pretest IS NOT TRUE
    ) completed_videos_last_month,

    -- performance last month
    (
        SELECT
            ROUND(AVG(upv.performance_percentage::int), 0)
        FROM public.activity_session ase
    
        LEFT JOIN public.user_session_activity AS usa
        ON usa.activity_session_id = ase.id

        LEFT JOIN public.video_version vv
        ON vv.id = usa.video_version_id

        LEFT JOIN public.exam_version ev
        ON ev.id = usa.exam_version_id

        LEFT JOIN public.module_version mv
        ON mv.id = vv.module_version_id
        OR mv.id = ev.module_version_id
        
        LEFT JOIN public.course_version cv
        ON cv.id = mv.course_version_id

        LEFT JOIN public.user_performance_view upv
        ON upv.course_id = cv.course_id
        AND upv.user_id = ase.user_id

        WHERE ase.start_date > CURRENT_DATE - 30
		AND upv.course_id IS NOT NULL
    ) performance_last_month
FROM public.user u

GROUP BY u.id;

--CREATE VIEW: user_learning_page_stats_view
CREATE VIEW user_learning_page_stats_view
AS
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
			COUNT(*)::int
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

ORDER BY u.id;

--CREATE VIEW: user_performance_comparison_stats_view
CREATE VIEW user_performance_comparison_stats_view
AS
WITH user_performances AS (
    SELECT
        u.id user_id,
        AVG(upv.performance_percentage) user_performance_average
    FROM public.user u

             LEFT JOIN public.user_performance_view upv
                       ON upv.user_id = u.id

    GROUP BY u.id
),
 watched_videos AS (
     SELECT
         cic.user_id,
         SUM((cic.video_version_id IS NOT NULL)::int) watched_videos_count
     FROM public.course_item_completion_view cic
     GROUP BY cic.user_id
 ),
 engagement_points AS (
     SELECT
         uev.user_id,
         uev.engagement_points
     FROM public.user_engagement_view uev
 ),
 required_or_started_courses AS (
    SELECT
        ucb.user_id,
        COUNT(*)::int::boolean is_any_course_required_or_started
    FROM user_course_bridge ucb

    WHERE ucb.start_date IS NOT NULL
    OR ucb.required_completion_date IS NOT NULL

    GROUP BY ucb.user_id
 )

SELECT
    up.user_id,
    u.company_id,
    u.creation_date,
    rosc.is_any_course_required_or_started,
    up.user_performance_average,
    COALESCE(ep.engagement_points, 0) engagement_points,
    COALESCE(wv.watched_videos_count, 0) watched_videos_count
FROM user_performances up

LEFT JOIN watched_videos wv
ON wv.user_id = up.user_id

LEFT JOIN engagement_points ep
ON ep.user_id = up.user_id

LEFT JOIN public.user u
ON u.id = up.user_id

LEFT JOIN required_or_started_courses rosc
ON rosc.user_id = up.user_id
;

--CREATE VIEW: exam_result_view
CREATE VIEW exam_result_view
AS
SELECT 
	u.id user_id,
	ev.id exam_version_id,
	qv.id question_version_id,
	av.id answer_version_id,
	ase.id answer_session_id,
	ga.id given_answer_id,
	ga.state IS NOT DISTINCT FROM 'CORRECT' is_correct,
	CASE WHEN ga.state IS NULL 
		THEN 'INCORRECT' 
		ELSE ga.state 
	END given_answer_state,
	COALESCE(ga.score, 0) question_score,
	ed.is_final is_final_exam,
	qd.question_text question_text,
	qd.max_score::int question_max_score,
	asv.is_completed is_completed_session,
	asv.is_successful is_successful_session,
	ecv.single_successful_session AND asv.is_successful only_successful_session,
	agab.id answer_bridge_id,
	agab.answer_version_id user_answer_version_id,
	agab.answer_version_id = av.id IS NOT DISTINCT FROM true is_given_answer,
	ad.is_correct IS NOT DISTINCT FROM true is_answer_correct,
	ad.text answer_text,
	av.answer_id
FROM public.exam_version ev

CROSS JOIN public.user u

INNER JOIN public.latest_answer_session_view lasv
ON lasv.user_id = u.id 
AND lasv.exam_version_id = ev.id

LEFT JOIN public.answer_session ase
ON ase.id = lasv.answer_session_id

INNER JOIN public.exam e
ON e.id = ev.exam_id
AND e.id != 1 

LEFT JOIN public.question_version qv
ON qv.exam_version_id = ev.id

LEFT JOIN public.answer_version av
ON av.question_version_id = qv.id

LEFT JOIN public.given_answer ga
ON ga.question_version_id = qv.id
AND ga.answer_session_id = ase.id

LEFT JOIN public.question_data qd
ON qd.id = qv.question_data_id

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id
	
LEFT JOIN public.answer_session_view asv
ON asv.exam_version_id = ev.id
AND asv.answer_session_id = ase.id
	
LEFT JOIN public.exam_completed_view ecv
ON ecv.exam_version_id = ev.id
AND ecv.user_id = u.id

LEFT JOIN public.answer_data ad
ON ad.id = av.answer_data_id

LEFT JOIN public.answer_given_answer_bridge agab
ON agab.given_answer_id = ga.id
AND agab.answer_version_id = av.id

CROSS JOIN public.constant_values_view consts

ORDER BY 
	u.id,
	ev.id,
	ga.id DESC NULLS LAST,
	qv.id,
	av.id,
	ase.id;

--CREATE VIEW: tempomat_calculation_data_view
CREATE VIEW tempomat_calculation_data_view
AS
SELECT 
	ucb.user_id,
	ucb.course_id,
	ucb.required_completion_date,
	ucb.start_date start_date,
    ucb.tempomat_mode tempomat_mode,
	uccoev.previsioned_completion_date original_previsioned_completion_date,
	ucpa.total_item_count total_item_count,
	ucpa.total_completed_item_count total_completed_item_count,
	CASE WHEN ucb.tempomat_mode = 'light'
		THEN 1
		ELSE CASE WHEN ucb.tempomat_mode = 'strict'
			THEN 0
			ELSE (tav.min_value + ((tav.max_value - tav.min_value) / 10 * upav.experience)) * 0.01
		END 
	END tempomat_adjustment_value
FROM public.user_course_bridge ucb

LEFT JOIN public.user_course_progress_view ucpv
ON ucpv.course_id = ucb.course_id
AND ucpv.user_id = ucb.user_id

LEFT JOIN public.user_course_progress_actual_view ucpa
ON ucpa.course_id = ucb.course_id
AND ucpa.user_id = ucb.user_id

LEFT JOIN public.user_course_completion_original_estimation_view uccoev
ON uccoev.course_id = ucb.course_id
AND uccoev.user_id = ucb.user_id

LEFT JOIN public.user_prequiz_answers_view upav
ON upav.user_id = ucb.user_id
	AND upav.course_id = ucb.course_id

LEFT JOIN public.tempomat_adjustment_value tav
ON tav.prequiz_answer_id = upav.planned_usage_answer_id 
	AND tav.tempomat_mode = ucb.tempomat_mode
;

--CREATE VIEW: user_overview_view
CREATE VIEW user_overview_view
AS
WITH user_performance_averages AS
(
	SELECT
		upv.user_id,
		AVG(upv.performance_percentage::int)::int average_performance_percentage
	FROM public.user_performance_view upv

	WHERE upv.performance_percentage IS NOT NULL
	AND upv.performance_percentage != 0
	
	GROUP BY upv.user_id

), 
total_user_sessions AS
(	
	SELECT 
		usav.user_id,
		SUM(usav.length_seconds)::int total_session_length_seconds
	FROM public.user_session_view usav

	GROUP BY usav.user_id
),
completed_course_items AS
(
	SELECT
		cic.user_id,
		COUNT(*)::int completed_course_item_count
	FROM public.course_item_completion_view cic

	GROUP BY cic.user_id
)

SELECT 
	u.id user_id,
	u.first_name,
	u.last_name,
	u.company_id,
	u.email user_email,
	u.creation_date signup_date,
	sf.file_path avatar_file_path,
	upa.average_performance_percentage,
	tus.total_session_length_seconds,
	cci.completed_course_item_count,
	uev.engagement_points
FROM public.user u

LEFT JOIN public.storage_file sf
ON sf.id = u.avatar_file_id

LEFT JOIN user_performance_averages upa
ON upa.user_id = u.id

LEFT JOIN total_user_sessions tus
ON tus.user_id = u.id

LEFT JOIN completed_course_items cci
ON cci.user_id = u.id

LEFT JOIN public.user_engagement_view uev
ON uev.user_id = u.id

WHERE u.deletion_date IS NULL
;

--CREATE VIEW: playlist_view
CREATE VIEW playlist_view
AS
WITH 
all_items_cte AS 
(
    SELECT 
        cv.course_id,
        cv.id course_version_id,
        mv.module_id module_id,
        uni.video_version_id,
        uni.exam_version_id
    FROM 
    (
        SELECT 
            vv.module_version_id, 
            vv.id video_version_id,
            null exam_version_id
        FROM public.video_version vv
        UNION
        SELECT
            ev.module_version_id, 
            null video_version_id,
            ev.id exam_version_id
        FROM public.exam_version ev
    ) uni
    
    LEFT JOIN public.module_version mv
    ON mv.id = uni.module_version_id 
    
    LEFT JOIN public.course_version cv
    ON cv.id = mv.course_version_id
    
    ORDER BY
        cv.course_id,
        cv.id
),
latest_items_cte AS 
(
    SELECT 
        aic.*
    FROM all_items_cte aic
    
	INNER JOIN public.latest_course_version_view lcvi
	ON lcvi.version_id = aic.course_version_id
),
latest_items_with_codes_cte AS 
(
	SELECT 
        lcvi.course_id,
		civ.*,
	
        -- module code
        (SELECT encode((lic.module_id || '@module')::bytea, 'base64')) module_code,

        -- playlist item code
        CASE WHEN civ.video_id IS NULL
            THEN (SELECT encode((civ.exam_id || '@exam')::bytea, 'base64'))
            ELSE (SELECT encode((civ.video_id || '@video')::bytea, 'base64')) 
        END playlist_item_code
	FROM latest_items_cte lic 
	
	INNER JOIN public.latest_course_version_view lcvi
	ON lcvi.version_id = lic.course_version_id
    
    INNER JOIN public.course_item_view civ 
    ON (civ.exam_version_id = lic.exam_version_id 
    OR civ.video_version_id = lic.video_version_id)
    AND civ.item_type <> 'pretest'
    
),
items_with_user AS
(
	SELECT 
		ucb.user_id,
		ucb.course_id,
		civ.module_order_index,
		civ.item_order_index,
		civ.video_version_id,
		civ.exam_version_id,
		civ.item_title,
		civ.course_version_id,
		civ.video_id,
		civ.exam_id,
		civ.module_version_id,
		civ.module_id,
		civ.module_name,
		civ.module_code,
		civ.item_type,
		civ.item_subtitle,
		civ.playlist_item_code,
        ucb.current_item_code = civ.module_code module_is_current,
		esv.score_percentage,
        uprv.is_recommended_for_practise IS TRUE is_recommended_for_practise,
 
        -- state
		CASE 
			WHEN ucb.current_item_code = civ.playlist_item_code
				THEN 'current'
			WHEN vc.completion_date IS NOT NULL OR ec.completion_date IS NOT NULL
				THEN 'completed'
			WHEN ucb.course_mode = 'advanced' 
				THEN 'available'
            WHEN civ.item_order_index = 0 AND civ.module_order_index = 1
                THEN 'available'
			WHEN LAG(vc.completion_date, 1) OVER (
                PARTITION BY civ.course_version_id 
                ORDER BY module_order_index, item_order_index) IS NOT NULL 
				THEN 'available'
				ELSE 'locked'
		END item_state
	FROM latest_items_with_codes_cte civ
	
	LEFT JOIN public.course_version cv 
	ON cv.id = civ.course_version_id
	
	INNER JOIN public.user_course_bridge ucb
	ON ucb.course_id = cv.course_id

	LEFT JOIN public.exam_highest_score_answer_session_view ehsasv
	ON ehsasv.exam_id = civ.exam_id
	AND ehsasv.user_id = ucb.user_id
	
	LEFT JOIN public.exam_score_view esv
	ON esv.answer_session_id = ehsasv.answer_session_id
	
	LEFT JOIN public.video_completion vc
	ON vc.video_version_id = civ.video_version_id
	AND vc.user_id = ucb.user_id
	
	LEFT JOIN public.exam_completion ec
	ON ec.answer_session_id = ehsasv.answer_session_id

    LEFT JOIN public.user_practise_recommendation_view uprv
    ON uprv.video_version_id = civ.video_version_id
    AND uprv.user_id = ucb.user_id
)
SELECT * 
FROM items_with_user

ORDER BY
	user_id,
	course_id,
	module_order_index,
	item_order_index;

--CREATE VIEW: course_all_items_completed_view
CREATE VIEW course_all_items_completed_view
AS
SELECT 
	sq.course_id,
	sq.course_version_id,
	sq.user_id
FROM
(
	SELECT 
		cipv.course_id,
		cipv.course_version_id,
		cipv.user_id,
		COUNT(cipv.course_id) all_item_count,
		SUM(CASE WHEN cipv.item_state = 'completed' THEN 1 ELSE 0 END) completed_count
	FROM public.playlist_view cipv

	GROUP BY 
		cipv.course_id,
		cipv.user_id,
		cipv.course_version_id
) sq

WHERE sq.completed_count = sq.all_item_count;

--CREATE VIEW: user_module_stats_view
CREATE VIEW user_module_stats_view
AS
WITH 
module_item_count_cte AS
(
	SELECT 
		mv.module_id,
		COUNT(*)::int total_item_count
	FROM public.latest_course_version_view lcvv

	LEFT JOIN public.module_version mv
	ON mv.course_version_id = lcvv.version_id

	LEFT JOIN public.course_item_view civ
	ON civ.module_id = mv.module_id
		AND civ.item_type != 'pretest'

	GROUP BY
		mv.module_id
),
course_item_completion_distinct AS 
(
	SELECT DISTINCT
		cicv.user_id,
		cicv.course_id,
		cicv.module_id,
		cicv.video_id,
		cicv.exam_id
	FROM public.course_item_completion_view cicv
),
module_progress_cte AS 
(
	SELECT DISTINCT
		cicd.user_id,
		cicd.course_id,
		cicd.module_id,
		COUNT(*) completed_course_item_count
	FROM course_item_completion_distinct cicd
	
	GROUP BY cicd.user_id, cicd.course_id, cicd.module_id
),
-- Selects the last exam of a module
module_last_exam AS
(
	SELECT
		mv.module_id,
		ev.exam_id,
		MAX(ed.order_index) item_order_index
	FROM public.module_version mv
	
	LEFT JOIN public.exam_version ev
	ON ev.module_version_id = mv.id
	
	LEFT JOIN public.exam_data ed
	ON ed.id = ev.exam_data_id
	
	WHERE ed.order_index != 0
	
	GROUP BY mv.module_id, ev.exam_id
	
	ORDER BY mv.module_id, ev.exam_id
),
module_last_exam_score_cte AS 
(
	SELECT
		lasv.user_id,
		mle.module_id,
		asv.answer_session_success_rate last_exam_score
	FROM public.latest_answer_session_view lasv
	
	LEFT JOIN public.exam_version ev
	ON ev.id = lasv.exam_version_id
	
	INNER JOIN module_last_exam mle
	ON mle.exam_id = ev.exam_id
	
	LEFT JOIN public.answer_session_view asv
	ON asv.answer_session_id = lasv.answer_session_id
),
module_question_success_rate_cte AS
(
	SELECT 
		asv.user_id,
		mv.module_id,
		(AVG(ga.score) / 4) * 100 question_success_rate
	FROM public.given_answer ga
	
	INNER JOIN public.answer_session_view asv
	ON asv.answer_session_id = ga.answer_session_id
	AND asv.video_version_id IS NOT NULL
	
	LEFT JOIN public.video_version vv
	ON vv.id = asv.video_version_id
	
	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id	 
	
	GROUP BY asv.user_id, mv.module_id
),
module_videos_to_be_repeated_cte AS
(
	SELECT 
		asv.user_id,
		mv.module_id,
		COUNT(*) videos_to_be_repeated_count
	FROM public.given_answer ga
	
	INNER JOIN public.answer_session_view asv
	ON asv.answer_session_id = ga.answer_session_id
	AND asv.video_version_id IS NOT NULL
	
	LEFT JOIN public.video_version vv
	ON vv.id = asv.video_version_id
	
	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id	 
	
	WHERE ga.score = 0
	
	GROUP BY asv.user_id, mv.module_id
)

SELECT 
	-- Modul neve
	mpc.user_id,
	cv.course_id,
	mpc.module_id,
	md.name module_name,
	
	-- Haladás a modulban
	(mpc.completed_course_item_count::double precision / micc.total_item_count::double precision) * 100 module_progress,

	-- Modul teljesítménye
	umpv.performance_percentage,
	
	-- Modulzáró vizsga eredménye
	mlesc.last_exam_score last_exam_score,
	
	-- Videós kérdések eredménye 
	mqsrc.question_success_rate module_question_success_rate,
	
	-- Ismétlésre ajánlott videók
	mvtbrc.videos_to_be_repeated_count videos_to_be_repeated_count
	
	-- Modul ismetlesre ajánlott?
FROM module_progress_cte mpc

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.course_id = mpc.course_id

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.module_version mv
ON mv.course_version_id = cv.id
AND mv.module_id = mpc.module_id

LEFT JOIN public.module_data md
ON md.id = mv.module_data_id

LEFT JOIN module_item_count_cte micc
ON micc.module_id = mv.module_id

LEFT JOIN public.user_module_performance_view umpv
ON umpv.module_id = mv.module_id
AND umpv.user_id = mpc.user_id

LEFT JOIN module_last_exam_score_cte mlesc
ON mlesc.user_id = mpc.user_id
AND mlesc.module_id = mv.module_id

LEFT JOIN module_question_success_rate_cte mqsrc
ON mqsrc.user_id = mpc.user_id
AND mqsrc.module_id = mv.module_id

LEFT JOIN module_videos_to_be_repeated_cte mvtbrc
ON mvtbrc.user_id = mpc.user_id
AND mvtbrc.module_id = mv.module_id

WHERE mpc.module_id != 1
AND md.order_index != 0

ORDER BY 
	mpc.user_id,
	cv.course_id,
	mpc.module_id


;

--CREATE VIEW: user_video_stats_view
CREATE VIEW user_video_stats_view
AS
WITH
video_replays_cte AS
(
    SELECT
        uvppv.video_id,
        uvppv.user_id,
        GREATEST(COUNT(*) - 1, 0)::int video_repetition_count
    FROM public.user_video_practise_progress_view uvppv

    --WHERE uvppv.watch_percentage > 20
    
    GROUP BY
        uvppv.user_id,
        uvppv.video_id
),
summed_video_playbacks_cte AS
(
	SELECT
		uvpsv.user_id,
		uvpsv.video_id,
		SUM(uvpsv.total_playback_seconds) total_playback_seconds
	FROM public.user_video_playback_seconds_view uvpsv
	
	GROUP BY uvpsv.user_id, uvpsv.video_id
),
last_3_quiz_answer_avg_cte AS
(
    SELECT
        asv.user_id,
        vv.video_id, 
        AVG((ga.state = 'CORRECT')::int)::int average_correct_given_answer_count
    FROM public.given_answer ga

    LEFT JOIN public.answer_session_view asv
    ON asv.answer_session_id = ga.answer_session_id

    INNER JOIN public.video_version vv
    ON vv.id = asv.video_version_id
    
    GROUP BY
        vv.video_id, 
        asv.user_id
),
avg_reaction_time_cte AS
(
    SELECT
        uav.user_id,
        uav.video_id,
        AVG(uav.elapsed_seconds) avg_reaction_time
    FROM public.user_answer_view uav
    
    WHERE uav.elapsed_seconds IS NOT NULL 
    AND uav.video_id IS NOT NULL
    
    GROUP BY
        uav.user_id,
        uav.video_id
),
latest_playback_date_cte AS 
(
    SELECT
        uvppv.user_id,
        uvppv.video_id,
        MAX(uvppv.creation_date) latest_playback_date
    FROM public.user_video_practise_progress_view uvppv
    
    GROUP BY
        uvppv.user_id,
        uvppv.video_id
)
SELECT
    u.id user_id,
    cisv.video_id,
    cisv.course_id,
    vd.video_file_length_seconds length_seconds,
    vd.title video_title,
    
    -- How much time the user spent with the video
    uvpsv.total_playback_seconds total_spent_time_seconds,
    
    -- How many times the user replayed the video, 
    -- when the video is at least 20% watched
    vrc.video_repetition_count video_replays_count,
    
    -- Is the video currently recommended for retry
    -- (When the video quiz questions has less than 66 percent success rate, 
    -- then it is recommended to watch again)
    uprv.is_recommended_for_practise is_recommended_for_retry,

    -- The average of the last 3 video quiz answers
    l3qaac.average_correct_given_answer_count last_three_answer_average,

    -- The average reaction time for the video quiz questions
    artc.avg_reaction_time average_reaction_time,

    -- When was the last time the user watched the video
    lpdc.latest_playback_date last_watch_time
    
FROM summed_video_playbacks_cte uvpsv

LEFT JOIN public.user u
ON u.id = uvpsv.user_id

INNER JOIN public.playlist_view cisv
ON cisv.user_id = u.id 
AND cisv.video_id = uvpsv.video_id
-- TODO at this point the video completion is
-- inconsistent, so showing all started
--AND cisv.item_state = 'completed'

INNER JOIN public.video_version vv
ON vv.id = cisv.video_version_id

LEFT JOIN public.video_data vd
ON vd.id = vv.video_data_id

LEFT JOIN video_replays_cte vrc
ON vrc.user_id = u.id
AND vrc.video_id = vv.video_id

LEFT JOIN public.user_practise_recommendation_view uprv
ON uprv.video_id = vv.video_id
AND uprv.user_id = u.id

LEFT JOIN last_3_quiz_answer_avg_cte l3qaac
ON l3qaac.video_id = vv.video_id
AND l3qaac.user_id = u.id

LEFT JOIN avg_reaction_time_cte artc
ON artc.video_id = vv.video_id
AND artc.user_id = u.id

LEFT JOIN latest_playback_date_cte lpdc
ON lpdc.video_id = vv.video_id
AND lpdc.user_id = u.id;

--CREATE VIEW: available_course_view
CREATE VIEW available_course_view
AS
WITH
assigned_courses AS
(
	SELECT
		u.id user_id,
		co.id course_id
	FROM public.user u

	INNER JOIN public.user_permission_view upv
	ON upv.assignee_user_id = u.id
	AND upv.permission_code = 'WATCH_COURSE'

	INNER JOIN public.course co
	ON co.id = upv.context_course_id
),
completed_videos AS
(
	SELECT
		cicv.user_id,
		cicv.course_version_id,
		COUNT(*) completed_video_count
	FROM public.course_item_completion_view cicv
	
	WHERE cicv.video_version_id IS NOT NULL
	
	GROUP BY cicv.course_version_id, cicv.user_id
),
final_exam_score_percentage AS
(
	SELECT 
		lasv.user_id,
		lev.course_id,
		MAX(esv.exam_score) final_exam_score_percentage
	FROM public.latest_answer_session_view lasv
	
	INNER JOIN public.latest_exam_view lev
	ON lev.exam_version_id = lasv.exam_version_id
	
	INNER JOIN public.exam_version ev
	ON ev.id = lev.exam_version_id 
	
	INNER JOIN public.exam_data ed
	ON ed.id = ev.exam_data_id
	AND ed.is_final = true
	
	LEFT JOIN public.exam_score_view esv
	ON esv.exam_version_id = ev.id
	
	GROUP BY lasv.user_id, lev.course_id
)
SELECT
	u.id user_id,
	co.id course_id,
	cd.title,
	true can_view,
	sf.file_path file_path,
	cosv.is_completed is_completed,
	cosv.in_progress is_started,
	csc.id sub_category_id,
	cd.is_featured,
	false is_recommended,
	cc.id category_id,
	cc.name category_name,
	csc.name sub_category_name,
	ucb.current_item_code,
	ucb.stage_name stage_name,
	ucb.required_completion_date,
	cov.completed_video_count,
	fesp.final_exam_score_percentage,
	teacher.id teacher_id,
	teacher.first_name teacher_first_name,
	teacher.last_name teacher_last_name,
	cvlv.sum_length_seconds total_video_sum_length_seconds,
	cvcv.video_count total_video_count,
	cd.difficulty,
	cd.benchmark
FROM assigned_courses ac

LEFT JOIN public.course co
ON co.id = ac.course_id

LEFT JOIN public.latest_course_version_view lcv
ON lcv.course_id = co.id

LEFT JOIN public.course_version cv
ON cv.id = lcv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.user u
ON u.id = ac.user_id

LEFT JOIN public.course_video_length_view cvlv
ON cvlv.course_version_id = cv.id

LEFT JOIN public.course_video_count_view cvcv
ON cvcv.course_version_id = cv.id

LEFT JOIN public.course_state_view cosv
ON cosv.course_id = co.id
AND cosv.user_id = u.id

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

LEFT JOIN public.user_course_bridge ucb
ON ucb.user_id = u.id
AND ucb.course_id = co.id

LEFT JOIN public.course_category cc
ON cc.id = cd.category_id

LEFT JOIN public.course_category csc
ON csc.id = cd.sub_category_id

LEFT JOIN public.user teacher
ON teacher.id = cd.teacher_id

LEFT JOIN completed_videos cov
ON cov.user_id = u.id
AND cov.course_version_id = cv.id

LEFT JOIN final_exam_score_percentage fesp
ON fesp.user_id = u.id
AND fesp.course_id = co.id

WHERE co.deletion_date IS NULL

ORDER BY
	u.id,
	co.id



;

--CREATE VIEW: courses_progress_list_view
CREATE VIEW courses_progress_list_view
AS
SELECT acv.*
FROM public.available_course_view acv
WHERE acv.is_completed = true
OR acv.is_started = true;

--CREATE VIEW: user_learning_overview_stats_view
CREATE VIEW user_learning_overview_stats_view
AS
WITH stats AS 
(
	SELECT 
		u.id user_id,
		u.email user_email,

		(
			SELECT
				AVG(upv.performance_percentage)
			FROM public.user_performance_view upv
			WHERE upv.user_id = u.id
			AND upv.performance_percentage != 0
			AND upv.performance_percentage IS NOT NULL
		) performance_percentage,

		urtv.reaction_time_percent_diff user_reaction_time_difference_percentage,
		urtv.user_reaction_time_points,
		urtv.user_exam_length_points,
		urtv.total_user_reaction_time_points,

		-- most frequent time range
		usbv.average_session_block most_frequent_time_range,

		-- engagement points D
		(
			SELECT 
				engagement_points
			FROM public.user_engagement_view uev
			WHERE uev.user_id = u.id
		) engagement_points,

		-- total session length D
		(
			SELECT SUM(usav.length_seconds)::int
			FROM public.user_session_view usav

			WHERE usav.user_id = u.id
		) total_time_active_on_platform_seconds,

		-- completed video count D
		(
			SELECT COUNT(*)::int
			FROM public.course_item_completion_view cicv
			WHERE cicv.user_id = u.id
			AND cicv.video_version_id IS NOT NULL
		) watched_videos,

		-- completed_exam_count
		(
			SELECT SUM (ecv.has_completed_session::int)::int
			FROM public.exam_completed_view ecv
			WHERE ecv.user_id = u.id
		) completed_exam_count,

		-- total given correct answer count on video and practise questions D
		(
			SELECT 
				COUNT (ga.id)::int 
			FROM public.given_answer ga

			LEFT JOIN public.answer_session_view asv
			ON asv.answer_session_id = ga.answer_session_id
			AND (asv.answer_session_type = 'video' 
				 OR asv.answer_session_type = 'practise')

			WHERE asv.user_id = u.id 
		) answered_video_and_practise_quiz_questions,

		-- total given answer count on video and practise questions D
		(
			SELECT 
				COUNT (ga.id)::int 
			FROM public.given_answer ga

			LEFT JOIN public.answer_session_view asv
			ON asv.answer_session_id = ga.answer_session_id
			AND (asv.answer_session_type = 'video' 
				 OR asv.answer_session_type = 'practise')

			WHERE asv.user_id = u.id 
			AND ga.state = 'CORRECT'
		) correct_answered_video_and_practise_quiz_questions,

		-- average watched videos per day
		(
			SELECT COUNT(*)::double precision / 30
			FROM public.course_item_completion_view cicv
			WHERE cicv.user_id = u.id
			AND cicv.completion_date > CURRENT_DATE - 30
		) average_watched_videos_per_day,

		-- avg session length
		(
			SELECT AVG(usav.length_seconds)::int
			FROM public.user_session_view usav

			WHERE usav.user_id = u.id
		) average_session_length_seconds,

		-- completed_exam_count
		(
			SELECT 
				COUNT(ecv.has_successful_session::int)
			FROM public.exam_completed_view ecv
			WHERE ecv.user_id = u.id
		) total_done_exams,

		-- videos to be repeated count

		(
			SELECT 
				COUNT(uprv.total_given_answer_count)::int
			FROM public.user_practise_recommendation_view uprv
			WHERE uprv.is_recommended_for_practise IS TRUE
		) videos_to_be_repeated_count

	FROM public.user u

	LEFT JOIN public.user_performance_view upv
	ON upv.user_id = u.id

	LEFT JOIN public.user_session_block_view usbv
	ON usbv.user_id = u.id

	LEFT JOIN public.user_reaction_time_view urtv
	ON urtv.user_id = u.id

	WHERE u.deletion_date IS NULL -- AND u.is_invitation_accepted = true

	GROUP BY 
		u.id, 
		u.email,
		urtv.reaction_time_percent_diff, 
		urtv.user_reaction_time_points, 
		urtv.user_exam_length_points, 
		urtv.total_user_reaction_time_points, 
		usbv.average_session_block

	ORDER BY u.id
)

SELECT 
	st.*,

	-- correct answer rate
	CASE WHEN st.answered_video_and_practise_quiz_questions = 0
		THEN 0
		ELSE st.correct_answered_video_and_practise_quiz_questions:: double precision / st.answered_video_and_practise_quiz_questions * 100
	END correct_answer_rate_percentage,

	(st.engagement_points * 3 + st.performance_percentage * 3 + 100 * 0.5) / 6.5 overall_performance_percentage
FROM stats st
;

--CREATE VIEW: course_learning_stats_view
CREATE VIEW course_learning_stats_view
AS
WITH 
video_question_count AS
(
	SELECT 
		COUNT(qv.id)::int video_question_count,
		cv.id course_version_id
	FROM public.video v

	LEFT JOIN public.video_version vv
	ON vv.video_id = v.id

	LEFT JOIN public.question_version qv
	ON qv.video_version_id = vv.id

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id
	
	GROUP BY cv.id
),
exam_avg_score_percentage AS
(
	SELECT 
		ase.user_id,
		cv.course_id,
		ROUND(AVG(esv.score_percentage)) avg_exam_score_percentage
	FROM public.answer_session ase

	LEFT JOIN public.exam_version ev 
	ON ev.id = ase.exam_version_id

	LEFT JOIN public.module_version mv
	ON mv.id = ev.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id

	LEFT JOIN public.exam_score_view esv
	ON esv.exam_version_id = ev.id

	GROUP BY
		ase.user_id,
		cv.course_id
),
final_exam_score_percentage AS
(
	SELECT 
		lasv.user_id,
		lev.course_id,
		MAX(esv.exam_score) max_exam_score
	FROM public.latest_answer_session_view lasv
	
	INNER JOIN public.latest_exam_view lev
	ON lev.exam_version_id = lasv.exam_version_id
	
	INNER JOIN public.exam_version ev
	ON ev.id = lev.exam_version_id 
	
	INNER JOIN public.exam_data ed
	ON ed.id = ev.exam_data_id
	AND ed.is_final = true
	
	LEFT JOIN public.exam_score_view esv
	ON esv.exam_version_id = ev.id
	
	GROUP BY lasv.user_id, lev.course_id
),
answered_video_question AS
(
	SELECT
		asv.user_id,
		cv.course_id,
		COUNT(ga.id) answered_video_question_count
	FROM public.given_answer ga
	
	LEFT JOIN public.answer_session_view asv
	ON asv.answer_session_id = ga.answer_session_id

	LEFT JOIN public.video_version vv
	ON vv.id = asv.answer_session_id

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id
	
	WHERE asv.answer_session_type = 'video'
	
	GROUP BY asv.user_id, cv.course_id
),
completed_video_count AS
(
	SELECT
		cicv.user_id,
		cicv.course_id,
		COUNT(*) completed_video_count
	FROM public.course_item_completion_view cicv
	
	WHERE cicv.video_version_id IS NOT NULL
	
	GROUP BY cicv.user_id, cicv.course_id
)

SELECT 
	u.id user_id,
	co.id course_id,
	cd.title,
	true can_view, -- TODO AUTH
	cc.id IS NOT NULL is_completed,
	ucb.start_date IS NOT NULL is_started,
	ucb.current_item_code current_item_code,
	CASE WHEN ucb.current_item_code IS NULL 
		THEN NULL --first_civ.item_code 
		ELSE ucb.current_item_code 
	END continue_item_code,
	sf.file_path file_path,
	ccat.name category_name,
	csc.name sub_category_name,

	teacher.id teacher_id,
	teacher.first_name teacher_first_name,
	teacher.last_name teacher_last_name,

	cstv.total_spent_seconds,
	ucpav.total_item_count total_course_item_count,
	ucpav.total_completed_item_count completed_course_item_count,
	COALESCE(cvc.completed_video_count, 0) completed_video_count,
	cvcv.video_count total_video_count,
	vqc.video_question_count total_video_question_count,
	COALESCE(avq.answered_video_question_count, 0) answered_video_question_count,
	easp.avg_exam_score_percentage,
	fesp.max_exam_score final_exam_score_percentage,
	CASE 
		WHEN cqsv.total_answer_count > 0
			THEN (cqsv.correct_answer_count::double precision / cqsv.total_answer_count * 100)::int
		ELSE 0
	END question_success_rate
FROM public.user u

INNER JOIN public.user_course_bridge ucb
ON ucb.user_id = u.id

INNER JOIN public.course co
ON co.id = ucb.course_id

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.course_id = co.id

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.course_completion cc
ON cc.user_id = u.id
AND cc.course_version_id = cv.id

LEFT JOIN public.course_video_count_view cvcv
ON cvcv.course_version_id = cv.id

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

LEFT JOIN public.course_category ccat
ON cc.id = cd.category_id
	
LEFT JOIN public.course_category csc
ON csc.id = cd.sub_category_id
	
LEFT JOIN public.user teacher
ON teacher.id = cd.teacher_id

LEFT JOIN public.course_spent_time_view cstv
ON cstv.user_id = u.id
AND cstv.course_id = co.id

LEFT JOIN public.user_course_progress_actual_view ucpav
ON ucpav.user_id = u.id
AND ucpav.course_id = co.id

LEFT JOIN final_exam_score_percentage fesp
ON fesp.user_id = u.id
AND fesp.course_id = co.id

LEFT JOIN public.course_questions_success_view cqsv
ON cqsv.user_id = u.id
AND cqsv.course_id = co.id

LEFT JOIN exam_avg_score_percentage easp
ON easp.user_id = u.id
AND easp.course_id = co.id

LEFT JOIN answered_video_question avq
ON avq.user_id = u.id
AND avq.course_id = co.id

LEFT JOIN video_question_count vqc
ON vqc.course_version_id = cv.id

LEFT JOIN completed_video_count cvc
ON cvc.user_id = u.id
AND cvc.course_id = co.id;

--CREATE VIEW: course_overview_view
CREATE VIEW course_overview_view
AS
WITH
episto_coin_sum_cte AS
(
	SELECT
		coapcv.user_id,
		coapcv.course_id,
		SUM(coapcv.amount) episto_coin_amount
	FROM public.coin_acquire_per_course_view coapcv
	
	GROUP BY coapcv.user_id, coapcv.course_id
)

SELECT 
	clsv.user_id,
	clsv.course_id,
	clsv.total_spent_seconds,
	clsv.completed_video_count,
	clsv.answered_video_question_count,
	clsv.question_success_rate,
	clsv.avg_exam_score_percentage exam_success_rate_average,
	clsv.final_exam_score_percentage final_exam_success_rate,
	COALESCE(ecsc.episto_coin_amount) coins_acquired
FROM public.course_learning_stats_view clsv

LEFT JOIN episto_coin_sum_cte ecsc
ON ecsc.course_id = clsv.course_id
AND ecsc.user_id = clsv.user_id;

--CREATE VIEW: admin_user_courses_view
CREATE VIEW admin_user_courses_view
AS
WITH
question_answer_cte AS
(
	SELECT
		asv.user_id,
		cv.course_id,
		SUM(asv.answered_question_count) answered_question_count,
        SUM(CASE WHEN asv.answer_session_type = 'practise'
            THEN asv.answered_question_count
            ELSE 0 END) practise_quesiton_answer_count,
        SUM(CASE WHEN asv.answer_session_type = 'video'
            THEN asv.answered_question_count
            ELSE 0 END) video_quesiton_answer_count
	FROM public.given_answer ga

	LEFT JOIN public.answer_session_view asv
	ON asv.answer_session_id = ga.answer_session_id

	LEFT JOIN public.video_version vv
	ON vv.id = asv.video_version_id

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id

	INNER JOIN public.course_version cv
	ON cv.id = mv.course_version_id

    GROUP BY
		asv.user_id,
		cv.course_id

	ORDER BY
		asv.user_id,
		cv.course_id
),
avg_performance_cte AS
(
    SELECT
        upv.course_id,
        AVG(upv.performance_percentage) avg_performance
    FROM public.user_performance_view upv
    WHERE upv.performance_percentage != 0
    GROUP BY
        upv.course_id
),
completed_video_count AS
(
	SELECT
		cicv.user_id,
		cicv.course_id,
		COUNT(cicv.video_version_id) completed_video_count
	FROM public.course_item_completion_view cicv

	GROUP BY cicv.user_id, cicv.course_id
),
is_final_exam_completed_cte AS 
(
    SELECT
        cv.course_id,
        cic.user_id,
        COUNT(*) > 0 is_final_exam_completed
    FROM public.course_item_completion_view cic

    LEFT JOIN public.exam_version ev
    ON ev.id = cic.exam_version_id

    LEFT JOIN public.exam_data ed
    ON ed.id = ev.exam_data_id

    LEFT JOIN public.module_version mv
    ON mv.id = ev.module_version_id

    LEFT JOIN public.course_version cv
    ON cv.id = mv.course_version_id

    WHERE ed.is_final IS TRUE
    
    GROUP BY 
        cv.course_id,
        cic.user_id
),
correct_answer_rate_cte AS 
(
    SELECT
        cqsv.course_id,
        cqsv.user_id,
        CASE WHEN cqsv.total_answer_count > 0
            THEN (cqsv.correct_answer_count::double precision / cqsv.total_answer_count * 100)::int
            ELSE 0
        END correct_answer_rate
    FROM public.course_questions_success_view cqsv
),
completed_exam_count_cte AS 
(
    SELECT
        cv.course_id,
        cic.user_id,
        COUNT(*)::int completed_exam_count
    FROM public.course_item_completion_view cic

    LEFT JOIN public.exam_version ev
    ON ev.id = cic.exam_version_id

    LEFT JOIN public.exam ex
    ON ex.id = ev.exam_id

    LEFT JOIN public.module_version mv
    ON mv.id = ev.module_version_id

    LEFT JOIN public.course_version cv
    ON cv.id = mv.course_version_id

    WHERE ex.is_pretest = false
    AND ex.is_signup = false
    
    GROUP BY
        cv.course_id,
        cic.user_id
),
recommended_videos_for_practise_cte AS
(
    SELECT
        cv.course_id,
        uprv.user_id,
        COUNT(uprv.total_given_answer_count)::int recommended_videos_for_practise_count
    FROM public.user_practise_recommendation_view uprv

    LEFT JOIN public.course_version cv
    ON cv.id = uprv.course_version_id
    
    LEFT JOIN public.course_state_view cosv
    ON cosv.course_id = cv.course_id
    AND cosv.user_id = uprv.user_id
    
    WHERE uprv.total_given_answer_count = 3
    AND uprv.is_recommended_for_practise IS true
    AND cosv.in_progress IS TRUE
    
    GROUP BY
        cv.course_id,
        uprv.user_id
) 
SELECT
    u.id user_id,
    co.id course_id,
    upev.assignee_user_id IS NOT NULL is_accessible,
    ucb.id IS NOT NULL is_assigned,
    cv.id course_version_id,
    cd.title,
    sf.file_path cover_file_path,
    cosv.start_date,
    ucpav.completed_percentage course_progress_percentage,
    cvc.completed_video_count,
    cstv.total_spent_seconds total_spent_seconds,
    COALESCE(qac.video_quesiton_answer_count, 0) answered_video_question_count,
    COALESCE(qac.practise_quesiton_answer_count, 0) answered_practise_question_count,
    tcdv.required_completion_date,
    tcdv.tempomat_adjustment_value,
    tcdv.tempomat_mode,
    tcdv.original_previsioned_completion_date,
    tcdv.total_item_count,
    tcdv.total_completed_item_count,
    upv.performance_percentage - apc.avg_performance difference_from_average_performance_percentage,
    upv.performance_percentage,
    apc.avg_performance,
    ifecc.is_final_exam_completed,
    carc.correct_answer_rate,
    cecc.completed_exam_count,
    rvfpc.recommended_videos_for_practise_count,
    ucb.stage_name != 'assigned' AND ucb.stage_name IS NOT null is_tempomat_ready
FROM public.user u

-- join all companies available 
-- for user's company
INNER JOIN public.course_access_bridge cab
ON cab.company_id = u.company_id

LEFT JOIN public.course co
ON co.id = cab.course_id

LEFT JOIN public.user_permission_view upev
ON upev.assignee_user_id = u.id
AND upev.context_course_id = co.id
AND upev.permission_code = 'WATCH_COURSE'

LEFT JOIN public.user_course_bridge ucb
ON ucb.course_id = co.id
AND ucb.user_id = u.id

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.course_id = co.id

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.user_course_progress_actual_view ucpav
ON ucpav.user_id = u.id
AND ucpav.course_id = co.id

LEFT JOIN public.course_state_view cosv
ON cosv.course_id = co.id
AND cosv.user_id = u.id

LEFT JOIN public.course_spent_time_view cstv
ON cstv.user_id = u.id
AND cstv.course_id = co.id

LEFT JOIN public.tempomat_calculation_data_view tcdv
ON tcdv.user_id = u.id
AND tcdv.course_id = co.id

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

LEFT JOIN question_answer_cte qac
ON qac.course_id = co.id
AND qac.user_id = u.id

LEFT JOIN public.user_performance_view upv
ON upv.user_id = u.id
AND upv.course_id = co.id

-- CTE joins

LEFT JOIN completed_video_count cvc
ON cvc.user_id = u.id
AND cvc.course_id = co.id

LEFT JOIN avg_performance_cte apc
ON apc.course_id = co.id

LEFT JOIN is_final_exam_completed_cte ifecc
ON ifecc.course_id = co.id 
AND ifecc.user_id = u.id 

LEFT JOIN correct_answer_rate_cte carc
ON carc.course_id = co.id
AND carc.user_id = u.id

LEFT JOIN completed_exam_count_cte cecc
ON cecc.course_id = co.id
AND cecc.user_id = u.id

LEFT JOIN recommended_videos_for_practise_cte rvfpc
ON rvfpc.course_id = co.id
AND rvfpc.user_id = u.id

ORDER BY
    u.id,
    ucb.id IS NULL,
    co.id
;


-- CREATE FUNCTIONS

--CREATE FUNCTION: acquire_task_lock_fn
-- DROP FUNCTION IF EXISTS acquire_task_lock_fn;

CREATE OR REPLACE FUNCTION acquire_task_lock_fn
(
	param_task_code text
)
RETURNS boolean 
AS $$ 

DECLARE
	var_lock_count integer; 

BEGIN

	SELECT COUNT(1)
	INTO var_lock_count
	FROM public.task_lock tl
	WHERE tl.task_code = param_task_code;
	
	IF var_lock_count = 0 THEN
	
		INSERT INTO public.task_lock (task_code, creation_date) 
		VALUES (param_task_code, now());
	
		RAISE NOTICE 'Task is free. Creating new task lock...';
		RETURN true;
	ELSE
	
		RAISE NOTICE 'Task is occupied. Aborting...';
		RETURN false;	
	END IF;
END 
$$ LANGUAGE 'plpgsql';;

--CREATE FUNCTION: create_daily_tip_fn
CREATE OR REPLACE FUNCTION "create_daily_tip_fn"
(
	"p_descriotion" text,
	"p_video_path" text
)
RETURNS integer 
AS $$ 

DECLARE
	"v_new_daily_tip_id" integer; 
	"v_new_storage_file_id" integer; 

BEGIN

	-- insert video storage file
	INSERT INTO public."storage_file" 
	(
		"file_path"
	)
	VALUES 
	(
		"p_video_path"
	)
	RETURNING "id" INTO "v_new_storage_file_id";
	
	-- 	insert new daily tip
	INSERT INTO public."daily_tip" 
	(
		"description",
		"video_file_id"
	)
	VALUES 
	(
		"p_descriotion",
		"v_new_storage_file_id"
	)
	RETURNING "id" INTO "v_new_daily_tip_id";
	
	RETURN "v_new_daily_tip_id";
	
END 
$$ LANGUAGE 'plpgsql';;

--CREATE FUNCTION: get_user_session_first_activity_id
CREATE OR REPLACE FUNCTION "get_user_session_first_activity_id"
(
	param_user_id integer,
	param_session_activity_id integer
)
RETURNS integer 
AS $$ 

DECLARE
	var_current_activity_date timestamptz;
	var_current_session_start_date timestamptz;
	var_session_first_activity_id integer;

BEGIN

	-- get current activity
	SELECT "creation_date"
	FROM "user_session_activity" 
	WHERE "id" = param_session_activity_id
	INTO var_current_activity_date;
	
	RAISE NOTICE '%', var_current_activity_date;
	
	-- get current session start date 
	SELECT "us"."session_start_date"
	FROM "user_session_view" AS "us" 
	WHERE "us"."user_id" = param_user_id
		AND "us"."session_start_date" <= var_current_activity_date
		AND "us"."session_end_date" >= var_current_activity_date
	INTO var_current_session_start_date;
	
	RAISE NOTICE '%', var_current_session_start_date;
	
	-- get current session first activity
	SELECT 
		"id"
	FROM "user_session_activity"
	WHERE "creation_date" = var_current_session_start_date
	INTO var_session_first_activity_id;
	
	RETURN var_session_first_activity_id;
	
END 
$$ LANGUAGE 'plpgsql';;


-- CREATE CONSTRAINTS

--CREATE CONSTRAINT: coin_transaction_valid_relation_enforce_constraint
ALTER TABLE coin_transaction 
ADD CONSTRAINT coin_transaction_valid_relation_enforce_constraint 
CHECK 
(
	activity_session_id IS NOT NULL OR
	video_id IS NOT NULL OR
	given_answer_id IS NOT NULL OR
	given_answer_streak_id IS NOT NULL OR
	activity_streak_id IS NOT NULL OR
	shop_item_id IS NOT NULL OR 
	is_gifted
);;

--CREATE CONSTRAINT: activation_code_uniqe_constraint
ALTER TABLE activation_code
ADD CONSTRAINT activation_code_uniqe_constraint
UNIQUE (code);;

--CREATE CONSTRAINT: role_permission_bridge_constraint
ALTER TABLE role_permission_bridge
ADD CONSTRAINT role_permission_bridge_constraint
UNIQUE (role_id, permission_id);;

--CREATE CONSTRAINT: role_constraint
ALTER TABLE role
ADD CONSTRAINT role_constraint
CHECK (is_custom = false OR company_id IS NOT NULL);;

--CREATE CONSTRAINT: video_completion_constraints

-- UNIQUE VIDEO
ALTER TABLE public.video_completion
DROP CONSTRAINT IF EXISTS video_completion_unique;

ALTER TABLE public.video_completion
ADD CONSTRAINT video_completion_unique
UNIQUE (video_version_id, user_id);;

--CREATE CONSTRAINT: exam_completion_constraints
-- UNIQUE EXAM
ALTER TABLE public.exam_completion
DROP CONSTRAINT IF EXISTS exam_completion_unique;

ALTER TABLE public.exam_completion
ADD CONSTRAINT exam_completion_unique
UNIQUE (answer_session_id);;

--CREATE CONSTRAINT: prequiz_completion_constraints

-- UNIQUE
ALTER TABLE public.prequiz_completion
DROP CONSTRAINT IF EXISTS prequiz_completion_unique;

ALTER TABLE public.prequiz_completion
ADD CONSTRAINT prequiz_completion_unique
UNIQUE (user_id, course_id);;

--CREATE CONSTRAINT: course_completion_constraints

-- UNIQUE
ALTER TABLE public.course_completion 
DROP CONSTRAINT IF EXISTS course_completion_unique;

ALTER TABLE public.course_completion
ADD CONSTRAINT course_completion_unique
UNIQUE (course_version_id, user_id);;

--CREATE CONSTRAINT: course_access_bridge_constraints
-- UNIQUE COMPANY 
ALTER TABLE public.course_access_bridge
DROP CONSTRAINT IF EXISTS course_access_bridge_unique_by_company;

ALTER TABLE public.course_access_bridge
ADD CONSTRAINT course_access_bridge_unique_by_company
UNIQUE (course_id, company_id);

-- UNIQUE USER
ALTER TABLE public.course_access_bridge
DROP CONSTRAINT IF EXISTS course_access_bridge_unique_by_user;

ALTER TABLE public.course_access_bridge
ADD CONSTRAINT course_access_bridge_unique_by_user
UNIQUE (course_id, user_id);;

--CREATE CONSTRAINT: prequiz_constraints

-- UNIQUE
ALTER TABLE public.prequiz_user_answer
DROP CONSTRAINT IF EXISTS prequiz_user_answer_unique;

ALTER TABLE public.prequiz_user_answer
ADD CONSTRAINT prequiz_user_answer_unique
UNIQUE (user_id, course_id, question_id);;

--CREATE CONSTRAINT: permission_assignment_bridge_constraints

-- UNIQUE
ALTER TABLE public.permission_assignment_bridge
DROP CONSTRAINT IF EXISTS permission_assignment_bridge_check;

ALTER TABLE public.permission_assignment_bridge
ADD CONSTRAINT permission_assignment_bridge_check
CHECK (
    (context_company_id IS NULL AND context_course_id IS NOT NULL)
    OR
    (context_company_id IS NOT NULL AND context_course_id IS NULL)
	OR 
	(context_company_id IS NULL AND context_course_id IS NULL)
);;

--CREATE CONSTRAINT: video_data_constraints

-- UNIQUE
ALTER TABLE public.video_data
DROP CONSTRAINT IF EXISTS video_data_check;

ALTER TABLE public.video_data
ADD CONSTRAINT video_data_check
CHECK (
    (video_file_id IS NULL AND video_file_length_seconds IS NULL) 
    OR
    (video_file_id IS NOT NULL AND video_file_length_seconds IS NOT NULL) 
);;


-- CREATE INDICES

--CREATE INDEX: user_email_unique_index
CREATE UNIQUE INDEX user_email_unique_index 
ON public.user (email) 
WHERE deletion_date IS NULL;;

--CREATE INDEX: single_current_course_bridge_unique_index
CREATE UNIQUE INDEX single_current_course_bridge_unique_index
ON public.user_course_bridge (user_id)
WHERE is_current = true;


-- CREATE TRIGGERS

--CREATE TRIGGER: role_assignment_validity_check_trigger

----------------- CLEANUP
DROP TRIGGER IF EXISTS role_assignment_validity_check_trigger 
ON role_assignment_bridge;
DROP FUNCTION IF EXISTS role_assignment_validity_check_trigger_function;

----------------- DEFINITION
CREATE FUNCTION role_assignment_validity_check_trigger_function() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
AS $$
DECLARE
  var_role record;
BEGIN
	
	SELECT *
	FROM public.role r
	WHERE r.id = NEW.role_id
	INTO var_role;
	
	IF NEW.context_company_id IS NULL
	THEN RAISE EXCEPTION 'Trying to assign a role without specifying a company context. This is not allowed.';
	END IF;
	
	return NEW;
END
$$;

CREATE TRIGGER role_assignment_validity_check_trigger
BEFORE INSERT OR UPDATE ON role_assignment_bridge
FOR EACH ROW EXECUTE PROCEDURE role_assignment_validity_check_trigger_function();;

--CREATE TRIGGER: exam_pretest_module_integrity_trigger

----------------- CLEANUP
DROP TRIGGER IF EXISTS exam_pretest_module_integrity_trigger 
ON exam_version;
DROP FUNCTION IF EXISTS exam_pretest_module_integrity_trigger_function;

----------------- DEFINITION
CREATE FUNCTION exam_pretest_module_integrity_trigger_function() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
AS $$
DECLARE
  var_data record;
BEGIN
	
	-- query related exam
	SELECT 
		e.is_pretest is_pretest_exam,
		m.is_pretest_module is_pretest_module
	FROM public.exam e
	
	LEFT JOIN public.module_version mv
	ON mv.id = NEW.module_version_id
	
	LEFT JOIN public.module m
	ON m.id = mv.module_id

	WHERE e.id = NEW.exam_id
	INTO var_data;
	
	IF (var_data.is_pretest_exam = true AND var_data.is_pretest_module = false) 
	OR (var_data.is_pretest_exam = false AND var_data.is_pretest_module = true) 
	THEN RAISE EXCEPTION 'When creating module/exam <-> pretest module/exam relation both entities must be pretest!';
	END IF;
	
	return NEW;
END
$$;

CREATE TRIGGER exam_pretest_module_integrity_trigger
BEFORE INSERT OR UPDATE ON exam_version
FOR EACH ROW EXECUTE PROCEDURE exam_pretest_module_integrity_trigger_function();;

--CREATE TRIGGER: permission_assignment_bridge_trigger

----------------- CLEANUP
DROP TRIGGER IF EXISTS permission_assignment_bridge_trigger 
ON permission_assignment_bridge;
DROP FUNCTION IF EXISTS permission_assignment_bridge_trigger_function;

----------------- DEFINITION
CREATE FUNCTION permission_assignment_bridge_trigger_function() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
AS $$
DECLARE
  var_permission record;
BEGIN
	
	SELECT * FROM public.permission pe
	WHERE pe.id = NEW.permission_id
	INTO var_permission;

	-- company scope check 
	IF var_permission.scope = 'COMPANY' AND NEW.context_company_id IS NULL
	THEN RAISE EXCEPTION 
		'Trying to assign a [%] scoped permission without specifying a [%] context. This is not allowed. PermissionId: % AssigneeUserId: % AssigneeCompanyId: % ', 
		var_permission.scope, var_permission.scope, NEW.permission_id, NEW.assignee_user_id, NEW.assignee_company_id;
	END IF;
	
	-- course scope check 
	IF var_permission.scope = 'COURSE' AND NEW.context_course_id IS NULL
	THEN RAISE EXCEPTION 
		'Trying to assign a [%] scoped permission without specifying a [%] context. This is not allowed. PermissionId: % AssigneeUserId: % AssigneeCompanyId: % ', 
		var_permission.scope, var_permission.scope, NEW.permission_id, NEW.assignee_user_id, NEW.assignee_company_id;
	END IF;
	
	return NEW;
END
$$;

CREATE TRIGGER permission_assignment_bridge_trigger
BEFORE INSERT OR UPDATE ON permission_assignment_bridge
FOR EACH ROW EXECUTE PROCEDURE permission_assignment_bridge_trigger_function();;

--CREATE TRIGGER: role_permission_bridge_validity_trigger

----------------- CLEANUP
DROP TRIGGER IF EXISTS role_permission_bridge_validity_trigger 
ON role_permission_bridge;
DROP FUNCTION IF EXISTS role_permission_bridge_validity_trigger_function;

----------------- DEFINITION
CREATE FUNCTION role_permission_bridge_validity_trigger_function() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
AS $$
DECLARE
  var_permission record;
  var_role record;
BEGIN
	
	SELECT * FROM public.permission pe
	WHERE pe.id = NEW.permission_id
	INTO var_permission;
	
	SELECT * FROM public.role ro
	WHERE ro.id = NEW.role_id
	INTO var_role;

	-- company scope check 
	IF var_permission.scope != 'COMPANY'
	THEN RAISE EXCEPTION 
		'Trying to assign a [%] scoped permission to a [COMPANY] scoped role. This is not allowed.
		PermissionId: % PermissionCode: % RoleId: % RoleName: %', 
		var_permission.scope, var_permission.id, var_permission.code, NEW.role_id, var_role.name;
	END IF;
	
	return NEW;
END
$$;

CREATE TRIGGER role_permission_bridge_validity_trigger
BEFORE INSERT OR UPDATE ON role_permission_bridge
FOR EACH ROW EXECUTE PROCEDURE role_permission_bridge_validity_trigger_function();;

--CREATE TRIGGER: ucb_stage_trigger

----------------- CLEANUP
DROP TRIGGER IF EXISTS ucb_stage_trigger 
ON user_course_bridge;
DROP FUNCTION IF EXISTS ucb_stage_trigger_function;

----------------- DEFINITION
CREATE FUNCTION ucb_stage_trigger_function() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
AS $$
DECLARE
  var_pretest_comp record;
  var_is_prequiz_completed boolean;
  var_new_order_num int;
  var_old_order_num int;
BEGIN

	-- create temp table
	CREATE TEMP TABLE var_stage_order_rows AS
	SELECT vals.order_num, vals.stage_name
	FROM (VALUES 
		(1, 'assigned'), 
		(2, 'prequiz'), 
		(3, 'pretest'), 
		(4, 'pretest_results'), 
		(5, 'watch')
	) as vals (order_num, stage_name);
	
	-- get new stage name order num
	SELECT vsor.order_num 
	FROM var_stage_order_rows vsor
	WHERE  vsor.stage_name = NEW.stage_name
	INTO var_new_order_num;
	
	-- get old stage name order num
	SELECT vsor.order_num
	FROM public.user_course_bridge ucb
	LEFT JOIN var_stage_order_rows vsor
	ON vsor.stage_name = ucb.stage_name
	WHERE ucb.user_id = NEW.user_id
	AND ucb.course_id = NEW.course_id
	INTO var_old_order_num;
	
	-- drop temp table
	DROP TABLE var_stage_order_rows;
	
	-- check order 
	IF(var_new_order_num < var_old_order_num)
		THEN RAISE EXCEPTION 'Trying to set stage to "%" which is lower order than the current stage. This is not allowed, users are only allowed to progress forward, not backward.', NEW.stage_name;
	END IF;

    -- check prequiz
    SELECT COUNT(*) = 3
    FROM public.prequiz_user_answer pua
    WHERE pua.user_id = NEW.user_id
    AND pua.course_id = NEW.course_id
    GROUP BY pua.user_id, pua.course_id
    INTO var_is_prequiz_completed;

	IF (var_is_prequiz_completed IS DISTINCT FROM true AND 
        (NEW.stage_name = 'pretest' OR 
        NEW.stage_name = 'pretest_results' OR
        NEW.stage_name = 'watch' OR 
        NEW.stage_name = 'finished'))
	    THEN RAISE EXCEPTION 'Trying to set stage to "%", but "prequiz" is not yet completed!', NEW.stage_name;
	END IF;

    -- check pretest
	SELECT
	    u.id user_id,
        co.id course_id,
        prv.user_id IS NOT NULL is_completed_pretest
    FROM public.course co
    CROSS JOIN public.user u
    LEFT JOIN public.pretest_result_view prv
    ON prv.user_id = u.id
    AND prv.course_id = co.id
    WHERE co.id = NEW.course_id 
    AND u.id = NEW.user_id 
	INTO var_pretest_comp;

	IF (var_pretest_comp.is_completed_pretest = false AND 
        (NEW.stage_name = 'pretest_results' OR
        NEW.stage_name = 'watch' OR 
        NEW.stage_name = 'finished'))
	    THEN RAISE EXCEPTION 'Trying to set stage to "%", but "pretest" is not yet completed!', NEW.stage_name;
	END IF;

    -- check startDate
	IF (NEW.start_date IS NULL AND 
        (NEW.stage_name = 'pretest_results' OR
        NEW.stage_name = 'watch' OR 
        NEW.stage_name = 'finished'))
	    THEN RAISE EXCEPTION 'Trying to set stage to "%", but "start_date" is not yet set!', NEW.stage_name;
	END IF;
	
	return NEW;
END
$$;

CREATE TRIGGER ucb_stage_trigger
BEFORE INSERT OR UPDATE ON user_course_bridge
FOR EACH ROW EXECUTE PROCEDURE ucb_stage_trigger_function();;

--CREATE TRIGGER: prequiz_completion_trigger

----------------- CLEANUP
DROP TRIGGER IF EXISTS prequiz_completion_trigger 
ON prequiz_completion;
DROP FUNCTION IF EXISTS prequiz_completion_trigger_function;

----------------- DEFINITION
CREATE FUNCTION prequiz_completion_trigger_function() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
AS $$
DECLARE
  var_user_course_bridge record;
BEGIN

    -- check prequiz
    SELECT *
    FROM public.user_course_bridge ucb
    WHERE ucb.user_id = NEW.user_id
    AND ucb.course_id = NEW.course_id
    INTO var_user_course_bridge;

	IF (var_user_course_bridge.stage_name IN ('prequiz', 'assigned'))
	    THEN RAISE EXCEPTION 'Trying to create a prequiz completion row, but user_course_bridge stage is still not set to the next one, set that first!';
	END IF;
	
	return NEW;
END
$$;

CREATE TRIGGER prequiz_completion_trigger
BEFORE INSERT OR UPDATE ON prequiz_completion
FOR EACH ROW EXECUTE PROCEDURE prequiz_completion_trigger_function();;


-- COMMIT TRANSACTION
COMMIT;

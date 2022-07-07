WITH answer_session_groups AS
(
	SELECT
		asv.user_id,
		cv.course_id,
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
	
	WHERE answer_session_type != 'pretest'
	
	GROUP BY 
		asv.user_id,
		cv.course_id,
		asv.answer_session_type,
		asv.start_date
),
split_correct_answer_rates AS
(
	SELECT
		u.id user_id,
		co.id course_id,
		asg.start_date,
		CASE 
			WHEN asg.answer_session_type = 'exam'
			THEN asg.answer_session_success_rate
		END exam_correct_answer_rate,
		CASE 
			WHEN asg.answer_session_type = 'practise'
			THEN asg.answer_session_success_rate
		END practise_correct_answer_rate,
		CASE 
			WHEN asg.answer_session_type = 'video'
			THEN asg.answer_session_success_rate
		END video_correct_answer_rate
	FROM public.user u

	CROSS JOIN public.course co

	LEFT JOIN answer_session_groups asg
	ON asg.user_id = u.id
	AND asg.course_id = co.id

	ORDER BY u.id
), 
generated_session_blocks (generated_session_block, block_end_time) AS 
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
		upagv.user_id,
		CASE 
			WHEN upagv.start_date::time <= '3:00:00.0'::time
				THEN '0:00-3:00' 
			WHEN upagv.start_date::time <= '6:00:00.0'::time
				THEN '3:00-6:00'
			WHEN upagv.start_date::time <= '9:00:00.0'::time
				THEN '6:00-9:00'
			WHEN upagv.start_date::time <= '12:00:00.0'::time
				THEN '9:00-12:00' 
			WHEN upagv.start_date::time <= '15:00:00.0'::time
				THEN '12:00-15:00' 
			WHEN upagv.start_date::time <= '18:00:00.0'::time
				THEN '15:00-18:00' 
			WHEN upagv.start_date::time <= '21:00:00.0'::time
				THEN '18:00-21:00' 
			WHEN upagv.start_date::time <= '24:00:00.0'::time
				THEN '21:00-0:00'
		END session_block,
		AVG(upagv.exam_correct_answer_rate) exam_correct_answer_rate,
		AVG(upagv.practise_correct_answer_rate) practise_correct_answer_rate,
		AVG(upagv.video_correct_answer_rate) video_correct_answer_rate
	FROM split_correct_answer_rates upagv
	
	GROUP BY upagv.user_id, upagv.start_date
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

ORDER BY u.id, gsb.block_end_time
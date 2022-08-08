-- user course progress view

WITH answer_stats AS
(
	SELECT 
		asv.answer_session_id,
		cv.course_id,
		asv.user_id,
		asv.answered_question_count,
		asv.answer_session_type
	FROM public.given_answer ga

	LEFT JOIN public.answer_session_view asv
	ON asv.answer_session_id = ga.answer_session_id

	LEFT JOIN public.video_version vv
	ON vv.id = asv.video_version_id

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id
),
user_course_stats AS
(
    SELECT
        co.id course_id,
        cd.title,
		u.id user_id,
        sf.file_path cover_file_path,
	
		-- start date
        cosv.start_date,
		
		-- course progress percentage
		ucpav.completed_percentage course_progress_percentage,
	
		-- completed video count
		ucpav.total_completed_item_count completed_video_count,
		
		-- correct answer rate	
		(
			SELECT 
				CASE 
					WHEN cqsv.total_answer_count > 0
						THEN (cqsv.correct_answer_count::double precision / cqsv.total_answer_count * 100)::int
					ELSE 0
				END
			FROM public.course_questions_success_view cqsv
			WHERE cqsv.course_id = co.id
			AND cqsv.user_id = u.id 
		) correct_answer_rate,

        -- current performance per course
        (
            SELECT
                performance_percentage
            FROM public.user_performance_view upv
            WHERE upv.user_id = u.id
            AND upv.course_id = co.id
        ) performance_percentage,
        
        -- completed exam count
        (
			SELECT
				COUNT(*)
			FROM public.course_item_completion cic
			
			LEFT JOIN public.exam_version ev
			ON ev.id = cic.exam_version_id
			
			LEFT JOIN public.exam ex
			ON ex.id = ev.exam_id
			
			LEFT JOIN public.exam_data ed
			ON ed.id = ev.exam_data_id

			LEFT JOIN public.module_version mv
			ON mv.id = ev.module_version_id

			LEFT JOIN public.course_version cv
			ON cv.id = mv.course_version_id
			
			WHERE cv.course_id = co.id
			AND cic.user_id = u.id
			AND ex.is_pretest IS FALSE
			AND ex.is_signup IS FALSE
        ) completed_exam_count,
        
        -- total spent time
        cstv.total_spent_seconds total_spent_seconds,
        
        -- every user performance average 
		-- on one course for difference from 
	 	-- company/course performance
        (
            SELECT
                AVG(performance_percentage)
            FROM public.user_performance_view upv
            WHERE upv.course_id = co.id
			AND upv.performance_percentage != 0
        ) average_performance_on_course,
        
        -- answered video questions count
        (
			SELECT 
				SUM(ast.answered_question_count)
			FROM answer_stats ast
			
			WHERE ast.answer_session_type = 'video'
			AND ast.user_id = u.id
			AND ast.course_id = co.id
        ) answered_video_question_count,

        -- answered practise questions count
        (
            SELECT 
				SUM(ast.answered_question_count)
			FROM answer_stats ast
			
			WHERE ast.answer_session_type = 'practise'
			AND ast.user_id = u.id
			AND ast.course_id = co.id
        ) answered_practise_question_count,
        
        -- recommended videos for practise count
        (
             SELECT
				COUNT(uprv.total_given_answer_count)::int
			FROM public.user_practise_recommendation_view uprv

			WHERE uprv.total_given_answer_count = 3
			AND uprv.is_recommended_for_practise IS TRUE
			AND uprv.user_id = u.id
			AND uprv.course_version_id = cv.id
			AND cosv.in_progress IS TRUE
              
        ) recommended_videos_for_practise,
        
        -- is final exam done
		(
			SELECT
				COUNT(*) > 0
			FROM public.course_item_completion cic
			
			LEFT JOIN public.exam_version ev
			ON ev.id = cic.exam_version_id
			
			LEFT JOIN public.exam_data ed
			ON ed.id = ev.exam_data_id

			LEFT JOIN public.module_version mv
			ON mv.id = ev.module_version_id

			LEFT JOIN public.course_version cv
			ON cv.id = mv.course_version_id
			
			WHERE cv.course_id = co.id
			AND cic.user_id = u.id
			AND ed.is_final IS TRUE
		)	is_final_exam_completed,
        
        tcdv.required_completion_date,
        tcdv.tempomat_adjustment_value,
        tcdv.tempomat_mode,
        tcdv.original_previsioned_completion_date,
        tcdv.total_item_count,
        tcdv.total_completed_item_count
    
    FROM public.course co
	
	CROSS JOIN public.user u
	
	LEFT JOIN public.course_version cv
	ON cv.course_id = co.id
	
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
)

SELECT
    ucs.*,

    -- performance difference from all users average
    ucs.performance_percentage - ucs.average_performance_on_course difference_from_average_performance_percentage
FROM  user_course_stats ucs

ORDER BY ucs.user_id
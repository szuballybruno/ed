-- user course progress view

WITH user_course_stats AS
(
    SELECT
        co.id course_id,
        cd.title,
		u.id user_id,

        -- cover file path
        (
            SELECT
                sf.file_path
            FROM public.storage_file sf
            WHERE sf.id = cd.cover_file_id
        ) cover_file_path,

        -- cover file path
        (
            SELECT
                ucb.start_date
            FROM public.user_course_bridge ucb
            WHERE ucb.user_id = clsv.user_id
            AND ucb.course_id = co.id
        ) start_date,
	
        -- course progress percentage
        NULLIF(clsv.completed_course_item_count, 0) /
        NULLIF(clsv.total_course_item_count, 0)::double precision * 100 course_progress_percentage,
        
        -- correct answer rate
        clsv.question_success_rate correct_answer_rate,

        -- current performance per course
        (
            SELECT
                performance_percentage
            FROM public.user_performance_view upv
            WHERE upv.user_id = u.id
            AND upv.course_id = co.id
        ) performance_percentage,
        
        -- completed video count
        CASE
            WHEN clsv.is_started
            THEN clsv.completed_video_count
        END completed_video_count,
        
        -- completed exam count
        (
            CASE
                WHEN clsv.is_started
                THEN (
                    SELECT COUNT(*)::int
                    FROM public.exam_completed_view ecv
    
                    LEFT JOIN public.exam_version ev
                    ON ev.id = ecv.exam_version_id
					
					LEFT JOIN public.exam ex
					ON ex.id = ev.exam_id
    
                    WHERE
                        ecv.course_version_id = co.id
                        AND ecv.user_id = clsv.user_id
                        AND ecv.completed_session_count > 0
                        AND ex.is_pretest IS FALSE
						AND ex.is_signup IS FALSE
                )
            END
        ) completed_exam_count,
        
        -- total spent time
        CASE
            WHEN clsv.is_started
            THEN clsv.total_spent_seconds
        END total_spent_seconds,
        
        -- every user performance average on one course for difference from company/course performance
        (
            SELECT
                AVG(performance_percentage)
            FROM public.user_performance_view upv
            WHERE upv.course_id = co.id
			AND upv.performance_percentage != 0
        ) average_performance_on_course,
        
        -- answered video questions count
        (
            CASE
                WHEN clsv.is_started
                THEN (
                    SELECT 
						COUNT(*)::int
                    FROM public.given_answer ga
    
                    LEFT JOIN public.answer_session_view asv
                    ON asv.answer_session_id = ga.answer_session_id
					
					LEFT JOIN public.video_version vv
					ON vv.id = asv.video_version_id
					
					LEFT JOIN public.exam_version ev
					ON ev.id = asv.exam_version_id
    
                    LEFT JOIN public.module_version mv
					ON mv.id = vv.module_version_id
					OR mv.id = ev.module_version_id
					
					LEFT JOIN public.course_version cv
					ON cv.id = mv.course_version_id
    
                    WHERE
                        is_practise_answer IS FALSE
                        AND asv.user_id = clsv.user_id
                        AND asv.video_version_id IS NOT NULL
                        AND asv.exam_version_id IS NULL
                        AND cv.course_id = co.id
                )
            END
        ) answered_video_question_count,

        -- answered practise questions count
        (
            CASE
                WHEN clsv.is_started
                THEN
                (
                    SELECT 
						COUNT(*)::int
                    FROM public.given_answer ga
    
                    LEFT JOIN public.answer_session_view asv
                    ON asv.answer_session_id = ga.answer_session_id
    
                   LEFT JOIN public.video_version vv
					ON vv.id = asv.video_version_id
					
					LEFT JOIN public.exam_version ev
					ON ev.id = asv.exam_version_id
    
                    LEFT JOIN public.module_version mv
					ON mv.id = vv.module_version_id
					OR mv.id = ev.module_version_id
					
					LEFT JOIN public.course_version cv
					ON cv.id = mv.course_version_id
    
                    WHERE
						asv.answer_session_type = 'practise'
                        AND is_practise_answer IS TRUE
                        AND asv.user_id = clsv.user_id
                        AND cv.course_id = co.id
                )
            END
        ) answered_practise_question_count,
        
        -- recommended videos for practise count
        (
            CASE
                WHEN clsv.is_started
                THEN
                (
                    SELECT
                        COUNT(uprv.total_given_answer_count)::int
                    FROM public.user_practise_recommendation_view uprv
					
                    WHERE
                        uprv.total_given_answer_count = 3
                        AND uprv.is_recommended_for_practise IS TRUE
                        AND uprv.user_id = clsv.user_id
                        AND uprv.course_version_id = cv.id
                )
            END
        ) recommended_videos_for_practise,
        
        -- is final exam done
        CASE
            WHEN clsv.is_started
                AND clsv.final_exam_success_rate::boolean IS TRUE
            THEN TRUE
            WHEN clsv.is_started
                AND clsv.final_exam_success_rate::boolean IS NOT TRUE
            THEN FALSE
        END is_final_exam_completed,
        
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
    
    LEFT JOIN public.course_learning_stats_view clsv
    ON clsv.course_id = co.id
	AND clsv.user_id = u.id

    LEFT JOIN public.tempomat_calculation_data_view tcdv
    ON tcdv.user_id = clsv.user_id
    AND tcdv.course_id = co.id
)

SELECT
    ucs.*,

    -- performance difference from all users average
    ucs.performance_percentage - ucs.average_performance_on_course difference_from_average_performance_percentage
FROM  user_course_stats ucs

ORDER BY ucs.user_id
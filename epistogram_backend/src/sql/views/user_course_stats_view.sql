-- user course progress view

SELECT
    sq.*,

    -- performance difference from all users average
    sq.performance_percentage - sq.average_performance_on_course difference_from_average_performance_percentage
FROM (
    SELECT
        co.id course_id,
        cd.title,

        -- cover file path
        (
            SELECT
                sf.file_path
            FROM public.storage_file sf
            WHERE sf.id = cd.cover_file_id
        ) cover_file_path,

        clsv.user_id user_id,
        
        -- course progress percentage
        NULLIF(clsv.completed_course_item_count, 0) /
        NULLIF(clsv.total_course_item_count, 0)::double precision * 100 course_progress_percentage,
        
        -- current performance per course
        (
            SELECT
                performance_percentage
            FROM public.user_performance_view upv
            WHERE
                upv.user_id = clsv.user_id
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
        
        -- recommended course items per week
        (
            SELECT
                ucriqv.recommended_items_per_week::int
            FROM user_course_recommended_item_quota_view ucriqv
            WHERE
                ucriqv.user_id = clsv.user_id
                AND ucriqv.course_id = co.id
        ) recommended_items_per_week,
        
        -- current lag behind percentage
        (
            SELECT ucpv.lag_behind_percentage
            FROM user_course_progress_view ucpv
            WHERE
                ucpv.user_id = clsv.user_id
                AND ucpv.course_id = co.id
        ) lag_behind_percentage,
        
        -- previsioned course completion date
        (
            SELECT previsioned_completion_date
            FROM user_course_completion_original_estimation_view uccoev
            WHERE
                uccoev.user_id = clsv.user_id
                AND uccoev.course_id = co.id
        ) previsioned_completion_date,
        
        -- current course tempomat mode
        (
            SELECT ucpv.tempomat_mode
            FROM user_course_progress_view ucpv
            WHERE
                ucpv.user_id = clsv.user_id
                AND ucpv.course_id = co.id
        ) tempomat_mode
    
    FROM public.course co
	
	LEFT JOIN public.course_version cv
	ON cv.course_id = co.id
	
	LEFT JOIN public.course_data cd
	ON cd.id = cv.course_data_id
    
    LEFT JOIN public.course_learning_stats_view clsv
    ON clsv.course_id = co.id
) sq
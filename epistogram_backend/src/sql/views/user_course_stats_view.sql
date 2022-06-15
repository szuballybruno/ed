-- user course progress view

SELECT
    sq.*,

    -- performance difference from all users average
    sq.performance_percentage - sq.average_performance_on_course difference_from_average_performance_percentage
FROM (
    SELECT
        c.id course_id,
        c.title,

        -- cover file path
        (
            SELECT
                sf.file_path
            FROM public.storage_file sf
            WHERE sf.id = c.cover_file_id
        ) cover_file_path,

        -- cover file path
        (
            SELECT
                ucb.start_date
            FROM public.user_course_bridge ucb
            WHERE ucb.user_id = clsv.user_id
            AND ucb.course_id = c.id
        ) start_date,

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
                AND upv.course_id = c.id
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
    
                    LEFT JOIN public.exam e
                    ON e.id = ecv.exam_id
    
                    WHERE
                        ecv.course_id = c.id
                        AND ecv.user_id = clsv.user_id
                        AND ecv.completed_session_count > 0
                        AND e.type = 'normal'
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
            WHERE upv.course_id = c.id
        ) average_performance_on_course,
        
        -- answered video questions count
        (
            CASE
                WHEN clsv.is_started
                THEN (
                    SELECT COUNT(*)::int
                    FROM public.given_answer ga
    
                    LEFT JOIN public.answer_session ase
                    ON ase.id = ga.answer_session_id
    
                    LEFT JOIN public.video v
                    ON v.id = ase.video_id
    
                    LEFT JOIN public.exam e
                    ON e.id = ase.exam_id
    
                    LEFT JOIN public.course c2
                    ON c2.id = v.course_id OR c2.id = e.course_id
    
                    WHERE
                        is_practise_answer IS FALSE
                        AND ase.user_id = clsv.user_id
                        AND ase.video_id IS NOT NULL
                        AND ase.exam_id IS NULL
                        AND c2.id = c.id
                )
            END
        ) answered_video_question_count,

        -- answered practise questions count
        (
            CASE
                WHEN clsv.is_started
                THEN
                (
                    SELECT COUNT(ga.is_correct)::int
                    FROM public.given_answer ga
    
                    LEFT JOIN public.answer_session ase
                    ON ase.id = ga.answer_session_id
    
                    LEFT JOIN public.video v
                    ON v.id = ase.video_id
    
                    LEFT JOIN public.exam e
                    ON e.id = ase.exam_id
    
                    LEFT JOIN public.course c2
                    ON c2.id = v.course_id OR c2.id = e.course_id
    
                    WHERE
                        is_practise_answer IS TRUE
                        AND ase.user_id = clsv.user_id
                        AND c2.id = c.id
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
                        AND uprv.last_three_answer_average < 0.66
                        AND uprv.user_id = clsv.user_id
                        AND uprv.course_id = c.id
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
    
    FROM public.course c
    
    LEFT JOIN public.course_learning_stats_view clsv
    ON clsv.course_id = c.id

    LEFT JOIN public.tempomat_calculation_data_view tcdv
    ON tcdv.user_id = clsv.user_id
    AND tcdv.course_id = c.id
) sq
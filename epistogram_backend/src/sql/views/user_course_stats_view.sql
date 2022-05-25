-- user course progress view

SELECT
    sq.*,
    sq.performance_percentage - sq.average_performance_on_course difference_from_average_performance_percentage
FROM (
    SELECT
        c.id course_id,
        clsv.user_id user_id,
        
        -- course progress percentage
                NULLIF(clsv.completed_course_item_count, 0) /
                NULLIF(clsv.total_course_item_count, 0)::double precision * 100 course_progress_percentage,
        
        -- current performance per course
        (
            SELECT performance_percentage
            FROM public.user_performance_view upv
            WHERE
                upv.user_id = clsv.user_id
                AND upv.course_id = c.id
        ) performance_percentage,
        
        -- completed video count
        clsv.completed_video_count,
        
        -- completed exam count
        (
            SELECT COUNT(*)
            FROM public.exam_completed_view ecv
            
            LEFT JOIN public.exam e
            ON e.id = ecv.exam_id
            
            WHERE
                ecv.course_id = c.id
                AND ecv.user_id = clsv.user_id
                AND ecv.completed_session_count > 0
                AND e.type = 'normal'
        ) completed_exam_count,
        
        -- total spent time
        clsv.total_spent_seconds,
        
        -- every user performance average on one course for difference from company/course performance
        (
            SELECT
                AVG(performance_percentage)
            FROM public.user_performance_view upv
            WHERE upv.course_id = c.id
        ) average_performance_on_course,
        
        -- answered video questions count
        (
            SELECT
                COUNT(*)
            FROM public.given_answer ga
            
            LEFT JOIN public.answer_session ase
            ON ase.id = ga.answer_session_id
            
            LEFT JOIN public.video v
            ON v.id = ase.video_id
            
            LEFT JOIN public.exam e
            ON e.id = ase.exam_id
            
            LEFT JOIN public.course c2
            ON c2.id = v.course_id
            OR c2.id = e.course_id
            
            WHERE is_practise_answer IS FALSE
            AND ase.user_id = clsv.user_id
            AND ase.video_id IS NOT NULL
            AND ase.exam_id IS NULL
            AND c2.id = c.id
        ) answered_video_question_count,
        (
            SELECT
                COUNT(ga.is_correct)
            FROM public.given_answer ga
            
            LEFT JOIN public.answer_session ase
            ON ase.id = ga.answer_session_id
            
            LEFT JOIN public.video v
            ON v.id = ase.video_id
            
            LEFT JOIN public.exam e
            ON e.id = ase.exam_id
            
            LEFT JOIN public.course c2
            ON c2.id = v.course_id
            OR c2.id = e.course_id
            
            WHERE is_practise_answer IS TRUE
            AND ase.user_id = clsv.user_id
            AND c2.id = c.id
        ) answered_practise_question_count,
        
        -- recommended videos for practise count
        (
            SELECT
                COUNT(uprv.total_given_answer_count)::int
            FROM public.user_practise_recommendation_view uprv
            WHERE
                uprv.total_given_answer_count = 3
                AND uprv.last_three_answer_average < 0.66
                AND uprv.user_id = clsv.user_id
                AND uprv.course_id = c.id
        ) recommended_videos_for_practise,
        
        -- is final exam done
        clsv.final_exam_success_rate::boolean is_final_exam_completed,
        
        -- recommended course items per week
        (
            SELECT ucriqv.recommended_items_per_week
            FROM user_course_recommended_item_quota_view ucriqv
            WHERE
                ucriqv.user_id = clsv.user_id
                AND ucriqv.course_id = c.id
        ) recommended_items_per_week,
        
        -- current lag behind percentage
        (
            SELECT ucpv.lag_behind_percentage
            FROM user_course_progress_view ucpv
            WHERE
                ucpv.user_id = clsv.user_id
                AND ucpv.course_id = c.id
        ) lag_behind_percentage,
        
        -- previsioned course completion date
        (
            SELECT previsioned_completion_date
            FROM user_course_completion_original_estimation_view uccoev
            WHERE
                uccoev.user_id = clsv.user_id
                AND uccoev.course_id = c.id
        ) previsioned_completion_date,
        
        -- current course tempomat mode
        (
            SELECT ucpv.tempomat_mode
            FROM user_course_progress_view ucpv
            WHERE
                ucpv.user_id = clsv.user_id
                AND ucpv.course_id = c.id
        ) tempomat_mode
    
    FROM public.course c
    
    LEFT JOIN public.course_learning_stats_view clsv
    ON clsv.course_id = c.id
) sq
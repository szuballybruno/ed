/* SELECT
    sq2.*,
    a.id answer_id,
    a.text answer_text
FROM 
(
    SELECT 
        sq.*,
        q.id question_id,
        q.question_text question_text,
        sf.file_path video_file_path,
        co.title course_title
    FROM
    (
        -- video
        SELECT
            v.course_id sq_course_id,
            v.id video_id,
            NULL exam_id,
            v.title item_title,
            v.subtitle item_subtitle,
            v.video_file_id video_file_id,
            (SELECT encode((v.id || '@video')::bytea, 'base64')) item_code,
            'video' item_type
        FROM public.video v

        UNION ALL

        -- exam
        SELECT
            e.course_id sq_course_id,
            NULL video_id,
            e.id exam_id,
            e.title item_title,
            e.subtitle item_subtitle,
            NULL video_url,
            (SELECT encode((e.id || '@exam')::bytea, 'base64')) item_code,
            CASE WHEN e.type = 'normal' THEN 'exam' ELSE e.type END item_type
        FROM public.exam e
    ) sq

    LEFT JOIN public.question q
    ON q.video_id = sq.video_id
    OR q.exam_id = sq.exam_id

    LEFT JOIN public.storage_file sf
    ON sf.id = sq.video_file_id

    LEFT JOIN public.course co
    ON co.id = sq.sq_course_id
) sq2

LEFT JOIN public.answer a
ON a.question_id = sq2.question_id */

SELECT 
    q.id question_id,
    q.question_text question_text,
    q.show_up_time_seconds question_show_up_time_seconds,
    a.id answer_id,
    a.text answer_text,
    a.is_correct answer_is_correct,
    v.course_id course_id,
    v.id video_id,
    v.title item_title,
    v.subtitle item_subtitle,
    v.length_seconds video_length_seconds,
    e.id exam_id,
    sf.file_path video_file_path,
    c.title course_title
FROM public.question q

LEFT JOIN public.answer a
ON q.id = a.question_id

LEFT JOIN public.video v
ON v.id = q.video_id

LEFT JOIN public.exam e
ON e.id = q.exam_id

LEFT JOIN public.storage_file sf
ON sf.id = v.video_file_id

LEFT JOIN public.course c
ON c.id = v.course_id
OR c.id = e.course_id
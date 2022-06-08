SELECT
    CASE
        WHEN c.is_anonymous IS NOT TRUE
        THEN CONCAT(all_user.last_name, ' ', all_user.first_name) 
    END full_name,
    sf.file_path avatar_url,
    c.group_id,
    c.id,
    c.text comment_text,
    c.creation_date,
    c.video_id,
    c.parent_comment_id,
    c.is_anonymous,
    c.is_question,
    all_user.id user_id,
    owner_user.id current_user_id,

    -- true if owner_user liked the comment
    (l.deletion_date IS NULL AND l.user_id IS NOT NULL) is_like,
    
    -- count of all likes on the comment
    (
        SELECT
            COUNT(1)
        FROM public.like l
        WHERE l.comment_id = c.id
        AND l.deletion_date IS NULL
    )::int comment_like_count,
    
    -- virtual thread id for ordering
    CASE
        WHEN c.parent_comment_id IS NULL
        THEN c.id
        ELSE c.parent_comment_id
    END thread_id
FROM public.comment c

LEFT JOIN public.user all_user
ON all_user.id = c.user_id

LEFT JOIN storage_file sf
ON all_user.avatar_file_id = sf.id

CROSS JOIN public.user owner_user

LEFT JOIN public.like l
ON l.comment_id = c.id
AND l.user_id = owner_user.id
AND l.deletion_date IS NULL

-- first order by threads then creation_date
ORDER BY thread_id, creation_date, parent_comment_id desc

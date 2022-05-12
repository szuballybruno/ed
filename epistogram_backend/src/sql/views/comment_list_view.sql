SELECT
    CONCAT(u.last_name, ' ', u.first_name) full_name,
    sf.file_path avatar_url,
    c.id,
    c.text comment_text,
    c.creation_date,
    c.video_id,
    c.parent_comment_id,
    
    -- virtual thread id for ordering
    CASE
        WHEN c.parent_comment_id IS NULL
        THEN c.id
        ELSE c.parent_comment_id
    END thread_id
FROM public.comment c

LEFT JOIN public.user u
ON u.id = c.user_id

LEFT JOIN storage_file sf
ON u.avatar_file_id = sf.id

-- first order by threads then creation_date
ORDER BY thread_id, creation_date, parent_comment_id desc
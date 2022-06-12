WITH
latest_comments AS
(SELECT MAX(id) id, group_id FROM comment group by group_id)
SELECT
    CASE WHEN c.is_anonymous 
		THEN NULL 
		ELSE CONCAT(u.last_name, ' ', u.first_name)
	END full_name,
    sf.file_path avatar_url,
    c.id comment_id,
    c.text comment_text,
    c.creation_date,
    c.video_id,
    c.parent_comment_id,
    c.is_anonymous,
    c.is_question,
	l.id IS NOT NULL current_user_liked,
	all_user.id current_user_id,

    -- count of all likes on the comment
    (
        SELECT
            COUNT(1)
        FROM public.like l
        WHERE l.comment_id = c.id
          AND l.deletion_date IS NULL
    )::int comment_like_count
FROM latest_comments lc

LEFT JOIN comment c
ON c.id = lc.id

LEFT JOIN public.user u
ON u.id = c.user_id

LEFT JOIN storage_file sf
ON u.avatar_file_id = sf.id

CROSS JOIN public.user all_user

LEFT JOIN public.like l
ON l.comment_id = c.id AND l.user_id = all_user.id AND l.deletion_date IS NULL

WHERE all_user.id = 1

-- first order by threads then creation_date
ORDER BY parent_comment_id, creation_date  desc


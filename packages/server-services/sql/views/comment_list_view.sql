SELECT
	CASE
		WHEN co.is_anonymous IS NOT TRUE
		THEN CONCAT(all_user.last_name, ' ', all_user.first_name) 
	END full_name,
	sf.file_path avatar_url,
	co.id comment_id,
	co.text comment_text,
	co.creation_date,
	vv.video_id,
	co.parent_comment_id,
	co.is_anonymous,
	co.is_question,
	all_user.id user_id,
	owner_user.id current_user_id,

	-- true if owner_user liked the comment
	(l.deletion_date IS NULL AND l.user_id IS NOT NULL) is_like,

	-- count of all likes on the comment
	(
		SELECT
			COUNT(1)
		FROM public.like l
		WHERE l.comment_id = co.id
		AND l.deletion_date IS NULL
	)::int comment_like_count,

	-- virtual thread id for ordering
	CASE
		WHEN co.parent_comment_id IS NULL
		THEN co.id
		ELSE co.parent_comment_id
	END thread_group
FROM public.comment co

LEFT JOIN public.user all_user
ON all_user.id = co.user_id

LEFT JOIN storage_file sf
ON all_user.avatar_file_id = sf.id

LEFT JOIN public.video_version vv
ON vv.id = co.video_version_id

CROSS JOIN public.user owner_user

LEFT JOIN public.like l
ON l.comment_id = co.id
AND l.user_id = owner_user.id
AND l.deletion_date IS NULL

-- first order by threads then creation_date
ORDER BY 
	thread_group, 
	creation_date, 
	parent_comment_id desc
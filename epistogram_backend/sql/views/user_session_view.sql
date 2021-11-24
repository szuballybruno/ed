SELECT 
	*
FROM 
(
	-- group 3
	SELECT 
		"usav"."user_id" AS "user_id",
		"groups_2"."group_start_date" AS "session_start_date",
		MAX("usav"."creation_date") AS "session_end_date",
		MAX("usav"."creation_date") - "groups_2"."group_start_date" AS "session_length",
		EXTRACT(EPOCH FROM (MAX("usav"."creation_date") - "groups_2"."group_start_date")) AS "session_length_seconds",
		"u"."email" AS "user_email"
	FROM 
	(
		-- group_2
		SELECT 
			"groups_1".*,
			ROW_NUMBER() OVER wind AS "group_id", 
			LAG ("groups_1"."group_start_date", -1) OVER wind AS "next_group_start_date"
		FROM 
		(
			-- group_1
			SELECT * FROM 
			(
				-- sq
				SELECT
					"usav"."user_id",
					"usav"."creation_date" AS "group_start_date",
					LAG ("usav"."creation_date") OVER (
						PARTITION BY "usav"."user_id"
						ORDER BY "usav"."creation_date") < "usav"."creation_date" - INTERVAL '5 min'
					IS DISTINCT FROM false AS "is_group_start"
				FROM public."user_session_activity_view" AS "usav"
			) AS "sq"

			WHERE "sq"."is_group_start"

			ORDER BY
				"sq"."user_id",
				"sq"."group_start_date"
		) AS "groups_1"

		WINDOW wind AS 
		(
			PARTITION BY "groups_1"."user_id"
			ORDER BY "groups_1"."group_start_date"
		)
	) AS "groups_2"

	LEFT JOIN public."user_session_activity_view" AS "usav"
	ON "usav"."user_id" = "groups_2"."user_id"
		AND "usav"."creation_date" >= "groups_2"."group_start_date"
		AND ("usav"."creation_date" < "groups_2"."next_group_start_date" 
			 OR "groups_2"."next_group_start_date" IS NULL)

	LEFT JOIN public."user" AS "u"
	ON "u"."id" = "usav"."user_id"

	GROUP BY
		"usav"."user_id",
		"groups_2"."group_start_date",
		"u"."email"

	ORDER BY
		"usav"."user_id",
		"groups_2"."group_start_date"
) AS "group3"

-- WHERE "group3"."session_length" > INTERVAL '0 sec'

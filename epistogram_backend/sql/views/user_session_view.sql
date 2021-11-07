SELECT 
	"usav"."userId" AS "userId",
	"groups_2"."groupStartDate" AS "sessionStartDate",
	MAX("usav"."creationDate") AS "sessionEndDate",
	MAX("usav"."creationDate") - "groups_2"."groupStartDate" AS "sessionLength",
	"u"."email" AS "userEmail"
FROM 
(
	-- group_2
	SELECT 
		"groups_1".*,
		ROW_NUMBER() OVER wind AS "groupId", 
		LAG ("groups_1"."groupStartDate", -1) OVER wind AS "nextGroupStartDate"
	FROM 
	(
		-- group_1
		SELECT * FROM 
		(
			-- sq
			SELECT
				"usav"."userId",
				"usav"."creationDate" AS "groupStartDate",
				LAG ("usav"."creationDate") OVER (
					PARTITION BY "usav"."userId"
					ORDER BY "usav"."creationDate") < "usav"."creationDate" - INTERVAL '5 min'
				IS DISTINCT FROM false AS "isGroupStart"
			FROM public."user_session_activity_view" AS "usav"
		) AS "sq"

		WHERE "sq"."isGroupStart"

		ORDER BY
			"sq"."userId",
			"sq"."groupStartDate"
	) AS "groups_1"
	
	WINDOW wind AS 
	(
		PARTITION BY "groups_1"."userId"
		ORDER BY "groups_1"."groupStartDate"
	)
) AS "groups_2"

LEFT JOIN public."user_session_activity_view" AS "usav"
ON "usav"."userId" = "groups_2"."userId"
	AND "usav"."creationDate" >= "groups_2"."groupStartDate"
	AND ("usav"."creationDate" < "groups_2"."nextGroupStartDate" 
		 OR "groups_2"."nextGroupStartDate" IS NULL)
		 
LEFT JOIN public."user" AS "u"
ON "u"."id" = "usav"."userId"
		
GROUP BY
	"usav"."userId",
	"groups_2"."groupStartDate",
	"u"."email"
	
ORDER BY
	"usav"."userId",
	"groups_2"."groupStartDate"

SELECT 
	-- isVideoAnswered
	CAST (
		-- check if video has been answered at least once
		CASE WHEN 
			-- count how many times the video got answered 
			SUM("temp2"."isAnswered") > 0
				OR SUM("temp2"."questionCount") = 0
			THEN 1
			ELSE 0 
		END AS boolean) AS "isAnswered",
	
	-- videoId
	"video"."id" AS "videoId",
	
	-- userId
	"user"."id" AS "userId"
FROM public."video" 

LEFT JOIN public."user" AS "user"
ON 1 = 1

LEFT JOIN (

	-- GROUP BY video and answer_session id, 
	-- and count if the group has NULL questionAnswerId s
	SELECT 
		CASE WHEN 
			COUNT(*) - COUNT("temp"."questionAnswerId") = 0
			THEN 1 
			ELSE 0 
		END AS "isAnswered",
		COUNT("temp"."questionId") AS "questionCount",
		"temp"."answerSessionId",
		"temp"."videoId",
		"temp"."userId"
	FROM (

		-- JOIN question with answer session, 
		-- retriev the questions, question_answers, and answer_sessions
		SELECT 
			"video"."id" AS "videoId", 
			"question"."id" AS "questionId",
			"answerSession"."id" AS "answerSessionId",
			"questionAnswer"."id" AS "questionAnswerId",
			"answerSession"."userId" AS "userId"

		FROM public."video" AS "video"
		
		LEFT JOIN public."question" AS "question"
		ON "question"."videoId" = "video"."id"

		LEFT JOIN public."answer_session" AS "answerSession"
		ON 1 = 1  

		LEFT JOIN public."question_answer" AS "questionAnswer"
		ON "questionAnswer"."questionId" = "question"."id"
			AND "questionAnswer"."answerSessionId" = "answerSession"."id"

		ORDER BY "question"."id"
	) AS "temp"

	GROUP BY 
		"temp"."answerSessionId", 
		"temp"."videoId",
		"temp"."userId"
) AS "temp2" 
ON "temp2"."videoId" = "video"."id" 
	AND "temp2"."userId" = "user"."id"
	
GROUP BY 
	"video"."id", 
	"user"."id"
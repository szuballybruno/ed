SELECT 
    *
FROM (
    SELECT
        "ga"."id" "given_answer_id",
        "ga"."is_correct" "given_answer_is_correct",
        "as"."user_id" "user_id",
        CASE
            WHEN (is_practise_answer IS true) THEN 'practise'
            WHEN ("as"."video_id" IS NOT NULL AND "as"."exam_id" IS NULL) THEN 'video'
            WHEN (
                "as"."exam_id" IS NOT NULL 
                AND "as"."video_id" IS NULL 
                AND "as"."type" = 'exam'
            ) THEN 'exam'
            ELSE NULL
        END AS "given_answer_type"
        
    FROM "public"."given_answer" "ga"

    LEFT JOIN "public"."answer_session" AS "as"
    ON "as"."id" = "answer_session_id"
) as "sq"

WHERE "sq"."given_answer_type" IS NOT NULL

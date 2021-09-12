import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
	expression: `
SELECT 
	"video"."id" AS "videoId",
	"user"."id" AS "userId",
	"view"."isAnswered",
	"vpd"."watchedPercent",
	"vpd"."isWatched",
	CAST (CASE WHEN "vpd"."isWatched" = true 
		AND "view"."isAnswered" 
		THEN 1 
		ELSE 0
	END AS boolean) AS "isComplete"
FROM public."video" AS "video"

LEFT JOIN public."user" AS "user"
ON 1 = 1

LEFT JOIN public."user_answer_session_view" AS "view"
ON "view"."userId" = "user"."id" 
	AND "view"."videoId" = "video"."id" 

LEFT JOIN public."video_playback_data" AS "vpd"
ON "vpd"."userId" = "user"."id" 
	AND "vpd"."videoId" = "video"."id" 
`
})
export class UserVideoCompletedView {

	@ViewColumn()
	videoId: number;

	@ViewColumn()
	userId: number;

	@ViewColumn()
	isAnswered: boolean;

	@ViewColumn()
	watchedPercent: number;

	@ViewColumn()
	isWatched: boolean;

	@ViewColumn()
	isComplete: boolean;
}
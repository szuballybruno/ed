import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    expression: `
    SELECT
        "video"."id" AS "videoId",
        "user"."id" AS "userId",
        CASE WHEN 
            MAX("vps"."toSeconds") IS NULL
            THEN 0
            ELSE MAX("vps"."toSeconds")
        END AS "toSeconds"
    FROM public."video"

    LEFT JOIN public."user" AS "user"
    ON 1 = 1 

    LEFT JOIN public."video_playback_sample" AS "vps"
    ON "vps"."videoId" = "video"."id"
        AND "vps"."fromSeconds" < 1
        
    GROUP BY 
        "video"."id",
        "user"."id"
`
})
export class UserVideoMaxWatchedSecondsView {

    @ViewColumn()
    videoId: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    toSeconds: number;
}
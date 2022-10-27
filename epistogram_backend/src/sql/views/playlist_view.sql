WITH 
all_items_cte AS 
(
    SELECT 
        cv.course_id,
        cv.id course_version_id,
        mv.module_id module_id,
        uni.video_version_id,
        uni.exam_version_id
    FROM 
    (
        SELECT 
            vv.module_version_id, 
            vv.id video_version_id,
            null exam_version_id
        FROM public.video_version vv
        UNION
        SELECT
            ev.module_version_id, 
            null video_version_id,
            ev.id exam_version_id
        FROM public.exam_version ev
    ) uni
    
    LEFT JOIN public.module_version mv
    ON mv.id = uni.module_version_id 
    
    LEFT JOIN public.course_version cv
    ON cv.id = mv.course_version_id
    
    ORDER BY
        cv.course_id,
        cv.id
),
latest_items_cte AS 
(
    SELECT 
        aic.*
    FROM all_items_cte aic
    
	INNER JOIN public.latest_course_version_view lcvi
	ON lcvi.version_id = aic.course_version_id
),
latest_items_with_codes_cte AS 
(
	SELECT 
        lcvi.course_id,
		civ.*,
	
        -- module code
        (SELECT encode((lic.module_id || '@module')::bytea, 'base64')) module_code,

        -- playlist item code
        CASE WHEN civ.video_id IS NULL
            THEN (SELECT encode((civ.exam_id || '@exam')::bytea, 'base64'))
            ELSE (SELECT encode((civ.video_id || '@video')::bytea, 'base64')) 
        END playlist_item_code
	FROM latest_items_cte lic 
	
	INNER JOIN public.latest_course_version_view lcvi
	ON lcvi.version_id = lic.course_version_id
    
    INNER JOIN public.course_item_view civ 
    ON (civ.exam_version_id = lic.exam_version_id 
    OR civ.video_version_id = lic.video_version_id)
    AND civ.item_type <> 'pretest'
    
)
SELECT * 
FROM latest_items_with_codes_cte

ORDER BY
	course_id,
	module_order_index,
	item_order_index
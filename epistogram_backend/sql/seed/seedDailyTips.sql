
INSERT INTO public."storage_file" 
(
    id,
    file_path
)
VALUES 
(
    16,
    '/daily_tip_videos/video_1.mp4'
);
	
-- 	insert new daily tip
INSERT INTO public.daily_tip 
(
    description,
    video_file_id,
    is_live,
    personality_trait_category_id
)
VALUES 
(
    'daily tip desc',
    16,
    true,
    1
);
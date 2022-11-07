
-- UNIQUE
ALTER TABLE public.video_data
DROP CONSTRAINT IF EXISTS video_data_check;

ALTER TABLE public.video_data
ADD CONSTRAINT video_data_check
CHECK (
    (video_file_id IS NULL AND video_file_length_seconds IS NULL) 
    OR
    (video_file_id IS NOT NULL AND video_file_length_seconds IS NOT NULL) 
);
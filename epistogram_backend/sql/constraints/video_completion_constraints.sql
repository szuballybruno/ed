
-- UNIQUE VIDEO
ALTER TABLE public.video_completion
DROP CONSTRAINT IF EXISTS video_completion_unique;

ALTER TABLE public.video_completion
ADD CONSTRAINT video_completion_unique
UNIQUE (video_version_id, user_id);
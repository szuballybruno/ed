ALTER TABLE public.video_data 
ADD COLUMN audio_text varchar;

UPDATE public.video_data 
SET audio_text = '';

ALTER TABLE public.video_data 
ALTER COLUMN audio_text SET NOT NULL;

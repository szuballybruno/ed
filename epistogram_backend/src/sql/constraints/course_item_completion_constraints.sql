
-- UNIQUE
ALTER TABLE public.course_item_completion 
DROP CONSTRAINT IF EXISTS course_item_completion_unique;

ALTER TABLE public.course_item_completion
ADD CONSTRAINT course_item_completion_unique
UNIQUE (exam_version_id, video_version_id, user_id, answer_session_id);

-- CHECK
-- if exam version id is not null, answer session id has to be provided 
-- otherwise it mustn't
ALTER TABLE public.course_item_completion 
DROP CONSTRAINT IF EXISTS course_item_completion_check;

ALTER TABLE public.course_item_completion
ADD CONSTRAINT course_item_completion_check
CHECK (
    ((exam_version_id IS NOT NULL AND answer_session_id IS NOT NULL) OR 
    (video_version_id IS NOT NULL AND answer_session_id IS NULL)) AND 
    ((video_version_id IS NULL AND exam_version_id IS NOT NULL) OR 
    (video_version_id IS NOT NULL AND exam_version_id IS NULL))
    );
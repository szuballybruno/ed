
-- remove is_trusted, is_invitation_accepted
-- add registration_status
ALTER TABLE public.user 
DROP COLUMN is_trusted;

ALTER TABLE public.user 
ADD COLUMN registration_status varchar;

UPDATE public.user 
SET registration_status = 'invited' 
WHERE is_invitation_accepted = false AND registration_type = 'invitation';

UPDATE public.user 
SET registration_status = 'active'
WHERE registration_status IS NULL;

ALTER TABLE public.user 
DROP COLUMN is_invitation_accepted;

ALTER TABLE public.user 
ALTER COLUMN registration_status SET NOT NULL;

-- set usernames for constraint to work
UPDATE public.user 
SET username = LOWER(first_name) || '.' || LOWER(last_name)
WHERE username IS NULL OR username = '';
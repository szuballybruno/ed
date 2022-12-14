ALTER TABLE public.user
ADD CONSTRAINT user_email_unique_constraint
UNIQUE (email, deletion_date);

ALTER TABLE public.user
ADD CONSTRAINT user_username_unique_constraint
UNIQUE (username, deletion_date);

ALTER TABLE public.user
ADD CONSTRAINT user_username_check_constraint
CHECK ((username IS NOT NULL AND username != '') OR registration_status = 'invited');
CREATE UNIQUE INDEX user_email_unique_index 
ON public.user (email) 
WHERE deletion_date IS NULL;
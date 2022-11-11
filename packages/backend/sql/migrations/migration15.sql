ALTER TABLE public.activation_code 
DROP COLUMN is_used;

ALTER TABLE public.activation_code
ADD COLUMN user_id int;

ALTER TABLE public.activation_code
ADD CONSTRAINT activation_code_user_fk
FOREIGN KEY (user_id) REFERENCES public.user(id);

ALTER TABLE public.activation_code
ADD COLUMN trial_length_days int;

UPDATE public.activation_code
SET trial_length_days = 30;

ALTER TABLE public.activation_code
ALTER COLUMN trial_length_days SET NOT NULL;

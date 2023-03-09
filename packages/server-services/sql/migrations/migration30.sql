UPDATE public.permission SET code = 'EDIT_COURSE' WHERE code = 'EDIT_COURSES';
UPDATE public.permission SET scope = 'COURSE' WHERE code = 'EDIT_COURSE';
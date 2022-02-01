BEGIN;

-- SEED SIGNUP EXAM
INSERT INTO public.exam
    (
        id,
        title,
        type
    )
VALUES
    (
        1,
        '[signup exam]',
        'signup'
    )
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    module_id = EXCLUDED.module_id;

END;
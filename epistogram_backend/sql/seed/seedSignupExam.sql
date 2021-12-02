BEGIN;

-- SEED SIGNUP EXAM MODULE 
INSERT INTO public.course_module
    (
        id,
        name,
        order_index,
        description
    )
VALUES
    (
        1,
        '[unused module for signup exam]',
        0,
        '[unused module for signup exam]'
    )
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    order_index = EXCLUDED.order_index,
    description = EXCLUDED.description;

-- SEED SIGNUP EXAM
INSERT INTO public.exam
    (
        id,
        title,
        module_id
    )
VALUES
    (
        1,
        '[unused signup exam]',
        1
    )
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    module_id = EXCLUDED.module_id;

END;
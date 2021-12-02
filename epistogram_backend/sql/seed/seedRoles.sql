BEGIN;

-- SEED ROLES 
INSERT INTO public.role
    (
        id,
        name
    )
VALUES
    (
        1,
        'Administrator'
    ),
    (
        2,
        'Supervisor'
    ),
    (
        3,
        'User'
    )
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name;

-- SEED ROLE ACTIVITY BRIDGES
INSERT INTO public."role_activity_bridge"
    (
        id,
        activity_id,
        role_id
    )
VALUES
    (
        1,
        3,
        2
    )
ON CONFLICT (id) DO UPDATE SET 
    role_id = EXCLUDED.role_id,
    activity_id = EXCLUDED.activity_id;

END;
INSERT INTO public.role
(
    id,
    name,
    owner_user_id,
    owner_company_id,
    is_global
)
VALUES
(
    1,
    'Company Manager',
    NULL,
    NULL,
    true
),
(
    3,
    'Company HR Viewer',
    NULL,
    NULL,
    true
),
(
    4,
    'Company Role Manager',
    NULL,
    NULL,
    true
),
(
    5,
    '[Company owned] Custom Role 1',
    NULL,
    2,
    false
);
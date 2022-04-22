INSERT INTO public.role
(
    id,
    name,
    owner_user_id,
    owner_company_id
)
VALUES
(
    1,
    'Administrator',
    4,
    NULL
),
(
    2,
    'Supervisor',
    4,
    NULL
),
(
    3,
    'User',
    5,
    NULL
),
(
    4,
    'Company Role Manager',
    5,
    NULL
),
(
    5,
    'This is a company owned test role',
    NULL,
    2
);
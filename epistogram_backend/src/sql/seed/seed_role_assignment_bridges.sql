INSERT INTO public.role_assignment_bridge
(
    id,
    role_id,
    company_id,
    user_id
)
VALUES

-- company
(
    1, --id 
    1, --role_id 
    2, --company_id
    NULL --user_id
),
(
    2, --id 
    2, --role_id 
    2, --company_id
    NULL --user_id
),

-- user
(
    3, --id 
    1, --role_id 
    2, --company_id
    1 --user_id
),
(
    4, --id 
    2, --role_id 
    2, --company_id
    4 --user_id
),
(
    5, --id 
    4, --role_id 
    2, --company_id
    6 --user_id
);
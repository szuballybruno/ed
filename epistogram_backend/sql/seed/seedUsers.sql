INSERT INTO public.user 
(
    id, 
    is_invitation_accepted,
    is_trusted,
    registration_type,
    email,
    username,
    first_name,
    last_name,
    is_teacher,
    password,
    role_id,
    organization_id,
    job_title_id
)
VALUES 
(
    1, -- id 
    false, -- is_invitation_accepted
    true, -- is_trusted
    'Invitation', -- registration_type
    'teacher@epi.com', -- email
    'teacherusername', -- username
    'Teacherfirst', -- first_name
    'Teacherlast', -- last_name
    true, -- is_teacher
    '', -- password
    1, -- role_id
    1, -- organization_id
    1 -- job_title_id
)
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
    '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', -- password (admin)
    1, -- role_id
    1, -- organization_id
    1 -- job_title_id
);

INSERT INTO public.teacher_info 
(
    id,
    skills,
    course_count,
    video_count,
    student_count,
    rating,
    badges,
    user_id,
    description
)
VALUES 
(
    1,
    'Teaching, mostly',
    5,
    23,
    14,
    4,
    'badge1',
    1,
    'desc'
)
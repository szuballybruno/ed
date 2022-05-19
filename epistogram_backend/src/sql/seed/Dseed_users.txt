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
    company_id,
    job_title_id,
    is_god
)
VALUES 
(
    1, -- id 
    true, -- is_invitation_accepted
    true, -- is_trusted
    'Invitation', -- registration_type
    'endre.marosi@gmail.com', -- email
    'god', -- username
    'Endre', -- first_name
    'Marosi', -- last_name
    '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', -- password (admin)
    -- -- 1, -- role_id
    1, -- company_id
    1, -- job_title_id,
    true -- is_god
),
(
    2, -- id 
    true, -- is_invitation_accepted
    true, -- is_trusted
    'Invitation', -- registration_type
    'ALMOSTGOD@gmail.com', -- email
    'almostgod', -- username
    'Almost', -- first_name
    'God', -- last_name
    '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', -- password (admin)
    -- -- 1, -- role_id
    1, -- company_id
    1, -- job_title_id,
    false -- is_god
),
(
    4, -- id 
    false, -- is_invitation_accepted
    true, -- is_trusted
    'Invitation', -- registration_type
    'gyorgy.kelecsenyi@gmail.com', -- email
    'teacherusername', -- username
    'György', -- first_name
    'Kelecsényi', -- last_name
    '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', -- password (admin)
    -- -- 1, -- role_id
    1, -- company_id
    1, -- job_title_id,
    false -- is_god
),
(
    5, -- id 
    false, -- is_invitation_accepted
    true, -- is_trusted
    'Invitation', -- registration_type
    'gizi13@gmail.com', -- email
    'teacherusername', -- username
    'Gizella', -- first_name
    'Zurinka', -- last_name
    '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', -- password (admin)
    -- 1, -- role_id
    1, -- company_id
    1, -- job_title_id,
    false -- is_god
),
(
    6, -- id 
    false, -- is_invitation_accepted
    true, -- is_trusted
    'Invitation', -- registration_type
    'vlaicup@hotmail.com', -- email
    'teacherusername', -- username
    'Péter', -- first_name
    'Dr. Vlaciu', -- last_name
    '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', -- password (admin)
    -- 1, -- role_id
    1, -- company_id
    1, -- job_title_id,
    false -- is_god
),
(
    7, -- id 
    false, -- is_invitation_accepted
    true, -- is_trusted
    'Invitation', -- registration_type
    'prozgonyi@microsoft.com', -- email
    'teacherusername', -- username
    'Péter', -- first_name
    'Rozgonyi', -- last_name
    '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', -- password (admin)
    -- 1, -- role_id
    1, -- company_id
    1, -- job_title_id,
    false -- is_god
),
(
    8, -- id 
    false, -- is_invitation_accepted
    true, -- is_trusted
    'Invitation', -- registration_type
    'andi.lukacs@t-online.hu', -- email
    'teacherusername', -- username
    'Andrea', -- first_name
    'Lukács', -- last_name
    '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', -- password (admin)
    -- 1, -- role_id
    1, -- company_id
    1, -- job_title_id,
    false -- is_god
),
(
    9, -- id 
    false, -- is_invitation_accepted
    true, -- is_trusted
    'Invitation', -- registration_type
    'lepsenyi.tamas@gmail.com', -- email
    'teacherusername', -- username
    'Tamás', -- first_name
    'Dr. Lepsényi', -- last_name
    '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', -- password (admin)
    -- 1, -- role_id
    1, -- company_id
    1, -- job_title_id,
    false -- is_god
),
(
    10, -- id 
    false, -- is_invitation_accepted
    true, -- is_trusted
    'Invitation', -- registration_type
    'ptaylor.official@gmail.com', -- email
    'teacherusername', -- username
    'Péter', -- first_name
    'Szabó', -- last_name
    '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', -- password (admin)
    -- 1, -- role_id
    1, -- company_id
    1, -- job_title_id,
    false -- is_god
),
(
    11, -- id 
    false, -- is_invitation_accepted
    true, -- is_trusted
    'Invitation', -- registration_type
    'manyokib20@gmail.com', -- email
    'teacherusername', -- username
    'Bence', -- first_name
    'Mányoki', -- last_name
    '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', -- password (admin)
    -- 1, -- role_id
    2, -- company_id
    1, -- job_title_id,
    false -- is_god
),
(
    12, -- id 
    false, -- is_invitation_accepted
    true, -- is_trusted
    'Invitation', -- registration_type
    'naturahelp77@gmail.com', -- email
    'teacherusername', -- username
    'Erika', -- first_name
    'Benkő', -- last_name
    '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', -- password (admin)
    -- 1, -- role_id
    2, -- company_id
    1, -- job_title_id,
    false -- is_god
),
(
    13, -- id 
    false, -- is_invitation_accepted
    true, -- is_trusted
    'Invitation', -- registration_type
    'zwgabor@gmail.com', -- email
    'teacherusername', -- username
    'Gábor', -- first_name
    'Zwierczyk', -- last_name
    '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', -- password (admin)
    -- 1, -- role_id
    2, -- company_id
    1, -- job_title_id,
    false -- is_god
),
(
    14, -- id 
    false, -- is_invitation_accepted
    true, -- is_trusted
    'Invitation', -- registration_type
    'aposkara@freemail.hu', -- email
    'teacherusername', -- username
    'Károly', -- first_name
    'Apostagi', -- last_name
    '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', -- password (admin)
    -- 1, -- role_id
    3, -- company_id
    1, -- job_title_id,
    false -- is_god
),
(
    15, -- id 
    false, -- is_invitation_accepted
    true, -- is_trusted
    'Invitation', -- registration_type
    'rgkrisztina@gmail.com', -- email
    'teacherusername', -- username
    'Krisztina', -- first_name
    'Reichenberger', -- last_name
    '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', -- password (admin)
    -- 1, -- role_id
    3, -- company_id
    1, -- job_title_id,
    false -- is_god
),
(
    16, -- id 
    false, -- is_invitation_accepted
    true, -- is_trusted
    'Invitation', -- registration_type
    'brozalia74@gmail.com', -- email
    'teacherusername', -- username
    'Rozália', -- first_name
    'Borbély', -- last_name
    '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', -- password (admin)
    -- 1, -- role_id
    4, -- company_id
    1, -- job_title_id,
    false -- is_god
),
(
    17, -- id 
    false, -- is_invitation_accepted
    true, -- is_trusted
    'Invitation', -- registration_type
    'kovacsiriszr@gmail.com', -- email
    'teacherusername', -- username
    'Írisz', -- first_name
    'Kovács', -- last_name
    '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', -- password (admin)
    -- 1, -- role_id
    4, -- company_id
    1, -- job_title_id,
    false -- is_god
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
);
BEGIN;

INSERT INTO public.activity
    (
        id,
        code
    )
VALUES
    (
        1,
        'canSetInvitedUserCompany'
    ),
    (
        2,
        'canAccessCourseAdministration'
    ),
    (
        3,
        'canAccessAdministration'
    ),
    (
        4,
        'canAccessApplication'
    ),
    (
        5,
        'canAccessShopAdministration'
    ),
    (
        6,
        'canChangeCourseMode'
    )
ON CONFLICT (id) DO UPDATE SET 
    code = EXCLUDED.code;

END;
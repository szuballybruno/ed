BEGIN;

INSERT INTO public.permission
    (
        id,
        code
    )
VALUES
    (
        1,
        'canChangeCourseMode'
    ),
    (
        2,
        'canSetInvitedUserCompany'
    ),
    (
        3,
        'canAccessCourseAdministration'
    ),
    (
        4,
        'canAccessAdministration'
    ),
    (
        5,
        'canAccessApplication'
    ),
    (
        6,
        'canAccessShopAdministration'
    )
ON CONFLICT (id) DO UPDATE SET 
    code = EXCLUDED.code;

END;
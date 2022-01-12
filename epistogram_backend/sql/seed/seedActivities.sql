BEGIN;

INSERT INTO public."activity"
    (
        "id",
        "name"
    )
VALUES
    (
        1,
        'canSetInvitedUserOrganization'
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
ON CONFLICT ("id") DO UPDATE SET 
    "name" = EXCLUDED."name";

END;
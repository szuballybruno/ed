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
    )
ON CONFLICT ("id") DO UPDATE SET 
    "name" = EXCLUDED."name";

END;
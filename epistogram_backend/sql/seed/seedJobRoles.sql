START TRANSACTION;

INSERT INTO "job_title"
    (
        "name"
    )
VALUES
    (
        'IT Generalist'
    ),
    (
        'Tech Manager'
    ),
    (
        'Developer'
    ),
    (
        'HR'
    )
RETURNING "id";

COMMIT;

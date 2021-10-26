START TRANSACTION;

INSERT INTO "job_title"
    (
        "name"
    )
VALUES
    (
        'Tesztelő'
    )
RETURNING "id";

COMMIT;

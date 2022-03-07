START TRANSACTION;

INSERT INTO public.job_title
    (
        id,
        name
    )
VALUES
    (
        1,
        'Általános felhasználó'
    ),
    (
        2,
        'Tesztelő'
    )
RETURNING id;

COMMIT;

BEGIN;

INSERT INTO public."activity_session"
    (
        "id",
        "start_date",
        "end_date",
        "is_finalized",
        "user_id"
    )
VALUES
    (
        1,
        CURRENT_TIMESTAMP - interval '20' DAY - interval '10' HOUR - interval '38' minute,
        CURRENT_TIMESTAMP - interval '20' DAY - interval '8' HOUR - interval '49' minute,
        true,
        17
    ),(
        2,
        CURRENT_TIMESTAMP - interval '3' DAY - interval '15' HOUR - interval '03' minute,
        CURRENT_TIMESTAMP - interval '3' DAY - interval '10' HOUR - interval '51' minute,
        true,
        17
    ),(
        3,
        CURRENT_TIMESTAMP - interval '2' DAY - interval '7' HOUR - interval '38' minute,
        CURRENT_TIMESTAMP - interval '2' DAY - interval '5' HOUR - interval '12' minute,
        true,
        17
    ),(
        4,
        CURRENT_TIMESTAMP - interval '5' HOUR - interval '24' minute,
        CURRENT_TIMESTAMP - interval '3' HOUR - interval '42' minute,
        true,
        17
    );

END;
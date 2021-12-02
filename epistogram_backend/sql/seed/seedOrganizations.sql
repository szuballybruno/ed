BEGIN;

INSERT INTO public."organization"
    (
        "id",
        "name"
    )
VALUES
    (
        1,
        'P029'
    ),
    (
        2,
        'EpistoGram'
    )
ON CONFLICT ("id") DO UPDATE SET 
    "name" = EXCLUDED."name";

END;
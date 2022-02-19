BEGIN;

INSERT INTO public."question_type"
    (
        "id",
        "name"
    )
VALUES
    (
        1,
        'single_answer'
    ),
    (
        2,
        'multiple_answers'
    )
ON CONFLICT ("id") DO UPDATE SET 
    "name" = EXCLUDED."name";

END;
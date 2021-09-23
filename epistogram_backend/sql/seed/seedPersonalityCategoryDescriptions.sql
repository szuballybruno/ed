START TRANSACTION;

INSERT INTO "personality_category_description" 
    (
        "maxDescription", 
        "minDescription",
        "questionCategoryId"
    ) 
VALUES 
    (
        'maxDescription', 
        'minDescription',
        1    
    ), 
    (
        'maxDescription', 
        'minDescription',
        2    
    ), 
    (
        'maxDescription', 
        'minDescription',
        3    
    ), 
    (
        'maxDescription', 
        'minDescription',
        4    
    ), 
    (
        'maxDescription', 
        'minDescription',
        5 
    )
RETURNING "id";

COMMIT;
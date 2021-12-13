
-- insert cover images 
INSERT INTO public.storage_file 
(
    id,
    file_path
)
VALUES 
(
    20,
    '/images/SHOProuter.png'
),
(
    21,
    '/images/SHOPgephaz.png'
),
(
    22,
    '/images/SHOPoffice.png'
),
(
    23,
    '/images/SHOPlego.png'
),
(
    24,
    '/images/SHOPwindows.png'
),
(
    25,
    '/images/SHOPkostolas.png'
),
(
    26,
    '/images/SHOPeger.png'
);

-- insert shop items 
INSERT INTO public.shop_item
    (
        id,
        shop_item_category_id,
        cover_file_id,
        name,
        coin_price,
        currency_price,
        course_id
    )
VALUES
    (
        1,
        3, -- items
        20,
        'Xiaomi Mi Router 4 Pro Vezeték nélküli router - 50% kedvezmény',
        5000,
        0,
        NULL
    ),
    (
        2,
        3, -- items
        21,
        'Fractal design prémium gépház',
        29000,
        0,
        NULL
    ),
    (
        3,
        1, -- courses 
        NULL,
        '',
        3000,
        0,
        3
    ),
    (
        4,
        2, -- software,
        22,
        'Microsoft Office 2019 Professional Plus - 50% kedvezmény',
        100,
        0,
        NULL
    ),
    (
        5,
        3, -- items
        23,
        'LEGO Ford Mustang GT 1967 - 20% kedvezmény',
        5000,
        0,
        NULL
    ),
    (
        6,
        2, -- items
        24,
        'Microsoft Windows 11 Pro - 50% kedvezmény',
        300,
        0,
        NULL
    ),
    (
        7,
        5, -- activities
        25,
        'Exkluzív borkóstolás Egerben, 2 főre - 50% kedvezmény',
        8000,
        0,
        NULL
    ),
    (
        8,
        3, -- items
        26,
        'Lenovo YOGA vezeték nélküli egér',
        10000,
        0,
        NULL
    )
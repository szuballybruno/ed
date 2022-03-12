
-- insert cover images 
INSERT INTO public.storage_file 
(
    id,
    file_path
)
VALUES 
(
    521,
    '/images/SHOProuter.png'
),
(
    522,
    '/images/SHOPgephaz.png'
),
(
    523,
    '/images/SHOPoffice.png'
),
(
    524,
    '/images/SHOPlego.png'
),
(
    525,
    '/images/SHOPwindows.png'
),
(
    526,
    '/images/SHOPkostolas.png'
),
(
    527,
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
        course_id,
        purchase_limit
    )
VALUES
    (
        1,
        3, -- items
        521,
        'Xiaomi Mi Router 4 Pro Vezeték nélküli router - 50% kedvezmény',
        5000,
        0,
        NULL,
        3
    ),
    (
        2,
        3, -- items
        522,
        'Fractal design prémium gépház',
        29000,
        0,
        NULL,
        3
    ),
    (
        3,
        1, -- courses 
        NULL,
        '',
        3000,
        0,
        4,
        1
    ),
    (
        4,
        2, -- software,
        523,
        'Microsoft Office 2019 Professional Plus - 50% kedvezmény',
        100,
        0,
        NULL,
        3
    ),
    (
        5,
        3, -- items
        524,
        'LEGO Ford Mustang GT 1967 - 20% kedvezmény',
        5000,
        0,
        NULL,
        3
    ),
    (
        6,
        2, -- items
        525,
        'Microsoft Windows 11 Pro - 50% kedvezmény',
        300,
        0,
        NULL,
        3
    ),
    (
        7,
        5, -- activities
        526,
        'Exkluzív borkóstolás Egerben, 2 főre - 50% kedvezmény',
        8000,
        0,
        NULL,
        3
    ),
    (
        8,
        3, -- items
        527,
        'Lenovo YOGA vezeték nélküli egér',
        10000,
        0,
        NULL,
        3
    )
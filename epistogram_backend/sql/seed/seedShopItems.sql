
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
    '/images/SHOPipad.png'
),
(
    24,
    '/images/SHOPpcworld.png'
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
        'Xiaomi Mi Router 4 Pro Gigabit Dual-Band 1317Mbps 2.4G/5.0GHz Vezeték nélküli router',
        3900,
        8000,
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
        13000,
        0,
        3
    ),
    (
        4,
        2, -- software,
        22,
        'Office 365 Pro családi előfizetés csomag 1 évre, maximum 5 felhasználóig',
        9900,
        89000,
        NULL
    ),
    (
        5,
        3, -- items
        23,
        'iPad Pro 2021 128 GB WIFI, Silver',
        49000,
        100000,
        NULL
    ),
    (
        6,
        3, -- items
        24,
        '12 hónapos PCWorld előfizetés',
        10000,
        9800,
        NULL
    ),
    (
        7,
        5, -- activities
        25,
        'Exkluzív borkóstolás Egerben, 2 főre',
        8000,
        12000,
        NULL
    ),
    (
        8,
        3, -- items
        26,
        'Lenovo YOGA vezeték nélküli egér',
        8000,
        3000,
        NULL
    )
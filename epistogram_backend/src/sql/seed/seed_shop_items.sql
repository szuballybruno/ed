INSERT INTO public.storage_file 
(
    id,
    file_path
)
VALUES 
(
    521,
    '/shop_item_cover_images/shop_item_cover_image_12_1642264387986.jpg'
),
(
    522,
    '/shop_item_cover_images/shop_item_cover_image_13_1644244524808.jpg'
),
(
    523,
    '/shop_item_cover_images/shop_item_cover_image_15_1644271334368.jpg'
),
(
    524,
    '/shop_item_cover_images/shop_item_cover_image_16_1644272124130.jpg'
),
(
    525,
    '/shop_item_cover_images/shop_item_cover_image_14_1642264439823.jpg'
),
(
    526,
    '/shop_item_cover_images/shop_item_cover_image_17_1644398843260.jpg'
),
(
    527,
    '/shop_item_cover_images/shop_item_cover_image_18_1644399045859.jpg'
);

INSERT INTO public.shop_item
    (
        id, 
        name, 
        purchase_limit, 
        details_url, 
        coin_price, 
        currency_price,
        shop_item_category_id, 
        cover_file_id, 
        course_id, 
        discount_codes_id
    )
VALUES
    (12, 'WINDOWS 11 PRO (RETAIL) - 50% kedvezmény', 999, 'https://szoftverkulcsok.hu/shop/windows-11-pro-retail/', 500, 0, 2, 521, NULL, NULL),
    (13, 'Windows 10 PRO 32/64 bit (RETAIL) - 50% kedvezmény', 999, 'https://szoftverkulcsok.hu/shop/windows-10-pro-32-64-bit-retail/', 500, 0, 2, 522, NULL, NULL),
    (15, 'Enigma Design Lab kedvezményes marketing szolgáltatások  ', 999, 'https://enigmadesignlab.com/epistogram/', 990, 0, 6, 523, NULL, NULL),
    (16, 'Budapest Cellulite Massage - 15% kedvezmény az összes bérletre', 988, 'https://instagram.com/cellulitmasszazs', 500, 0, 6, 524, NULL, NULL),
    (14, 'Microsoft Office 2019 Professional Plus - 50% kedvezmény kupon', 997, 'https://szoftverkulcsok.hu/shop/microsoft-office-2019-professional-plus/', 500, 0, 2, 525, NULL, NULL),
    (17, 'e-cegem.hu 50% kedvezmény egyedi logótervezésre', 999, 'https://e-cegem.hu', 499, 0, 3, 526, NULL, NULL),
    (18, 'e-cegem.hu 20% kedvezmény az összes weboldal csomagra', 999, 'https://e-cegem.hu', 300, 0, 6, 527, NULL, NULL);

/* 
-- insert cover images 


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
    ) */
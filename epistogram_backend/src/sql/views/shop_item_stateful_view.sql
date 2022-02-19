SELECT 
	sq.*,
	CASE WHEN sq.course_id IS NULL 
		THEN sq.purchase_count < sq.purchase_limit
		ELSE sq.purchase_count = 0 
	END AS can_purchase 
FROM 
(
	SELECT
		si.id,
		u.id AS user_id,
		(
			SELECT COUNT(id)::integer FROM public.coin_transaction ct
			WHERE ct.shop_item_id = si.id AND ct.user_id = u.id
		) AS purchase_count,
		si.course_id,
		CASE WHEN co.id IS NULL 
			THEN si.name 
			ELSE co.title
		END AS name,
		si.purchase_limit,
		si.coin_price,
		si.currency_price,
		sic.id AS shop_item_category_id,
		sic.name AS shop_item_category_name,
		si.details_url AS details_url,
		CASE WHEN co.id IS NULL 
			THEN sisf.file_path
			ELSE cosf.file_path
		END AS cover_file_path
	FROM shop_item si

	LEFT JOIN public.user u
	ON 1 = 1

	LEFT JOIN public.course co
	ON co.id = si.course_id

	LEFT JOIN public.shop_item_category sic
	ON sic.id = si.shop_item_category_id

	LEFT JOIN public.storage_file sisf
	ON sisf.id = si.cover_file_id

	LEFT JOIN public.storage_file cosf
	ON cosf.id = co.cover_file_id

	ORDER BY user_id, id
) sq
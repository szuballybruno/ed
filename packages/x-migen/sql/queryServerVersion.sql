SELECT
	sq2.version_number
FROM 
(
	SELECT 
		sq.version_number,
		ROW_NUMBER() OVER (ORDER BY sq.version_number DESC) rn
	FROM
	(
		SELECT 
			REPLACE(version_name, 'migration', '')::int version_number
		FROM public.migration_version
	) sq
) sq2
WHERE sq2.rn = 1; 

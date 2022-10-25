-- with 
-- numbered AS 
-- (
-- 	select 
-- 		version_name, 
-- 		ROW_NUMBER() OVER (ORDER BY creation_date DESC) rn
-- 	from public.migration_version
-- )
-- select version_name from numbered
-- where rn = 1

select version_name from public.migration_version;
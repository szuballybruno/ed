SELECT 
	con.conname constraint_name,
	rel.relname table_name
FROM pg_catalog.pg_constraint con

INNER JOIN pg_catalog.pg_class rel
ON rel.oid = con.conrelid

INNER JOIN pg_catalog.pg_namespace nsp
ON nsp.oid = connamespace
AND nsp.nspname = 'public'

WHERE con.contype = 'u' 
OR con.contype = 'c';
CREATE OR REPLACE PROCEDURE drop_all_fn()
AS $$ 
DECLARE 
	var_drop_constraints_script varchar;
	var_drop_triggers_script varchar;
	var_drop_views_script varchar;
	var_drop_functions_script varchar;
	var_drop_indices_script varchar;
BEGIN

	-- drop constraints script 
	SELECT 
		string_agg(sq.script_line, CHR(10)) script
	FROM 
	(
		SELECT 
			con.conname constraint_name,
			rel.relname table_name,
			'ALTER TABLE public.' || rel.relname ||' DROP CONSTRAINT "' || con.conname || '";' script_line
		FROM pg_catalog.pg_constraint con

		INNER JOIN pg_catalog.pg_class rel
		ON rel.oid = con.conrelid

		INNER JOIN pg_catalog.pg_namespace nsp
		ON nsp.oid = connamespace
		AND nsp.nspname = 'public'

		WHERE (con.contype = 'u' 
		OR con.contype = 'c')
		AND con.conname != 'migration_version_version_name_unique'
	) sq
	INTO var_drop_constraints_script;
	
	-- drop triggers script
	SELECT 
		string_agg(sq.script_line, CHR(10)) script
	FROM 
	(
		SELECT 
			tr.event_object_table table_name,
			tr.trigger_name,
			'DROP TRIGGER "' || tr.trigger_name || '" ON public.' || tr.event_object_table || ';' script_line
		FROM information_schema.triggers tr
		GROUP BY tr.trigger_name, tr.event_object_table
	) sq
	INTO var_drop_triggers_script;
	
	-- drop views script
	SELECT 
		string_agg(sq.script_line, CHR(10)) script
	FROM 
	(
		SELECT 
			table_name,
			'DROP VIEW IF EXISTS public.' || table_name || ' CASCADE;' script_line
		FROM INFORMATION_SCHEMA.views
		WHERE table_schema = 'public'
	) sq
	INTO var_drop_views_script;
	
	-- drop functions script 
	SELECT 
		string_agg(sq.script_line, CHR(10)) script
	FROM 
	(
		SELECT 
			routine_name,
			'DROP FUNCTION public.' || routine_name || ';' script_line
		FROM information_schema.routines
		WHERE routine_type = 'FUNCTION'
		AND	routine_schema = 'public'
		AND routine_name != 'drop_all_fn'
	) sq
	INTO var_drop_functions_script;
	
	-- drop indices script 
	SELECT 
		string_agg(sq.script_line, CHR(10)) script
	FROM 
	(
		SELECT 
			'DROP INDEX IF EXISTS public.' || indexname || ';' script_line
		FROM pg_indexes
		WHERE tablename NOT LIKE 'pg%'
		AND indexname NOT LIKE '%REL_%'
		AND indexname NOT LIKE '%PK_%'
		AND indexname != 'migration_version_version_name_unique'
	) sq
	INTO var_drop_indices_script;
	
	-- execute scripts 
	IF var_drop_constraints_script IS NOT NULL THEN 
		EXECUTE var_drop_constraints_script;
	END IF;
	
	IF var_drop_triggers_script IS NOT NULL THEN 
		EXECUTE var_drop_triggers_script;
	END IF;
	
	IF var_drop_views_script IS NOT NULL THEN 
		EXECUTE var_drop_views_script;
	END IF;
	
	IF var_drop_functions_script IS NOT NULL THEN 
		EXECUTE var_drop_functions_script;
	END IF;
	
	IF var_drop_indices_script IS NOT NULL THEN 
		EXECUTE var_drop_indices_script;
	END IF;
END 
$$ LANGUAGE 'plpgsql';

CALL drop_all_fn();

DROP PROCEDURE drop_all_fn;
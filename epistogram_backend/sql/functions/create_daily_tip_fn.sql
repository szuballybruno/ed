CREATE OR REPLACE FUNCTION "create_daily_tip_fn"
(
	"p_descriotion" text,
	"p_video_path" text
)
RETURNS integer 
AS $$ 

DECLARE
	"v_new_daily_tip_id" integer; 
	"v_new_storage_file_id" integer; 

BEGIN

	-- insert video storage file
	INSERT INTO public."storage_file" 
	(
		"file_path"
	)
	VALUES 
	(
		"p_video_path"
	)
	RETURNING "id" INTO "v_new_storage_file_id";
	
	-- 	insert new daily tip
	INSERT INTO public."daily_tip" 
	(
		"description",
		"video_file_id"
	)
	VALUES 
	(
		"p_descriotion",
		"v_new_storage_file_id"
	)
	RETURNING "id" INTO "v_new_daily_tip_id";
	
	RETURN "v_new_daily_tip_id";
	
END 
$$ LANGUAGE 'plpgsql';
CREATE OR REPLACE FUNCTION "create_daily_tip_fn"
(
	"p_descriotion" text,
	"p_videoPath" text
)
RETURNS integer 
AS $$ 

DECLARE
	"v_newDailyTipId" integer; 
	"v_newStorageFileId" integer; 

BEGIN

	-- insert video storage file
	INSERT INTO public."storage_file" 
	(
		"filePath"
	)
	VALUES 
	(
		"p_videoPath"
	)
	RETURNING "id" INTO "v_newStorageFileId";
	
	-- 	insert new daily tip
	INSERT INTO public."daily_tip" 
	(
		"description",
		"videoFileId"
	)
	VALUES 
	(
		"p_descriotion",
		"v_newStorageFileId"
	)
	RETURNING "id" INTO "v_newDailyTipId";
	
	RETURN "v_newDailyTipId";
	
END 
$$ LANGUAGE 'plpgsql';
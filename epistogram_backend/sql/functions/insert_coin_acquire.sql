CREATE OR REPLACE FUNCTION "insert_coin_acquire"
(
	"p_user_id" int,
	"p_amount" int,
	"p_session_activity_id" int,
	"p_video_id" int,
	"p_given_answer_streak_id" int
)
RETURNS integer 
AS $$ 

DECLARE
	"v_coin_acquire_id" integer;

BEGIN

	INSERT INTO public."coin_acquire" 
	(
		"user_id",
		"amount",
		"session_activity_id",
		"video_id",
		"given_answer_streak_id"
	)
	VALUES 
	(
		"p_user_id",
		"p_amount",
		"p_session_activity_id",
		"p_video_id",
		"p_given_answer_streak_id"
	)
	RETURNING "id" 
	INTO "v_coin_acquire_id";
	
	RETURN "v_coin_acquire_id";
	
END 
$$ LANGUAGE 'plpgsql';
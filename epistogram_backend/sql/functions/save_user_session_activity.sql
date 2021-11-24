CREATE OR REPLACE FUNCTION "insert_coin_acquire"
(
	"p_amount" int,
	"p_sessionActivityId" int,
	"p_videoId" int,
	"p_givenAnswerStreakId" int
)
RETURNS integer 
AS $$ 

DECLARE
	"v_coin_acquire_id" integer;

BEGIN

	INSERT INTO public."coin_acquire" 
	(
		"amount",
		"sessionActivityId",
		"videoId",
		"givenAnswerStreakId"
	)
	VALUES 
	(
		"p_amount",
		"p_sessionActivityId",
		"p_videoId",
		"p_givenAnswerStreakId"
	)
	RETURNING "id" 
	INTO "v_coin_acquire_id";
	
	RETURN "v_coin_acquire_id";
	
END 
$$ LANGUAGE 'plpgsql';
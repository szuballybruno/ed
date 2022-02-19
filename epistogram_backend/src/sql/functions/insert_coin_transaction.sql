CREATE OR REPLACE FUNCTION insert_coin_transaction
(
	p_user_id int,
	p_amount int,
	p_activity_session_id int,
	p_video_id int,
	p_given_answer_id int,
	p_given_answer_streak_id int,
	p_activity_streak_id int,
	p_shop_item_id int
)
RETURNS integer 
AS $$ 

DECLARE
	v_coin_transaction_id integer;

BEGIN

	INSERT INTO public.coin_transaction 
	(
		user_id,
		amount,
		activity_session_id,
		video_id,
		given_answer_id,
		given_answer_streak_id,
		activity_streak_id,
		shop_item_id
	)
	VALUES 
	(
		p_user_id,
		p_amount,
		p_activity_session_id,
		p_video_id,
		p_given_answer_id,
		p_given_answer_streak_id,
		p_activity_streak_id,
		p_shop_item_id
	)
	RETURNING id 
	INTO v_coin_transaction_id;
	
	RETURN v_coin_transaction_id;
	
END 
$$ LANGUAGE 'plpgsql';
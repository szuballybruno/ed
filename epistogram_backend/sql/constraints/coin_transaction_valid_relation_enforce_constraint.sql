ALTER TABLE coin_transaction 
ADD CONSTRAINT coin_transaction_valid_relation_enforce_constraint 
CHECK 
(
	activity_session_id IS NOT NULL OR
	video_id IS NOT NULL OR
	given_answer_id IS NOT NULL OR
	given_answer_streak_id IS NOT NULL OR
	activity_streak_id IS NOT NULL OR
	shop_item_id IS NOT NULL
);
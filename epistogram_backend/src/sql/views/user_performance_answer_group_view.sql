SELECT
	carsv.user_id,
	carsv.course_id,
	AVG(carsv.exam_correct_answer_rate) exam_correct_answer_rate,
	AVG(carsv.practise_correct_answer_rate) practise_correct_answer_rate,
	AVG(carsv.video_correct_answer_rate) video_correct_answer_rate
FROM correct_answer_rates_split_view carsv

GROUP BY carsv.user_id, carsv.course_id
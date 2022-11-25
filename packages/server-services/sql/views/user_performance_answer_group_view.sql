SELECT
	carsv.user_id,
	carsv.course_id,
	AVG(carsv.exam_correct_answer_rate)::double precision exam_correct_answer_rate,
	AVG(carsv.practise_correct_answer_rate)::double precision practise_correct_answer_rate,
	AVG(carsv.video_correct_answer_rate)::double precision video_correct_answer_rate
FROM public.correct_answer_rates_split_view carsv

GROUP BY carsv.user_id, carsv.course_id
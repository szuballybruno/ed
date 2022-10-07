-- select * from video_data

-- #step
ALTER TABLE video_data
DROP CONSTRAINT "FK_73a43183bd75d4d2361f973937a"

-- #step
ALTER TABLE video_data 
ADD COLUMN video_file_length_seconds double precision;

-- #2
UPDATE video_data vd
SET
  video_file_length_seconds = sq.length_seconds,
  video_file_id = sq.storage_file_id
FROM
(
	SELECT
		vd.id video_data_id,
		vf.length_seconds,
		vf.storage_file_id
	FROM public.video_data vd
	LEFT JOIN public.video_file vf
	ON vf.id = vd.video_file_id
) sq
WHERE sq.video_data_id = vd.id

-- #4
ALTER TABLE video_data
ADD FOREIGN KEY (video_file_id) REFERENCES storage_file(id);

-- #5
-- MODIFY VIEWS 

-- #6
drop table video_file
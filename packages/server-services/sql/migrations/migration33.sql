CREATE TABLE IF NOT EXISTS feature (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    type VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS feature_constraint_bridge (
    id SERIAL PRIMARY KEY,
    feature_id INT NOT NULL REFERENCES public.feature(id),
    required_feature_id INT REFERENCES public.feature(id),
    blocked_feature_id INT REFERENCES public.feature(id),
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS feature_assignment_bridge (
    id SERIAL PRIMARY KEY,
    feature_id INT NOT NULL,
    user_id INT,
    company_id INT,
    video_id INT,
    exam_id INT,
    shop_item_id INT,
    course_id INT,
    FOREIGN KEY (feature_id) REFERENCES public.feature(id),
    FOREIGN KEY (user_id) REFERENCES public.user(id),
    FOREIGN KEY (company_id) REFERENCES public.company(id),
    FOREIGN KEY (video_id) REFERENCES public.video(id),
    FOREIGN KEY (exam_id) REFERENCES public.exam(id),
    FOREIGN KEY (shop_item_id) REFERENCES public.shop_item(id),
    FOREIGN KEY (course_id) REFERENCES public.course(id)
);

-- Inserting basic features
INSERT INTO public.feature (code, description, type) VALUES ('HOME_PAGE', 'Shows the default home page for the user. Should be disabled if the company use the application as a knowledge base.', 'GENERIC');
INSERT INTO public.feature (code, description, type) VALUES ('LEADERBOARD_PAGE', 'Shows the leaderboard page for the user. Should be disabled if the company use the application as a knowledge base.', 'GENERIC');
INSERT INTO public.feature (code, description, type) VALUES ('SHOP_PAGE', 'Enables the shop. EpistoCoins MUST be enabled for this feature to work properly.', 'GENERIC');
INSERT INTO public.feature (code, description, type) VALUES ('EPISTO_COIN', 'Enables EpistoCoins. Either the leaderboard page, or the shop should be enabled for this feature to work properly.', 'GENERIC');
INSERT INTO public.feature (code, description, type) VALUES ('COURSE_DETAILS_PAGE', 'Shows the course details page for a course.', 'COURSE');
INSERT INTO public.feature (code, description, type) VALUES ('COURSE_DETAILS_PAGE_SUMMARY_SECTION', 'Shows the summary tab on the course details page.', 'COURSE');
INSERT INTO public.feature (code, description, type) VALUES ('COURSE_DETAILS_PAGE_REQUIREMENTS_SECTION', 'Shows the requirements tab on the course details page.', 'COURSE');
INSERT INTO public.feature (code, description, type) VALUES ('COURSE_DETAILS_PAGE_CONTENT_SECTION', 'Shows the content tab on the course details page.', 'COURSE');
INSERT INTO public.feature (code, description, type) VALUES ('COURSE_DETAILS_PAGE_TEACHER_SECTION', 'Shows the teacher tab on the course details page.', 'COURSE');
INSERT INTO public.feature (code, description, type) VALUES ('COURSE_DETAILS_PAGE_CATEGORY_TILE', 'Shows the teacher tab on the course details page.', 'COURSE');
INSERT INTO public.feature (code, description, type) VALUES ('COURSE_DETAILS_PAGE_TEACHER_TILE', 'Shows the teacher tab on the course details page.', 'COURSE');
INSERT INTO public.feature (code, description, type) VALUES ('COURSE_DETAILS_PAGE_DIFFICULTY_TILE', 'Shows the teacher tab on the course details page.', 'COURSE');
INSERT INTO public.feature (code, description, type) VALUES ('COURSE_DETAILS_PAGE_LEARNING_EXPERIENCE_TILE', 'Shows the teacher tab on the course details page.', 'COURSE');
INSERT INTO public.feature (code, description, type) VALUES ('SIGNUP_SURVEY', 'Requires the 35 question signup survey from the user.', 'GENERIC');
INSERT INTO public.feature (code, description, type) VALUES ('PRETEST_SURVEY', 'Requires the user to complete pretest before starting the course.', 'COURSE');
INSERT INTO public.feature (code, description, type) VALUES ('PREQUIZ_SURVEY', 'Requires the user to complete prequiz before starting the course.', 'COURSE');


-- Inserting bridges to enable pretest_survey for all the courses where it was enabled previously
INSERT INTO public.feature_assignment_bridge (course_id, feature_id)
SELECT
    cv.course_id course_id, 
    fe.id feature_id
FROM (
    SELECT 
        MAX(cv.id) version_id, cv.course_id
    FROM public.course_version cv
    GROUP BY cv.course_id 
) lcvv

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id, public.feature fe

WHERE cd.is_precourse_survey_required is true
AND fe.code = 'PRETEST_SURVEY';

-- Inserting bridges to enable prequiz_survey for all the courses where it was enabled previously
INSERT INTO public.feature_assignment_bridge (course_id, feature_id)
SELECT
    cv.course_id course_id, 
    fe.id feature_id
FROM (
    SELECT 
        MAX(cv.id) version_id, cv.course_id
    FROM public.course_version cv
    GROUP BY cv.course_id 
) lcvv

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id, public.feature fe

WHERE cd.is_precourse_survey_required is true
AND fe.code = 'PREQUIZ_SURVEY';

-- Drop is_pretest
ALTER TABLE public.course_data
DROP COLUMN is_precourse_survey_required;

-- Create signup survey feature assignment from user permissions
WITH user_who_can_bypass_survey AS
(
	SELECT
		u.id user_id, 
		per.code
	FROM public.user u

	LEFT JOIN public.permission_assignment_bridge pag
	ON pag.assignee_user_id = u.id

	INNER JOIN public.permission per
	ON per.id = pag.permission_id
	AND per.code = 'BYPASS_SURVEY'
)

INSERT INTO public.feature_assignment_bridge (user_id, feature_id)
SELECT
    u.id user_id, 
    fe.id feature_id
FROM public.user u

LEFT JOIN user_who_can_bypass_survey uwcbs
ON uwcbs.user_id = u.id,
public.feature fe

WHERE fe.code = 'SIGNUP_SURVEY'
AND uwcbs.code IS NULL

ORDER BY user_id;

-- Delete obsolate permission_assignment_bridges
DELETE FROM public.permission_assignment_bridge 
WHERE permission_id IN 
(
	SELECT
		per.id permission_id
	FROM public.user u

	LEFT JOIN public.permission_assignment_bridge pag
	ON pag.assignee_user_id = u.id

	INNER JOIN public.permission per
	ON per.id = pag.permission_id
	AND per.code = 'BYPASS_SURVEY'
);

DELETE FROM public.permission
WHERE code = 'BYPASS_SURVEY';

-- Create HOME_PAGE feature assignment to all existing companies
INSERT INTO public.feature_assignment_bridge (company_id, feature_id)
SELECT
    co.id company_id,
    fe.id feature_id
FROM public.company co, public.feature fe

WHERE fe.code = 'HOME_PAGE';

-- Create LEADERBOARD_PAGE feature assignment to all existing companies
INSERT INTO public.feature_assignment_bridge (company_id, feature_id)
SELECT
    co.id company_id,
    fe.id feature_id
FROM public.company co, public.feature fe

WHERE fe.code = 'LEADERBOARD_PAGE';

-- Create SHOP_PAGE feature assignment to all existing companies
INSERT INTO public.feature_assignment_bridge (company_id, feature_id)
SELECT
    co.id company_id,
    fe.id feature_id
FROM public.company co, public.feature fe

WHERE fe.code = 'SHOP_PAGE';

-- Create EPISTO_COIN feature assignment to all existing companies
INSERT INTO public.feature_assignment_bridge (company_id, feature_id)
SELECT
    co.id company_id,
    fe.id feature_id
FROM public.company co, public.feature fe

WHERE fe.code = 'EPISTO_COIN';

-- Create COURSE_DETAILS_PAGE feature assignment to all existing courses
INSERT INTO public.feature_assignment_bridge (course_id, feature_id)
SELECT
    co.id course_id,
    fe.id feature_id
FROM public.course co, public.feature fe
WHERE fe.code = 'COURSE_DETAILS_PAGE';

-- Create COURSE_DETAILS_PAGE_SUMMARY_SECTION feature assignment to all existing courses
INSERT INTO public.feature_assignment_bridge (course_id, feature_id)
SELECT
    co.id course_id,
    fe.id feature_id
FROM public.course co, public.feature fe
WHERE fe.code = 'COURSE_DETAILS_PAGE_SUMMARY_SECTION';

-- Create COURSE_DETAILS_PAGE_REQUIREMENTS_SECTION feature assignment to all existing courses
INSERT INTO public.feature_assignment_bridge (course_id, feature_id)
SELECT
    co.id course_id,
    fe.id feature_id
FROM public.course co, public.feature fe
WHERE fe.code = 'COURSE_DETAILS_PAGE_REQUIREMENTS_SECTION';

-- Create COURSE_DETAILS_PAGE_CONTENT_SECTION feature assignment to all existing courses
INSERT INTO public.feature_assignment_bridge (course_id, feature_id)
SELECT
    co.id course_id,
    fe.id feature_id
FROM public.course co, public.feature fe
WHERE fe.code = 'COURSE_DETAILS_PAGE_CONTENT_SECTION';

-- Create COURSE_DETAILS_PAGE_TEACHER_SECTION feature assignment to all existing courses
INSERT INTO public.feature_assignment_bridge (course_id, feature_id)
SELECT
    co.id course_id,
    fe.id feature_id
FROM public.course co, public.feature fe
WHERE fe.code = 'COURSE_DETAILS_PAGE_TEACHER_SECTION';

-- Create COURSE_DETAILS_PAGE_CATEGORY_TILE feature assignment to all existing courses
INSERT INTO public.feature_assignment_bridge (course_id, feature_id)
SELECT
    co.id course_id,
    fe.id feature_id
FROM public.course co, public.feature fe
WHERE fe.code = 'COURSE_DETAILS_PAGE_CATEGORY_TILE';

-- Create COURSE_DETAILS_PAGE_TEACHER_TILE feature assignment to all existing courses
INSERT INTO public.feature_assignment_bridge (course_id, feature_id)
SELECT
    co.id course_id,
    fe.id feature_id
FROM public.course co, public.feature fe
WHERE fe.code = 'COURSE_DETAILS_PAGE_TEACHER_TILE';

-- Create COURSE_DETAILS_PAGE_DIFFICULTY_TILE feature assignment to all existing courses
INSERT INTO public.feature_assignment_bridge (course_id, feature_id)
SELECT
    co.id course_id,
    fe.id feature_id
FROM public.course co, public.feature fe
WHERE fe.code = 'COURSE_DETAILS_PAGE_DIFFICULTY_TILE';

-- Create COURSE_DETAILS_PAGE_LEARNING_EXPERIENCE_TILE feature assignment to all existing courses
INSERT INTO public.feature_assignment_bridge (course_id, feature_id)
SELECT
    co.id course_id,
    fe.id feature_id
FROM public.course co, public.feature fe
WHERE fe.code = 'COURSE_DETAILS_PAGE_LEARNING_EXPERIENCE_TILE';



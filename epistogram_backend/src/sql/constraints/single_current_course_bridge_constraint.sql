/* ALTER TABLE user_course_bridge
ADD CONSTRAINT single_current_course_bridge_constraint
UNIQUE (is_current, user_id); */

/* ALTER TABLE user_course_bridge */
/* CREATE UNIQUE INDEX single_current_course_bridge ON user_course_bridge (user_id)
WHERE is_current = true */
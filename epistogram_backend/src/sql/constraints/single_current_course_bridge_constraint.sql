ALTER TABLE user_course_bridge
ADD CONSTRAINT single_current_course_bridge_constraint
UNIQUE (is_current, user_id);
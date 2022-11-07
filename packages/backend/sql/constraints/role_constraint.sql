ALTER TABLE role
ADD CONSTRAINT role_constraint
CHECK (is_custom = false OR company_id IS NOT NULL);
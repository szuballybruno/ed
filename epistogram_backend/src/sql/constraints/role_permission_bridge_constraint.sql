ALTER TABLE role_permission_bridge
ADD CONSTRAINT role_permission_bridge_constraint
UNIQUE (role_id, permission_id);
ALTER TABLE activation_code
ADD CONSTRAINT activation_code_uniqe_constraint
UNIQUE (code);
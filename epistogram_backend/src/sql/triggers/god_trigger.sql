CREATE OR REPLACE FUNCTION set_user_as_god_trigger() 
RETURNS TRIGGER AS 
$$
BEGIN
NEW.is_god = true;
RETURN NEW;
END;
$$ 
Language plpgsql;
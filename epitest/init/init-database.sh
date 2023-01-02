echo "---------- PGPASSWORD: $PGPASSWORD"
echo "---------- POSTGRES_PASSWORD: $POSTGRES_PASSWORD"
echo "---------- POSTGRES_USER: $POSTGRES_USER"
echo "---------- POSTGRES_DB: $POSTGRES_DB"

echo "---------- User setup... "
psql -U dev_service_user -d localhostDB -f /docker-entrypoint-initdb.d/sql/user-setup.sql -v ON_ERROR_STOP=1
echo "---------- User setup done."

echo "---------- Restoring DB..."
psql -U dev_service_user -d localhostDB -f /docker-entrypoint-initdb.d/sql/database-backup.sql > /dev/null
echo "---------- Restoring DB done."

echo "---------- Migrating DB..."
PGOPTIONS='--client-min-messages=warning' psql -U dev_service_user -d localhostDB -f /docker-entrypoint-initdb.d/sql/migration-script.sql -v ON_ERROR_STOP=1 > /dev/null
echo "---------- Migrating DB done."
echo "---------- Restoring DB..."
psql -U dev_service_user -d localhostDB -f ./../../init/database-backup.sql --quiet
echo "---------- Restoring DB done."

echo "---------- Migrating DB..."
psql -U dev_service_user -d localhostDB -f ./../../init/migration-script.sql --quiet
echo "---------- Migrating DB done."
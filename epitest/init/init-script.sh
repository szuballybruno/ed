echo "---------- Restoring DB..."
psql -U dev_service_user -d localhostDB -f ./../../init/database-backup.sql -q
echo "---------- Restoring DB done."

echo "---------- Migrating DB..."
psql -U dev_service_user -d localhostDB -f ./../../init/migration-script.sql -q
echo "---------- Migrating DB done."
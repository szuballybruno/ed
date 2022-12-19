echo "---------- Restoring DB..."
psql -U dev_service_user -d localhostDB -f ./../../init/database-backup.sql --quiet
echo "---------- Restoring DB done."

echo "---------- Migrating DB..."
psql -U dev_service_user -d localhostDB -f ./../../init/migration-script.sql --quiet -v ON_ERROR_STOP=1 # -o ./../../init/logs_migration.log > ./../../init/logs_migration2.log
echo "---------- Migrating DB done."
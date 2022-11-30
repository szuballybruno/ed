PGOPTIONS="-c client_min_messages=error"

echo "---------- Restoring DB..."
psql -U dev_service_user -d localhostDB -f ./../../init/database-backup.sql --quiet -o ./../../init/logs_backup.log -v ON_ERROR_STOP=1 ./../../init/logs_backup2.log
# --quiet -P pager=off -o ./../../init/logs_backup.log
echo "---------- Restoring DB done."

echo "---------- Migrating DB..."
psql -U dev_service_user -d localhostDB -f ./../../init/migration-script.sql --quiet -o ./../../init/logs_migration.log -v ON_ERROR_STOP=1 &>> ./../../init/logs_migration2.log
# --quiet -P pager=off -o ./../../init/logs_migration.log
echo "---------- Migrating DB done."
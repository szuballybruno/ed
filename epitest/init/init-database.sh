# echo "---------- Setting PG settings..."
# psql -U dev_service_user -c "log_min_messages=WARNING"
# echo "---------- Setting PG settings done."

echo "---------- Restoring DB..."
pg_restore -U dev_service_user -d localhostDB -f ./database-backup.sql
echo "---------- Restoring DB done."

echo "---------- Migrating DB..."
psql -U dev_service_user -d localhostDB -f ./migration-script.sql -v ON_ERROR_STOP=1
echo "---------- Migrating DB done."
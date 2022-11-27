echo "Restoring DB..."
psql -U dev_service_user -d localhostDB -f ./../../init/epistogram_DEV_backup.sql -q
echo "Restoring DB done."

$dump_path = "$PWD/../epitest/init"
$dump_path_abs = Resolve-Path $dump_path
echo "dump_path_abs: ${dump_path_abs}"

# backup db
./db_dump.ps1 `
    -dbpass "$env:PGPASSWORD" `
    -dbhost 'localhost' `
    -dbport '5432' `
    -dbuser 'dev_service_user' `
    -dbname 'localhostDB' `
    -dbdumppath "$dump_path/database-backup.sql"
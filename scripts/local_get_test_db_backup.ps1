
# backup db
./db_dump.ps1 `
    -dbpass 'epistogram' `
    -dbhost 'localhost' `
    -dbport '5432' `
    -dbuser 'dev_service_user' `
    -dbname 'localhostDB' `
    -dbdumppath './../epitest/init/database-backup.sql'
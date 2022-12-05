
./local_migen.ps1

./db_exec.ps1 `
    -dbpass "$env:PGPASSWORD" `
    -dbhost 'localhost' `
    -dbport '5432' `
    -dbuser 'dev_service_user' `
    -dbname 'localhostDB' `
    -scriptpath './../epitest/init/migration-script.sql'
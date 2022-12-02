
./local_migen.ps1

./db_exec.ps1 `
    -dbpass 'epistogram' `
    -dbhost 'localhost' `
    -dbport '5432' `
    -dbuser 'dev_service_user' `
    -dbname 'localhostDB' `
    -scriptpath './../epitest/init/migration-script.sql'
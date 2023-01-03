#
# This script will run "migen" and export a migration-script.sql, 
# which will also be executed on the local database.
#

# root folder path
$epi_repo_root_folder = "${PWD}/../"

# run migen 
./local_run_migen.ps1

# exec migration script
./core/db_exec.ps1 `
    -dbpass "$env:LOCAL_POSTGRES_USER_PASSWORD" `
    -dbhost "localhost" `
    -dbport 5432 `
    -dbname "localhostDB" `
    -dbuser "dev_service_user" `
    -scriptpath "${epi_repo_root_folder}/epitest/init/migration-script.sql"
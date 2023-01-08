#
# This script will run the prod version of "migen", 
# with proper paths specified, and generate the migration-script.sql file,
# which than can be used to migrate the database.
#

param (
    [string] $mode = "EXECUTE"
)

# save repo root folder path
$epi_repo_root_folder = "${PSScriptRoot}/../"
$xmigen_path = "${epi_repo_root_folder}/thinkhub-xlib/packages/x-migen"
$xmigen_run_prod_script = "${xmigen_path}/scripts/run_migen_prod.ps1"

# run script 
& $xmigen_run_prod_script `
    -dbname localhostDB `
    -dbhost host.docker.internal `
    -dbusername dev_service_user `
    -dbport 5432 `
    -dbpassword "$env:LOCAL_POSTGRES_USER_PASSWORD" `
    -outFolderPath "${epi_repo_root_folder}/epitest/init/sql" `
    -schemaFolderPath "${epi_repo_root_folder}/packages/server-services/sql" `
    -migen_folder_path "$xmigen_path" `
    -mode:$mode
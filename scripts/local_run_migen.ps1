
# save repo root folder path
$epi_repo_root_folder = "${PWD}/../"

# run script 
./../thinkhub-xlib/packages/x-migen/scripts/run_migen_prod.ps1 `
    -dbname localhostDB `
    -dbhost host.docker.internal `
    -dbusername dev_service_user `
    -dbport 5432 `
    -dbpassword "$env:PGPASSWORD" `
    -migenFolderPath `
    -outFolderPath "${epi_repo_root_folder}/epitest/init" `
    -schemaFolderPath "${epi_repo_root_folder}/packages/server-services/sql" `
    -migen_folder_path "${epi_repo_root_folder}/../thinkhub-xlib/packages/x-migen" `
    -mode "SCRIPT_ONLY"
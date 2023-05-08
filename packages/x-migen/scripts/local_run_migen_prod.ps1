& $PSScriptRoot/../scripts/run_migen_prod.ps1 `
    -dbname epistogram_local `
    -dbhost host.docker.internal `
    -dbusername dev_service_user `
    -dbport 5432 `
    -dbpassword "$env:PGPASSWORD" `
    -outFolderPath "C:\dev\epistogram\epitest\out\" `
    -schemaFolderPath "C:\dev\epistogram\packages\server-services\sql\" `
    -migen_folder_path "C:\dev\epistogram\packages\x-migen" `
    -mode "EXECUTE"

# TODO: Change absolute paths

# save repo root folder path
#$epi_repo_root_folder = "${PSScriptRoot}/../"
#$xmigen_path = "${epi_repo_root_folder}"
#$xmigen_run_prod_script = "${xmigen_path}/scripts/run_migen_prod.ps1"
#
#& $PSScriptRoot/../scripts/run_migen_prod.ps1 `
#    -dbname epistogram_local `
#    -dbhost host.docker.internal `
#    -dbusername dev_service_user `
#    -dbport 5432 `
#    -dbpassword "$env:PGPASSWORD" `
#    -outFolderPath "${epi_repo_root_folder}\packages\x-migen\out\" `
#    -schemaFolderPath "${epi_repo_root_folder}\packages\server-services\sql" `
#    -migen_folder_path "$xmigen_path" `
#    -mode "EXECUTE"
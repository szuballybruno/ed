& "${PSScriptRoot}/../core/db_dump.ps1" `
    -dbpass ${Env:GCP_POSTGRES_USER_PASSWORD} `
    -dbhost "34.118.107.79" `
    -dbport 5432 `
    -dbuser "dev_service_user" `
    -dbname "epistogram_dev" `
    -dbdumppath "${PSScriptRoot}/dump.sql" 
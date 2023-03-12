./run_migen_prod.ps1 `
    -dbname localhostDB `
    -dbhost host.docker.internal `
    -dbusername dev_service_user `
    -dbport 5432 `
    -dbpassword "$env:PGPASSWORD" `
    -outFolderPath "C:\GitRepositories\thinkhub-xlib\packages\x-migen\out\" `
    -schemaFolderPath "C:\GitRepositories\epistogram\packages\server-services\sql\" `
    -migen_folder_path "C:\GitRepositories\thinkhub-xlib\packages\x-migen" `
    -mode "EXECUTE"
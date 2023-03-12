yarn start `
    --dbname=localhostDB `
    --dbhost=localhost `
    --dbusername=dev_service_user `
    --dbport=5432 `
    --dbpassword="$env:LOCAL_POSTGRES_USER_PASSWORD" `
    --outFolderPath="${PWD}/../out/" `
    --schemaFolderPath="C:\GitRepositories\epistogram\packages\server-services\sql"
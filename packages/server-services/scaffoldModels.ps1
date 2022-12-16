yarn --cwd ../x-orm scaffold `
    --dbhost=localhost `
    --dbname=localhostDB `
    --dbpassword=$env:PGPASSWORD `
    --dbport=5432 `
    --dbuser=dev_service_user `
    --typemapPath="${PWD}/typemap.json"
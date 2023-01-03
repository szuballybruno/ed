yarn --cwd ../x-orm scaffold `
    --dbhost=localhost `
    --dbname=localhostDB `
    --dbpassword=$env:LOCAL_POSTGRES_USER_PASSWORD `
    --dbport=5432 `
    --dbuser=dev_service_user `
    --typemapPath="${PWD}/typemap.json"
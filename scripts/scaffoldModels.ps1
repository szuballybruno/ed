
$xorm = "${PSScriptRoot}/../thinkhub-xlib/packages/x-orm"

yarn --cwd $xorm scaffold `
    --dbhost=localhost `
    --dbname=localhostDB `
    --dbpassword=$env:LOCAL_POSTGRES_USER_PASSWORD `
    --dbport=5432 `
    --dbuser=dev_service_user `
    --typemapPath="${PSScriptRoot}/../packages/server-services/typemap.json" `
    --modelsFolder="${PSScriptRoot}/../packages/server-services/src/models"

$xorm = "${PSScriptRoot}/../packages/x-orm"

yarn --cwd $xorm scaffold `
    --dbhost=localhost `
    --dbname=epistogram_local `
    --dbpassword="local_postgres_user_pass" `
    --dbport=5432 `
    --dbuser=dev_service_user `
    --typemapPath="${PSScriptRoot}/../packages/server-services/typemap.json" `
    --modelsFolder="${PSScriptRoot}/../packages/server-services/src/models"
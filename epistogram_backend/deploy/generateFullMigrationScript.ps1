param (
    [string]$dbpass,
    [string]$dbhost,
    [string]$dbport,
    [string]$dbname,
    [string]$dbuser
)

mkdir ./out

$env:PGPASSWORD= $dbpass
$version_result= psql `
    -h "$dbhost" `
    -p "$dbport" `
    -d "$dbname" `
    -U "$dbuser" `
    -tc "SELECT version_name FROM public.migration_version;" `
    -o "./out/migrationVersionsOnServer.txt"

cd ../../misc/scripts/scriptProducer
node ./out/deployScriptGen.js
cd ../../../epistogram_backend/deploy
param (
    [string]$dbpass,
    [string]$dbhost,
    [string]$dbport,
    [string]$dbname,
    [string]$dbuser,
    [switch]$dev
)

$path = "./out"
If(!(test-path -PathType container $path))
{
      New-Item -ItemType Directory -Path $path
}

$env:PGPASSWORD= $dbpass
$version_result= psql `
    -h "$dbhost" `
    -p "$dbport" `
    -d "$dbname" `
    -U "$dbuser" `
    -tc "SELECT version_name FROM public.migration_version;" `
    -o "./out/migrationVersionsOnServer.txt"

cd ../../../misc/scripts/scriptProducer
If($dev)
{
    yarn start
}
else {

    node ./out/deployScriptGen.js
}
cd ../../../packages/backend/deploy
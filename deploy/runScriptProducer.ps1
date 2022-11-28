param (
    [string]$dbpass,
    [string]$dbhost,
    [string]$dbport,
    [string]$dbname,
    [string]$dbuser,
    [switch]$dev
)

$path = "./out"

# create out dir 
If(!(test-path -PathType container $path))
{
      New-Item -ItemType Directory -Path $path
}

# get migration versions from db 
$env:PGPASSWORD= $dbpass
$version_result= psql `
    -h "$dbhost" `
    -p "$dbport" `
    -d "$dbname" `
    -U "$dbuser" `
    -tc "SELECT version_name FROM public.migration_version;" `
    -o "./out/migrationVersionsOnServer.txt"

# start script producer 
cd ../
yarn
yarn "build-script-producer"
yarn "start-script-producer"
cd deploy
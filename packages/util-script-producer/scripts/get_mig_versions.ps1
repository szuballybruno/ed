param (
    [string]$dbpass,
    [string]$dbhost,
    [string]$dbport,
    [string]$dbname,
    [string]$dbuser
)
$env:PGPASSWORD= $dbpass
$version_result= psql `
    -h "$dbhost" `
    -p "$dbport" `
    -d "$dbname" `
    -U "$dbuser" `
    -tc "SELECT version_name FROM public.migration_version;" `
    -o "../inputs/versions.txt"
param (
    [string]$dbpass,
    [string]$dbhost,
    [string]$dbport,
    [string]$dbname,
    [string]$dbuser
)

$file_path="../inputs/versions.txt"

echo "Getting migraion versions from ${dbname}..."

if (Test-Path $file_path) {
  Remove-Item $file_path
}

$env:PGPASSWORD= $dbpass
$version_result= psql `
    -h "$dbhost" `
    -p "$dbport" `
    -d "$dbname" `
    -U "$dbuser" `
    -tc "SELECT version_name FROM public.migration_version;" `
    -o "$file_path"

Get-Content $file_path

echo "Getting migraion versions done."
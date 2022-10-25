param (
    [string]$dbpass,
    [string]$dbhost,
    [string]$dbport,
    [string]$dbname,
    [string]$dbuser
)

# get migration script version
$full_migration_path= '../src/sql/out/fullMigrationScript.sql'
$version_raw= Get-Content $full_migration_path -First 1
$migration_script_version= $version_raw.replace('-- MIGRATION VERSION: ', '')

echo "Migration script version: $migration_script_version"

# get version history 
$env:PGPASSWORD= 'epistogram'
$version_result= psql -h $dbhost -p $dbport -d $dbname -U $dbuser -tc "SELECT version_name FROM public.migration_version;"

echo "Migration version history: $version_result"

# migrate 
if ($version_result -like "*$migration_script_version*") {

    echo "Skipping migration script, it's already in migration history."
}
else {
    
    echo "Running migration script..."
    psql -h $dbhost -p $dbport -d $dbname -U $dbuser -f $full_migration_path
}
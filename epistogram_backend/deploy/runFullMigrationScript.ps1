param (
    [string]$dbpass,
    [string]$dbhost,
    [string]$dbport,
    [string]$dbname,
    [string]$dbuser
)
$env:PGPASSWORD= 'epistogram'
$full_migration_path= './out/fullMigrationScript.sql'

# migrate 
echo "Running migration script..."
psql -h $dbhost -p $dbport -d $dbname -U $dbuser -f $full_migration_path
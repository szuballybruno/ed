param (
    [string]$dbpass,
    [string]$dbhost,
    [string]$dbport,
    [string]$dbname,
    [string]$dbuser,
    [string]$script
)

echo "Running script agains $dbname ..."

$env:PGPASSWORD= $dbpass
psql -h $dbhost -p $dbport -d $dbname -U $dbuser -c $script

echo "Running script done."
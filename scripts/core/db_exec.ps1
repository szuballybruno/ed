param (
    [string]$dbpass,
    [string]$dbhost,
    [string]$dbport,
    [string]$dbname,
    [string]$dbuser,
    [string]$scriptpath
)

echo "Running $scriptpath agains $dbname ..."

$env:PGPASSWORD= $dbpass
psql -h $dbhost -p $dbport -d $dbname -U $dbuser -f $scriptpath

echo "Running script done."
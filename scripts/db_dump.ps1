param (
    [string]$dbpass,
    [string]$dbhost,
    [string]$dbport,
    [string]$dbuser,
    [string]$dbname,
    [string]$dbdumppath
)

$nick= "$host/$dbname"

echo "Backup database... $nick"

$Env:PGPASSWORD= $dbpass
pg_dump -E UTF8 -h $dbhost -p $dbport -U $dbuser -f $dbdumppath $dbname 

echo "Backup done. $nick"
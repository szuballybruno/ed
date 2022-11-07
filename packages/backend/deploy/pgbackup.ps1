param (
    [string]$pass,
    [string]$host,
    [string]$port,
    [string]$user,
    [string]$db_name,
    [string]$dump_path
)

# vars
$pgdump_exe= "C:\Program Files\PostgreSQL\14\bin\pg_dump.exe"
$nick= "$host/$db_name"

echo "PG Backup started: $nick"

# backup src DB
$Env:PGPASSWORD= $pass
echo "Backup database... $nick"
& $pgdump_exe -E UTF8 -h $host -p $port -U $user -f $dump_path $db_name 
echo "Backup done. $nick"
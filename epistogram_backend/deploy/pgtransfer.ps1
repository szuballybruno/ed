param (
    [string]$src_pass,
    [string]$src_host,
    [string]$src_port,
    [string]$src_user,
    [string]$src_db_name,

    [string]$dest_pass,
    [string]$dest_host,
    [string]$dest_port,
    [string]$dest_user,
    [string]$dest_db_name
)

# vars
$pgdump_exe= "C:\Program Files\PostgreSQL\14\bin\pg_dump.exe"
$psql_exe= "C:\Program Files\PostgreSQL\14\bin\psql.exe"
$src_nick= "$src_host/$src_db_name"
$dest_nick= "$dest_host/$dest_db_name"
$dump_path= ".\temp\backup_ps1.sql"

echo "PgTransfer started from $src_nick to $dest_nick"

# backup src DB
$Env:PGPASSWORD= $src_pass
echo "Backup database... $src_nick"
& $pgdump_exe -E UTF8 -h $src_host -p $src_port -U $src_user -f $dump_path $src_db_name 
echo "Backup done. $src_nick"

# purge dest DB
$Env:PGPASSWORD= $dest_pass
echo "Purging database... $dest_nick"
& $psql_exe -h $dest_host -p $dest_port -U $dest_user -d $dest_db_name -c "DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;"
echo "Purge done. $dest_nick"

# restore dest DB
$Env:PGPASSWORD= $dest_pass
echo "Restoring database... $dest_nick"
& $psql_exe -h $dest_host -p $dest_port -U $dest_user -d $dest_db_name --file $dump_path
echo "Restoring database done. $dest_nick"
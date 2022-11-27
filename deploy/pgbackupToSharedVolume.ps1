$db_pass= 'epistogram'
$db_host= '34.118.107.79'
$db_port= '5432'
$db_user= 'dev_service_user'
$db_name= 'epistogram_DEV'
$nick= "$db_host/$db_name"
$dump_path= "./../config/init/${db_name}_backup.sql"

echo "PG Backup started: $nick"

$Env:PGPASSWORD= $db_pass
echo "Backup database... $nick"
pg_dump -E UTF8 -h $db_host -p $db_port -U $db_user -f $dump_path $db_name 
echo "Backup done. $nick"
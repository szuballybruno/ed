$dest_pass= 'epistogram'
$dest_host= 'localhost'
$dest_port= '7014'
$dest_user= 'dev_service_user'
$dest_db_name= 'localhostDB'
$soft_schema_script_path= '../src/sql/out/recreateLightSchema.sql'

$env:PGPASSWORD= $dest_pass

psql -h $dest_host -p $dest_port -d $dest_db_name -U $dest_user -f $soft_schema_script_path
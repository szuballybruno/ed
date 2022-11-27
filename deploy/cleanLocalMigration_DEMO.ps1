$src_pass= 'epistogram'
$src_host= '34.118.107.79'
$src_port= '5432'
$src_user= 'dev_service_user'
$src_db_name= 'epistogram_DEMO'

$dest_pass= 'epistogram'
$dest_host= 'localhost'
$dest_port= '5432'
$dest_user= 'dev_service_user'
$dest_db_name= 'localhostDB'

# sync from DEV
.\pgtransfer.ps1 `
    -src_pass $src_pass `
    -src_host $src_host `
    -src_port $src_port `
    -src_user $src_user `
    -src_db_name $src_db_name `
    -dest_pass $dest_pass `
    -dest_host $dest_host `
    -dest_port $dest_port `
    -dest_user $dest_user `
    -dest_db_name $dest_db_name

# compile script producer (local only)
./compileScriptProducer.ps1

# migrate database
.\migrateDatabase.ps1 `
    -dbpass $dest_pass `
    -dbhost $dest_host `
    -dbport $dest_port `
    -dbname $dest_db_name `
    -dbuser $dest_user
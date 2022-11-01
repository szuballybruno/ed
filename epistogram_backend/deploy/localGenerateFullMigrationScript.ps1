$dest_pass= 'epistogram'
$dest_host= 'localhost'
$dest_port= '7014'
$dest_user= 'dev_service_user'
$dest_db_name= 'localhostDB'

./compileScriptProducer.ps1

./generateFullMigrationScript.ps1 `
    -dbpass $dest_pass `
    -dbhost $dest_host `
    -dbport $dest_port `
    -dbname $dest_db_name `
    -dbuser $dest_user
$dest_pass= 'epistogram'
$dest_host= 'localhost'
$dest_port= '5432'
$dest_user= 'dev_service_user'
$dest_db_name= 'localhostDB'

./compileScriptProducer.ps1

./runScriptProducer.ps1 `
    -dbpass $dest_pass `
    -dbhost $dest_host `
    -dbport $dest_port `
    -dbname $dest_db_name `
    -dbuser $dest_user `
    -dev
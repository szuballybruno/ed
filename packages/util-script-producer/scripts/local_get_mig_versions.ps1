$dbpass= "$env:PGPASSWORD"
$dbhost= 'localhost'
$dbport= '5432'
$dbuser= 'dev_service_user'
$dbdb_name= 'localhostDB'

.\get_mig_versions.ps1 `
    -dbpass $dbpass `
    -dbhost $dbhost `
    -dbport $dbport `
    -dbname $dbdb_name `
    -dbuser $dbuser
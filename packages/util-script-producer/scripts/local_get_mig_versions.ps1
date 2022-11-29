$dbpass= 'epistogram'
$dbhost= 'localhost'
$dbport= '5432'
$dbuser= 'dev_service_user'
$dbdb_name= 'localhostDB'

echo "Getting migraion versions..."

.\get_mig_versions.ps1 `
    -dbpass $dbpass `
    -dbhost $dbhost `
    -dbport $dbport `
    -dbname $dbdb_name `
    -dbuser $dbuser

echo "Getting migraion versions done."
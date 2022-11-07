$pass= 'epistogram'
$host= '34.118.107.79'
$port= '5432'
$user= 'dev_service_user'
$db_name= 'epistogram_PROD'
$dump_path= ".\out\backup_ps1.sql"

.\pgbackup.ps1 `
    -pass $pass `
    -host $host `
    -port $port `
    -user $user `
    -db_name $db_name `
    -dump_path $dump_path
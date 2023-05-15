param ( 
    [Parameter(Mandatory)][string] $dbpassword = (Read-Host "Database password: "),
    [string] $dbname = "epistogram_local",
    [string] $dbhost = "host.docker.internal",
    [string] $dbusername = "dev_service_user",
    [int] $dbport = 5432,
    [string] $outFolderPath = "C:\dev\epistogram\epitest\out\",
    [string] $schemaFolderPath = "C:\dev\epistogram\packages\server-services\sql\",
    [string] $migenFolderPath = "C:\dev\epistogram\packages\x-migen"
)

$dump_path = "$PWD/../epitest/init-sql"

# migen 
Write-Host "------ Running migen..." -ForegroundColor Green
Write-Host "------ Creating an up-to-date migration script..." -ForegroundColor Green
Write-Host "------ This will be used to recreate local db inside docker" -ForegroundColor Green

& $PSScriptRoot\..\packages\x-migen\scripts\run_migen_prod.ps1 `
    -dbname "${dbname}" `
    -dbhost $dbhost `
    -dbusername $dbusername `
    -dbport $dbport `
    -dbpassword $dbpassword `
    -outFolderPath $dump_path `
    -schemaFolderPath $schemaFolderPath `
    -migen_folder_path $migenFolderPath `
    -mode "EXECUTE" `

# backup db
Write-Host "------ Creating an up-to-date database backup from: ${dbname}" -ForegroundColor Green
Write-Host "------ This will be used to recreate local db inside docker" -ForegroundColor Green

./core/db_dump.ps1 `
    -dbpass $dbpassword `
    -dbhost 'localhost' `
    -dbport $dbport `
    -dbuser $dbusername `
    -dbname $dbname `
    -dbdumppath "${dump_path}/database-backup.sql" `

# compose
Write-Host "------ Running tests..." -ForegroundColor Green

./run_tests.ps1 `
    -builddeps:$true `
    -buildx:$false `
    -tests:$true;
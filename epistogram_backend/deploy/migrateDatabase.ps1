param (
    [string]$pass,
    [string]$host,
    [string]$port,
    [string]$user,
    [string]$dbname
)

# gen full migration script 
.\deployScriptGen.ps1 `
    -dbpass $pass `
    -dbhost $host `
    -dbport $port `
    -dbname $dbname `
    -dbuser $user

# migrate 
.\runFullMigrationScript.ps1 `
    -dbpass $pass `
    -dbhost $host `
    -dbport $port `
    -dbname $dbname `
    -dbuser $user
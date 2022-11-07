param (
    [string]$dbpass,
    [string]$dbhost,
    [string]$dbport,
    [string]$dbname,
    [string]$dbuser
)

# gen full migration script 
.\generateFullMigrationScript.ps1 `
    -dbpass $dbpass `
    -dbhost $dbhost `
    -dbport $dbport `
    -dbname $dbname `
    -dbuser $dbuser

# migrate 
.\runFullMigrationScript.ps1 `
    -dbpass $dbpass `
    -dbhost $dbhost `
    -dbport $dbport `
    -dbname $dbname `
    -dbuser $dbuser
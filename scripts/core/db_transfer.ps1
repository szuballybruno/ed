param (
    [string]$src_pass,
    [string]$src_host,
    [string]$src_port,
    [string]$src_user,
    [string]$src_name,
    [string]$dest_pass,
    [string]$dest_host,
    [string]$dest_port,
    [string]$dest_user,
    [string]$dest_name
)

# backup db
./db_dump.ps1 `
    -dbpass $src_pass `
    -dbhost $src_host `
    -dbport $src_port `
    -dbuser $src_user `
    -dbname $src_name `
    -dbdumppath './transferdump.sql'

# recreate schema
./db_exec_inline.ps1 `
    -dbpass $dest_pass `
    -dbhost $dest_host `
    -dbport $dest_port `
    -dbuser $dest_user `
    -dbname $dest_name `
    -script 'DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA IF NOT EXISTS public;'

# restore db
./db_exec.ps1 `
    -dbpass $dest_pass `
    -dbhost $dest_host `
    -dbport $dest_port `
    -dbuser $dest_user `
    -dbname $dest_name `
    -scriptpath './transferdump.sql'
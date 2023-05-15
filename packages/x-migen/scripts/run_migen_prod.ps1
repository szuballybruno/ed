#
# This script will build the migen container, 
# and run it with the input schema volume and 
# the output folder volume mounted.
#

param (
    [string]$dbpassword,
    [string]$dbhost,
    [string]$dbport,
    [string]$dbusername,
    [string]$dbname,
    [string]$schemaFolderPath,
    [string]$outFolderPath,
    [string]$mode,
    [string]$migen_folder_path
)

$internal_schema_folder_path = "/migen/schema"
$xlib_repo_root_folder_path = "${migen_folder_path}/../../"
$migen_root_abs = Resolve-Path $migen_folder_path
$repo_root_abs = Resolve-Path $xlib_repo_root_folder_path
$cacheopt_to = "dest=/tmp/docker-cache/"
$cacheopt_from = "src=/tmp/docker-cache/"
$imgbuild = "${repo_root_abs}\scripts\imgbuild.ps1"

Write-Output "Mode: ${mode}"
Write-Output "Out folder: ${outFolderPath}"
Write-Output "Schema folder: ${schemaFolderPath}"
Write-Output "Migen root: ${migen_root_abs}"
Write-Output "Xlib repo root: ${repo_root_abs}"

& $imgbuild `
    -dockerfile "${migen_folder_path}/docker/migen.Dockerfile" `
    -contextpath "${repo_root_abs}" `
    -tag "migen" `
    -cacheto "type=${cachetype},${cacheopt_to}cache-server"  `
    -cachefrom "type=${cachetype},${cacheopt_from}cache-server"

docker run `
    --rm `
    --volume ${outFolderPath}:/app/packages/x-migen/out `
    --volume ${schemaFolderPath}:${internal_schema_folder_path} `
    --env dbname=${dbname} `
    --env dbhost=${dbhost} `
    --env dbusername=${dbusername} `
    --env dbport=${dbport} `
    --env dbpassword=${dbpassword} `
    --env schemaFolderPath=${internal_schema_folder_path} `
    --env mode=${mode} `
    migen

Write-Output "Find the results in: \n${outFolderPath}"
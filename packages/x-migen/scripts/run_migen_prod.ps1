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

echo "Mode: ${mode}"
echo "Out folder: ${outFolderPath}"
echo "Schema folder: ${schemaFolderPath}"
echo "Migen root: ${migen_root_abs}"
echo "Xlib repo root: ${repo_root_abs}"

docker build ${repo_root_abs} `
    -f ${migen_folder_path}/docker/migen.Dockerfile `
    -t migen 

docker run `
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

echo "Find the results in: \n${outFolderPath}"
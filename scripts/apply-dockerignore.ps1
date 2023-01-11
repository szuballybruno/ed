$root = Resolve-Path "${PSScriptRoot}/../../"
$episto_root = Resolve-Path "${root}/epistogram/"

Copy-Item -Path "${episto_root}/.dockerignore" -Destination "${root}/.dockerignore"
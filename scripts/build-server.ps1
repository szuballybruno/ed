$root = Resolve-Path "${PSScriptRoot}/../../"
$episto_root = Resolve-Path "${root}/epistogram/"
$imgbuild = "${PSScriptRoot}/imgbuild.ps1"

# build server
& $imgbuild `
    -dockerfile "${episto_root}/packages/server-api/server.Dockerfile" `
    -tag "localhost:6000/server:latest" `
    -contextpath "${root}" `
    -buildx:$buildx `
    -cacheto "type=${cachetype},${cacheopt_to}cache-server"  `
    -cachefrom "type=${cachetype},${cacheopt_from}cache-server"
param ( 
    [switch] $builddeps,
    [switch] $buildx = $True,
    [string] $client_env = "epitest",
    [string] $cacheopt = 'ref=localhost:5000/',
    [string] $cachetype = 'registry'
) 

$root = Resolve-Path "${PSScriptRoot}/../../"
$episto_root = Resolve-Path "${root}/epistogram/"
$imgbuild = "${PSScriptRoot}/imgbuild.ps1"

echo "Build deps: ${buiddeps}"
echo "Root: ${root}"
echo "Episto root: ${episto_root}"
echo "Buildx: ${buildx}"
echo "Cacheopt: ${cacheopt}"
echo "Cachetype: ${cachetype}"

if ($builddeps) 
{
    # build monodeps
    & $imgbuild `
        -dockerfile "${episto_root}/docker/monodeps.Dockerfile" `
        -tag "localhost:5000/monodeps:latest" `
        -contextpath "${root}" `
        -buildx:$buildx `
        -cacheto "type=${cachetype},${cacheopt}cache-monodeps"  `
        -cachefrom "type=${cachetype},${cacheopt}cache-monodeps"
}

# build monosrc
& $imgbuild `
    -dockerfile "${episto_root}/docker/monosrc.Dockerfile" `
    -tag "localhost:5000/monosrc:latest" `
    -contextpath "${root}" `
    -buildx:$buildx `
    -cacheto "type=${cachetype},${cacheopt}cache-monosrc"  `
    -cachefrom "type=${cachetype},${cacheopt}cache-monosrc"

# build server
& $imgbuild `
    -dockerfile "${episto_root}/packages/server-api/server.Dockerfile" `
    -tag "localhost:5000/server:latest" `
    -contextpath "${root}" `
    -buildx:$buildx `
    -cacheto "type=${cachetype},${cacheopt}cache-server"  `
    -cachefrom "type=${cachetype},${cacheopt}cache-server"

# build client
& $imgbuild `
    -dockerfile "${episto_root}/packages/frontend/client.Dockerfile" `
    -tag "localhost:5000/client:latest" `
    -contextpath "${root}" `
    -buildarg "ENVIRONMENT_NAME=${client_env}" `
    -buildx:$buildx `
    -cacheto "type=${cachetype},${cacheopt}cache-client"  `
    -cachefrom "type=${cachetype},${cacheopt}cache-client"

# build tests-client
& $imgbuild `
    -dockerfile "${episto_root}/packages/tests-client/testsclient.Dockerfile" `
    -tag "localhost:5000/tests-client:latest" `
    -contextpath "${root}" `
    -buildx:$buildx `
    -cacheto "type=${cachetype},${cacheopt}cache-testsclient"  `
    -cachefrom "type=${cachetype},${cacheopt}cache-testsclient"
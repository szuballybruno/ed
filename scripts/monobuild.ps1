param ( 
    [switch] $builddeps,
    [switch] $buildx = $True,
    [switch] $tests = $False,
    [string] $client_env = "epitest",
    [string] $cacheopt_to = 'dest=/tmp/docker-cache/',
    [string] $cacheopt_from = 'src=/tmp/docker-cache/',
    [string] $cachetype = 'local'
)

$root = Resolve-Path "${PSScriptRoot}/../../"
$episto_root = Resolve-Path "${root}/epistogram/"
$imgbuild = "${PSScriptRoot}/imgbuild.ps1"

echo "Build deps: ${buiddeps}"
echo "Root: ${root}"
echo "Episto root: ${episto_root}"
echo "Buildx: ${buildx}"
echo "cacheopt_to: ${cacheopt_to}"
echo "cacheopt_from: ${cacheopt_from}"
echo "Cachetype: ${cachetype}"
echo "Client env: ${client_env}"

if ($builddeps) 
{
    # build monodeps
    & $imgbuild `
        -dockerfile "${episto_root}/docker/monodeps.Dockerfile" `
        -tag "localhost:5000/monodeps:latest" `
        -contextpath "${root}" `
        -buildx:$buildx `
        -push `
        -cacheto "type=${cachetype},${cacheopt_to}cache-monodeps"  `
        -cachefrom "type=${cachetype},${cacheopt_from}cache-monodeps"
}

# build monosrc
& $imgbuild `
    -dockerfile "${episto_root}/docker/monosrc.Dockerfile" `
    -tag "localhost:5000/monosrc:latest" `
    -contextpath "${root}" `
    -buildx:$buildx `
    -push `
    -cacheto "type=${cachetype},${cacheopt_to}cache-monosrc"  `
    -cachefrom "type=${cachetype},${cacheopt_from}cache-monosrc"

# build server
& $imgbuild `
    -dockerfile "${episto_root}/packages/server-api/server.Dockerfile" `
    -tag "localhost:5000/server:latest" `
    -contextpath "${root}" `
    -buildx:$buildx `
    -cacheto "type=${cachetype},${cacheopt_to}cache-server"  `
    -cachefrom "type=${cachetype},${cacheopt_from}cache-server"

# build client
& $imgbuild `
    -dockerfile "${episto_root}/packages/frontend/client.Dockerfile" `
    -tag "localhost:5000/client:latest" `
    -contextpath "${root}" `
    -buildarg "ENVIRONMENT_NAME=${client_env}" `
    -buildx:$buildx `
    -cacheto "type=${cachetype},${cacheopt_to}cache-client"  `
    -cachefrom "type=${cachetype},${cacheopt_from}cache-client"

# build tests-client
if($tests){

    & $imgbuild `
        -dockerfile "${episto_root}/packages/tests-client/testsclient.Dockerfile" `
        -tag "localhost:5000/tests-client:latest" `
        -contextpath "${root}" `
        -buildx:$buildx `
        -cacheto "type=${cachetype},${cacheopt_to}cache-testsclient"  `
        -cachefrom "type=${cachetype},${cacheopt_from}cache-testsclient"
}
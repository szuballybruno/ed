param ( 
    [switch] $builddeps,
    [switch] $buildx = $False,
    [switch] $tests = $False,
    [string] $client_env = "epitest",
    [string] $cacheopt_to = 'dest=/tmp/docker-cache/',
    [string] $cacheopt_from = 'src=/tmp/docker-cache/',
    [string] $cachetype = 'local'
)

$root = Resolve-Path "${PSScriptRoot}/../../"
$episto_root = Resolve-Path "${root}/epistogram/"
$imgbuild = "${PSScriptRoot}/imgbuild.ps1"
$apply_dockerignore = "${PSScriptRoot}/apply-dockerignore.ps1"

echo "Build deps: ${buiddeps}"
echo "Root: ${root}"
echo "Episto root: ${episto_root}"
echo "Buildx: ${buildx}"
echo "cacheopt_to: ${cacheopt_to}"
echo "cacheopt_from: ${cacheopt_from}"
echo "Cachetype: ${cachetype}"
echo "Client env: ${client_env}"

# apply .dockerignore 
& $apply_dockerignore

# build monodeps
if ($builddeps) {
    & $imgbuild `
        -dockerfile "${episto_root}/docker/monodeps.Dockerfile" `
        -tag "localhost:6000/monodeps:latest" `
        -contextpath "${root}" `
        -buildx:$buildx `
        -push `
        -cacheto "type=${cachetype},${cacheopt_to}cache-monodeps"  `
        -cachefrom "type=${cachetype},${cacheopt_from}cache-monodeps"
}

# build server
& $imgbuild `
    -dockerfile "${episto_root}/packages/server-api/server.Dockerfile" `
    -tag "localhost:6000/server:latest" `
    -contextpath "${root}" `
    -buildx:$buildx `
    -cacheto "type=${cachetype},${cacheopt_to}cache-server"  `
    -cachefrom "type=${cachetype},${cacheopt_from}cache-server"

# build client
& $imgbuild `
    -dockerfile "${episto_root}/packages/frontend/client.Dockerfile" `
    -tag "localhost:6000/client:latest" `
    -contextpath "${root}" `
    -buildarg "ENVIRONMENT_NAME=${client_env}" `
    -buildx:$buildx `
    -cacheto "type=${cachetype},${cacheopt_to}cache-client"  `
    -cachefrom "type=${cachetype},${cacheopt_from}cache-client"

# build tests-client
if ($tests) {

    & $imgbuild `
        -dockerfile "${episto_root}/packages/tests-client/testsclient.Dockerfile" `
        -tag "localhost:6000/tests-client:latest" `
        -contextpath "${root}" `
        -buildx:$buildx `
        -cacheto "type=${cachetype},${cacheopt_to}cache-testsclient"  `
        -cachefrom "type=${cachetype},${cacheopt_from}cache-testsclient"
}
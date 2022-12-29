param ( 
    [string] $client_env,
    [switch] $builddeps 
)

echo "Build deps: ${buiddeps}"

$root = Resolve-Path "${PSScriptRoot}/../../"
$episto_root = Resolve-Path "${root}/epistogram/"

echo "Root: ${root}"
echo "Episto root: ${episto_root}"

if ($builddeps) 
{
    # build monodeps
    echo "------ Building monodeps..."
    docker build ${root} --file ${episto_root}/docker/monodeps.Dockerfile --tag monodeps
}

# build monosrc
echo "------ Building monosrc..."
docker build "${root}" --file ${episto_root}/docker/monosrc.Dockerfile --tag monosrc

# build server
echo "------ Building server..."
docker build "${root}" --file ${episto_root}/packages/server-api/server.Dockerfile --tag server

# build client
echo "------ Building client..."
docker build "${root}" --file ${episto_root}/packages/frontend/client.Dockerfile --build-arg ENVIRONMENT_NAME=${client_env} --tag client

# build tests-client
echo "------ Building tests-client..."
docker build "${root}" --file ${episto_root}/packages/tests-client/testsclient.Dockerfile --tag tests-client
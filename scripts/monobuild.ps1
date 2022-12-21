param ( 
    [string] $client_env,
    [switch] $builddeps 
)

if ($builddeps) 
{
    # build monodeps
    echo "------ Building monodeps..."
    docker build ../../ --file ./../docker/monodeps.Dockerfile --tag monodeps
}

# build monosrc
echo "------ Building monosrc..."
docker build ../../ --file ./../docker/monosrc.Dockerfile --tag monosrc

# build server
echo "------ Building server..."
docker build ../../ --file ./../packages/server-api/server.Dockerfile --tag server

# build client
echo "------ Building client..."
docker build ../../ --file ./../packages/frontend/client.Dockerfile --build-arg ENVIRONMENT_NAME=${client_env} --tag client

# build tests-client
echo "------ Building tests-client..."
docker build ../../ --file ./../packages/tests-client/testsclient.Dockerfile --tag tests-client
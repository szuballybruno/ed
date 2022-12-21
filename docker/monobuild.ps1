
# build monodeps
docker build ../../ --file ./monodeps.Dockerfile --tag monodeps

# build server
docker build ../../ --file ./../packages/server-api/backend.Dockerfile --tag server

# build client
docker build ../../ --file ./../packages/frontend/frontend.Dockerfile --tag client
param (
    [switch] $exec
)

docker build ./../epitest `
    --file ./../epitest/mypg.Dockerfile `
    --no-cache `
    --pull `
    --tag mypg

if($exec){

    docker run `
        --env POSTGRES_PASSWORD=$Env:LOCAL_POSTGRES_USER_PASSWORD `
        --env POSTGRES_USER='dev_service_user' `
        --env POSTGRES_DB='epistogram_local' `
        mypg 
}
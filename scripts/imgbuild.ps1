param (
    [switch] $buildx,
    [string] $dockerfile,
    [string] $tag,
    [string] $contextpath,
    [string] $cacheto,
    [string] $cachefrom,
    [switch] $push = $False,
    [string] $buildarg = "NULL=NULL"
)

Write-Host "------ Building image: ${tag}" -ForegroundColor Magenta

if($buildx){

    echo "-- BUILDX is enabled!"
    echo "-- Cache-to: ${cacheto}"
    echo "-- Cache-from: ${cachefrom}"

    # build img and load it to docker
    docker buildx build "${contextpath}" `
        --file "${dockerfile}" `
        --tag "$tag" `
        --load `
        --cache-from=$cachefrom `
        --cache-to=$cacheto

    # push it to localhost repo
    if($push){

        Write-Host "-- Pushing image: ${tag}" -ForegroundColor Cyan
        docker push "$tag"
    }
}
else {

    docker build "${contextpath}" `
        --file "${dockerfile}" `
        --tag "$tag" `
        --build-arg ${buildarg}
}
param (
    [switch] $buildx,
    [string] $dockerfile,
    [string] $tag,
    [string] $contextpath,
    [string] $buildarg = "NULL=NULL",
    [string] $cachescope = 'local',
    [string] $cachetype = 'registry'
)

echo "------ Building image: ${tag} - buildx: ${buildx}..."

if($buildx){

    echo "Docker cache type: ${cachetype}"
    echo "Docker cache scope: ${scope}"

    docker buildx build "${contextpath}" `
        --file "${dockerfile}" `
        --tag "$tag" `
        --load `
        --cache-from "type=${cachetype},scope=${cachescope}-${tag}" `
        --cache-to "type=${cachetype},scope=${cachescope}-${tag},mode=max"
}
else {

    docker build "${contextpath}" `
        --file "${dockerfile}" `
        --tag "$tag" `
        --build-arg ${buildarg}
}
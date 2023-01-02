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
    echo "Docker cache scope: ${cachescope}"

    docker buildx build "${contextpath}" `
        --file "${dockerfile}" `
        --tag "$tag" `
        --output "type=oci" `
        --cache-from "type=${cachetype},scope=${cachescope}-${tag}" `
        --cache-to "type=${cachetype},scope=${cachescope}-${tag},mode=max"

    # --output "type=oci,dest=./${tag}-oci.tar" `
}
else {

    docker build "${contextpath}" `
        --file "${dockerfile}" `
        --tag "$tag" `
        --build-arg ${buildarg}
}
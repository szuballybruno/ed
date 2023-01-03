
$root = Resolve-Path "${PSScriptRoot}/../../"
$episto_root = Resolve-Path "${root}/epistogram/"
$imgbuild = "${PSScriptRoot}/imgbuild.ps1"
$cachescope = 'local'
$cachetype = 'registry'
$buildx = $True

# docker buildx create `
#     --name mybuilder `
#     --use `
#     --bootstrap 
    # --driver=docker-container

docker buildx build "${root}" `
    --platform=linux/arm64 `
    --file "${episto_root}/docker/parent.Dockerfile" `
    --tag "parent:latest" `
    --load `
    --cache-from "type=${cachetype},scope=${cachescope}-parent" `
    --cache-to "type=${cachetype},scope=${cachescope}-parent,mode=max"

docker buildx build "${root}" `
    --platform=linux/arm64 `
    --file "${episto_root}/docker/child.Dockerfile" `
    --tag "child:latest" `
    --load `
    --cache-from "type=${cachetype},scope=${cachescope}-child" `
    --cache-to "type=${cachetype},scope=${cachescope}-child,mode=max"
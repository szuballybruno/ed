param ( 
    [switch] $builddeps 
)

$root_folder_path = "${PWD}/../"

# build images
./monobuild.ps1 -client_env "epitest" #-builddeps

# compose images
./compose_up_tests.ps1
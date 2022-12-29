param ( 
    [switch] $builddeps 
)

# build images
./monobuild.ps1 -client_env "epitest" -builddeps:$builddeps

# compose images
./compose_up_tests.ps1
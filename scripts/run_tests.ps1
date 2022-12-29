param ( 
    [switch] $builddeps 
)

# build images
pwsh ./monobuild.ps1 -client_env "epitest" -builddeps:$builddeps

# compose images
pwsh ./compose_up_tests.ps1
param ( 
    [switch] $builddeps 
)

# build images
Write-Host "------ Running monobuild..." -ForegroundColor Green
./monobuild.ps1 -client_env "epitest" -builddeps:$builddeps -tests:$true

# compose images
Write-Host "------ Composing up tests from testenv.yml..." -ForegroundColor Green
./compose_up_tests.ps1
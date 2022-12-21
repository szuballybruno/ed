$root_folder_path = "${PWD}/../"

# build images
./monobuild.ps1 -client_env "epitest"

# compose images
docker compose `
    --file "${root_folder_path}/epitest/testenv.yml" `
    up `
    --build `
    --force-recreate `
    --abort-on-container-exit `
    --renew-anon-volumes `
    --exit-code-from tests-client
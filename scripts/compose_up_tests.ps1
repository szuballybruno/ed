
$root_folder_path = "${PWD}/../"

docker compose `
    --file "${root_folder_path}/epitest/testenv.yml" `
    up `
    --build `
    --force-recreate `
    --abort-on-container-exit `
    --renew-anon-volumes
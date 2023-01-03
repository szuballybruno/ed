docker compose `
    --file "${PSScriptRoot}/../epitest/testenv.yml" `
    up `
    --build `
    --force-recreate `
    --abort-on-container-exit `
    --renew-anon-volumes
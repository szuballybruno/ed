docker run `
    -v ${PWD}/migen_out:/app/packages/util-script-producer/out `
    migen

# @REM docker cp container-id:/app/packages/util-script-producer/out ./migen_out/script.sql
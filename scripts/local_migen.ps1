
# gen migration script 
cd ./../packages/util-script-producer/scripts
./local_migen_full.ps1
cd ../../../scripts

# copy migration-script
Copy-Item "./../packages/util-script-producer/out/migration-script.sql" -Destination "./../epitest/init/migration-script.sql"
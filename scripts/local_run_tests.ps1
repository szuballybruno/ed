
# migen 
./local_run_migen.ps1 -mode "SCRIPT_ONLY"

# backup db
./local_get_test_db_backup.ps1

# compose
./run_tests.ps1 # -builddeps
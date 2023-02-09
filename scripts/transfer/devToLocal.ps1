echo "Local 'dev_service_user' password: $env:LOCAL_POSTGRES_USER_PASSWORD"
echo "GCP 'postgres' password: $env:GCP_POSTGRES_USER_PASSWORD"

./db_transfer `
    -src_pass "$env:GCP_POSTGRES_USER_PASSWORD" `
    -src_host '34.118.107.79' `
    -src_port '5432' `
    -src_user 'dev_service_user' `
    -src_name 'epistogram_dev' `
    -dest_pass "$env:LOCAL_POSTGRES_USER_PASSWORD" `
    -dest_host 'localhost' `
    -dest_port '5432' `
    -dest_user 'dev_service_user' `
    -dest_name 'epistogram_local'
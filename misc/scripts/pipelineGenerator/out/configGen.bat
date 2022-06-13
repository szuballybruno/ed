echo # ---- CONFIG FILE --- > C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env

@REM gcp
echo # ---- gcp >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo BRANCH_NAME = local >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo BACKEND_URL = api.local.epistogram.com >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo MIN_INSTANCE_COUNT = 0 >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo IS_UNDER_MAINTENANCE = false >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env

@REM misc
echo # ---- misc >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo FRONTEND_URL = http://localhost:3000 >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo FRONTEND_DOMAIN = run.app >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo ENVIRONMENT_NAME = local >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo HOST_PORT = 5000 >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo JWT_SIGN_SECRET = adsasdsd >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo IS_HOSTED_ON_GCP = false >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo IS_LOCALHOST = true >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo VIDEO_COMPLETED_PERCENTAGE = 5 >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env

@REM fileStorage
echo # ---- fileStorage >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo FILE_STORAGE_URL = https://storage.googleapis.com/epistogram_bucket_local >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo FILE_STORAGE_BUCKET_NAME = epistogram_bucket_local >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env

@REM mail
echo # ---- mail >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo MAIL_TOKEN_SECRET = AROWILLSAVETHEMAIL >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo MAIL_HOST = smtp.sendgrid.net >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo MAIL_SENDER_MAIL = apikey >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo MAIL_SENDER_PASSWORD = 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 >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env

@REM database
echo # ---- database >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo DB_NAME = localhostDB >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo DB_HOST_ADDRESS = localhost >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo DB_PORT = 7000 >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo DB_SERVICE_USER_NAME = dev_service_user >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo DB_SERVICE_USER_PASSWORD = admin >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo DB_IS_ORM_LOGGING_ENABLED = false >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
echo IS_DANGEROUS_DB_PURGE_ENABLED = true >> C:\GitRepositories\epistogram\misc\scripts\pipelineGenerator\dist/../../../../epistogram_backend/config.env
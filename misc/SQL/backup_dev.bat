
SET PG_HOST=34.118.107.79
SET PG_PORT=5432
SET PG_DATABASE=epistogram_DEV
SET PG_USER=dev_service_user

SET PG_BIN="C:\Program Files\PostgreSQL\14\bin\pg_dump.exe"
SET PG_FILENAME=C:\sql_migration\backup_%PG_DATABASE%.sql

@echo Backup database %PG_DATABASE%
@echo off

%PG_BIN% -h %PG_HOST% -p %PG_PORT% -U %PG_USER% %PG_DATABASE% > %PG_FILENAME%

@echo Backup complete %PG_DATABASE%
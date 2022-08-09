
SET PG_BIN="C:\Program Files\PostgreSQL\14\bin\psql.exe"
SET PG_HOST=localhost
SET PG_PORT=7014
SET PG_DATABASE=localhostDB
SET PG_USER=dev_service_user
SET BACKUP_FILENAME=C:\sql_migration\backup.sql

@echo Restoring database %PG_DATABASE%
@echo off

%PG_BIN% -h %PG_HOST% -p %PG_PORT% -U %PG_USER% -d %PG_DATABASE% -c "DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;"
%PG_BIN% -h %PG_HOST% -p %PG_PORT% -U %PG_USER% -d %PG_DATABASE% --file %BACKUP_FILENAME%

@echo Restore complete %PG_DATABASE%
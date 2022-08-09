
SET PG_BIN="C:\Program Files\PostgreSQL\14\bin\pg_dump.exe"
SET PG_HOST=localhost
SET PG_PORT=7014
SET PG_DATABASE=localhostDB
SET PG_USER=dev_service_user
SET PG_FILENAME=C:\sql_migration\backup.sql

@echo Backup database %PG_DATABASE%
@echo off

%PG_BIN% -h %PG_HOST% -p %PG_PORT% -U %PG_USER% %PG_DATABASE% > %PG_FILENAME%

@echo Backup complete %PG_DATABASE%
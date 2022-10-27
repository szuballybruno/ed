
@echo off

@REM inputs
SET PGPASSWORD=%1
SET SRC_HOST=%2
SET SRC_PORT=%3
SET SRC_DATABASE=%4
SET DEST_HOST=%5
SET DEST_PORT=%6
SET DEST_DATABASE=%7

@REM source
SET PG_DUMP_BIN="C:\Program Files\PostgreSQL\14\bin\pg_dump.exe"
SET SRC_NICK=%SRC_HOST%/%SRC_DATABASE%

@REM dest
SET PG_PSQL_BIN="C:\Program Files\PostgreSQL\14\bin\psql.exe"
SET DEST_NICK=%DEST_HOST%/%DEST_DATABASE%

@REM common
SET DUMP_FILENAME=.\backup_bat.sql
SET USER=dev_service_user

@REM backup src DB
@echo Backup database... %SRC_NICK%
%PG_DUMP_BIN% -h %SRC_HOST% -p %SRC_PORT% -U %USER% %SRC_DATABASE% > %DUMP_FILENAME%
@echo Backup done. %SRC_NICK%

@REM purge dest DB
@echo Purging database... %DEST_NICK%
%PG_PSQL_BIN% -h %DEST_HOST% -p %DEST_PORT% -U %USER% -d %DEST_DATABASE% -c "DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;"
@echo Purge done. %DEST_NICK%

@REM restore dest DB
@echo Restoring database... %DEST_NICK%
%PG_PSQL_BIN% -h %DEST_HOST% -p %DEST_PORT% -U %USER% -d %DEST_DATABASE% --file %DUMP_FILENAME%
@echo Restoring database done. %DEST_NICK%
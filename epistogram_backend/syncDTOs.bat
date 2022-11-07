

@REM Remove the shared folder from the target destination 
@RD /S /Q %~dp0..\epistogram_frontend\src\shared

@REM recreate the shared folder in the target destination 
mkdir %~dp0..\epistogram_frontend\src\shared

@REM copy shared folder contents to target destination
xcopy /s %~dp0..\epistogram_backend\src\shared %~dp0..\epistogram_frontend\src\shared /Y
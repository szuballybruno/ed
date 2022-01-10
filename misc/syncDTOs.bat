
@RD /S /Q %~dp0..\epistogram_frontend\src\models\shared_models
mkdir %~dp0..\epistogram_frontend\src\models\shared_models
xcopy /s %~dp0..\epistogram_backend\models\shared_models %~dp0..\epistogram_frontend\src\models\shared_models /Y
@ECHO OFF
chcp 65001

set "CURRENT_DIR=%~dp0"

if exist "%CURRENT_DIR%war\tomcat\smbm-services.war" (
	rmdir /s /q "%CURRENT_DIR%war\tomcat\smbm-services.war"
)
echo F|xcopy /Y %CURRENT_DIR%lib\smbm-services.war %CURRENT_DIR%war\tomcat\smbm-services.war

if exist "%CURRENT_DIR%war\wildfly\evb-web-app.war" (
	rmdir /s /q "%CURRENT_DIR%war\wildfly\evb-web-app.war"
)
echo F|xcopy /Y %CURRENT_DIR%lib\evb-web-app.war %CURRENT_DIR%war\wildfly\evb-web-app.war

if exist "%CURRENT_DIR%war\cardservice\card-mservice.jar" (
	rmdir /s /q "%CURRENT_DIR%war\cardservice\card-mservice.jar"
)
echo F|xcopy /Y %CURRENT_DIR%lib\card-mservice.jar %CURRENT_DIR%war\cardservice\card-mservice.jar


if exist "%CURRENT_DIR%war\evb-content" (
	rmdir /s /q "%CURRENT_DIR%war\evb-content
)
powershell Expand-Archive -Path %CURRENT_DIR%lib\evb-content-dev.zip -DestinationPath %CURRENT_DIR%war\evb-content
REM echo F|xcopy /Y/E/H/C/I %CURRENT_DIR%lib\evb-content %CURRENT_DIR%war\evb-content

if exist "%CURRENT_DIR%war\evb-static-content" (
	rmdir /s /q "%CURRENT_DIR%war\evb-static-content"
)
powershell Expand-Archive -Path %CURRENT_DIR%lib\evb-static-content.zip -DestinationPath %CURRENT_DIR%war\evb-static-content
REM echo F|xcopy /Y/E/H/C/I %CURRENT_DIR%lib\evb-static-content %CURRENT_DIR%war\evb-static-content

pause

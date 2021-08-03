@ECHO OFF


if exist ".\ZATRZYMAJ.bat" call ".\ZATRZYMAJ.bat"
if exist ".\USUN.bat" call ".\USUN.bat"

dir > build.log
rem Czyscimy stare zaleznosci jesli sa, nalezy potwierdzic za pomoca "Y"
docker system prune -f > build.log

rem Budowa paczek
docker-compose build 

pause
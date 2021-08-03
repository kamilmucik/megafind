@ECHO OFF

@echo COMMAND: docker-compose up %1

docker-compose up %1 -d

pause
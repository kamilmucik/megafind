@ECHO OFF

docker-compose -f docker-compose.yml down
docker rmi envelo/wildfly:latest
docker rmi envelo/tomcat:latest
docker rmi envelo/evb-content:latest
docker rmi envelo/card:latest

rem pause
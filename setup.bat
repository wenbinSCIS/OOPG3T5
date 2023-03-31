@echo off
cd myapp
start cmd /k "npm start"
cd ..\backend\java-quick-start
start cmd /k "mvn spring-boot:run"

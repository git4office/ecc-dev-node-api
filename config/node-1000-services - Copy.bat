@echo off
start cmd.exe @cmd /k "cd C:\ecc-dev-node-api\config&pm2 start index.js&pm2 monit"
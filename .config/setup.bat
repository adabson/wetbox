@echo off
REM literally just a wrapper to run the setup.sh script on the remote server
@echo on

plink root@wetbox -m setup.sh
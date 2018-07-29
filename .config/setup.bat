@echo off
REM Just a wrapper to run the setup.sh script on the remote server
REM LOCAL ASSUMPTIONS: have windows + putty
@echo on

plink root@wetbox -m setup.sh
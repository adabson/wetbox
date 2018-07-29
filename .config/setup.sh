##!/usr/bin
#if using windows/putty, simply run cmd: 
#`plink root@wetbox -m setup.sh`
# enter password
# profit.

#add crontab
# `crontab -` means replace crontab with standard input.
echo "Writing cron entry (run php minutely.php every minute)..." 
#(crontab -l 2>/dev/null; echo "* * * * * php /volume1/Web/config/cron/minutly.php")
(crontab -l ; echo "* * * * * php /volume1/Web/.config/cron/minutly.php") | crontab -
echo "done!"

# install git 
# clone bare repo 
# add auto-deploy hook: bare/hooks/post-receive 
# chmod +x post-receive
# checkout working dir 

# create database user/pass 
# crontab -e 
# * * * * * php /volume1/Web/wetbox/minutly.php /volume1/Web/config/cron/minutly.php
# chmod 770 flat santa
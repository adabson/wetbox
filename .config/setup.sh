##!/usr/bin
echo "Writing cron entry (run php minutely.php every minute)..." 
CRONTAB="* * * * * php /volume1/Web/.config/cron/minutly.php"
if crontab -l | grep -q "$CRONTAB";
then
  echo 'Entry exists';
else
  #echo 'entry not exists';
  (crontab -l ; echo "* * * * * php /volume1/Web/.config/cron/minutly.php") | crontab -
fi
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
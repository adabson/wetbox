##!/usr/bin
CRONTAB="* * * * * php /volume1/Web/.config/cron/minutly.php"

# install git 
# clone bare repo 
# add auto-deploy hook: bare/hooks/post-receive 
# chmod +x post-receive
# checkout working dir 

# create database user/pass 
echo "Writing cron entry (run php minutely.php every minute)..." 
if crontab -l | grep -q "$CRONTAB";
then
  echo 'Entry exists';
else
  #echo 'entry not exists';
  (crontab -l ; echo "* * * * * php /volume1/Web/.config/cron/minutly.php") | crontab -
fi
echo "done!"
# chmod 770 flat santa
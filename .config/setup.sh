##!/usr/bin
# Requires git
CRONTAB="* * * * * php /volume1/Web/.config/cron/minutly.php"
BARE="/volume1/Public/wetbox.git"

# install git 
# clone bare repo 
# add auto-deploy hook: bare/hooks/post-receive 
# chmod +x post-receive
# checkout working dir

# Checkout bare to host repo on the server
echo "Checking out bare repo..."
if [ -d $BARE ]; 
then
   echo "  Bare $BARE exists."
else
  git clone --bare https://github.com/Onitz/wetbox.git $BARE
  echo "  Checked out bare git repo at $BARE"
fi

# Add auto-deploy hook to bare 


# Add the minutely cron entry
echo "Writing cron entry (run php minutely.php every minute)..." 
if crontab -l | grep -q "$CRONTAB";
then
  echo "  Cron entry exists";
else
  (crontab -l ; echo "* * * * * php /volume1/Web/.config/cron/minutly.php") | crontab -
  echo "  Wrote cron entry!"
fi
# chmod 770 flat santa
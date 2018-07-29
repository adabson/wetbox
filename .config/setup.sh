##!/usr/bin
# Requires git
CRONTAB="* * * * * php /volume1/Web/.config/cron/minutly.php"
BARE="/volume1/Public/wetbox.git"
POSTRECEIVEHOOK="/volume1/Public/wetbox.git/hooks/post-receive"


# install git 
# clone bare repo 
# add auto-deploy hook: bare/hooks/post-receive 
# chmod +x post-receive
# checkout working dir

# Checkout bare to host repo on the server 
echo "Checking out bare repo..."
if [ -d $BARE ]; 
then
   echo "  Bare exists."
else
  git clone --bare https://github.com/Onitz/wetbox.git $BARE
  echo "  Checked out bare git repo at $BARE"
fi

# Add auto-deploy hook to bare
echo "Adding auto-deploy hook to bare repo..."
if [ -f $POSTRECEIVEHOOK ]; 
then
   echo "  Hook exists."
else
  echo -e 'TARGET="/volume1/Web"
GIT_DIR="/volume1/Public/wetbox.git"
BRANCH="master"
while read oldrev newrev ref
do
  if [[ $ref = refs/heads/$BRANCH ]];
  then
    echo "Ref $ref received. Deploying ${BRANCH} branch to production..."
    git --work-tree=$TARGET --git-dir=$GIT_DIR checkout -f
  else
    echo "Ref $ref received. Doing nothing: only the ${BRANCH} branch may be deployed on this server."
  fi
done
' >> $POSTRECEIVEHOOK
  echo "  Added post-receive (auto-deploy) hook at $POSTRECEIVEHOOK"
fi

# Add the minutely cron entry
echo "Writing cron entry (run php minutely.php every minute)..." 
if crontab -l | grep -q "$CRONTAB";
then
  echo "  Cron entry exists.";
else
  (crontab -l ; echo "* * * * * php /volume1/Web/.config/cron/minutly.php") | crontab -
  echo "  Wrote cron entry!"
fi
# chmod 770 flat santa
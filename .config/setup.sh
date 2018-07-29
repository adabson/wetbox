#!/usr/bin
CRONTAB="* * * * * php /volume1/Web/.config/cron/minutly.php"
BARE="/volume1/Public/wetbox.git"
POSTRECEIVEHOOK="/volume1/Public/wetbox.git/hooks/post-receive"

# 1. Setup SQL

# 2. Verify git exists
git --version 2>&1 >/dev/null
GIT_IS_AVAILABLE=$?
if [ $GIT_IS_AVAILABLE -ne 0 ]; # -eq equal, -ne not equal
then
   echo "Please install git."
   exit 1
fi

# 3. Checkout bare to host repo on the server 
echo -e "\nChecking out bare repo..."
if [ -d $BARE ]; 
then
   echo "  Bare exists."
else
  git clone --bare https://github.com/Onitz/wetbox.git $BARE
  echo "  Checked out bare git repo at $BARE"
fi

# 4. Add auto-deploy hook to bare
echo -e "\nAdding auto-deploy hook to bare repo..."
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

# 5. Checkout working dir
echo -e "\nChecking out working dir repo..."
if [ -d "/volume1/Web/.git" ]; 
then
   echo "  Working dir exists."
else
  git clone /volume1/Public/wetbox.git /volume1/Web
  echo "  Checked out working dir repo at /volume1/Web"
fi

# 6. Add the minutely cron entry
echo -e "\nWriting cron entry (run php minutely.php every minute)..." 
if crontab -l | grep -q "$CRONTAB";
then
  echo "  Cron entry exists.";
else
  (crontab -l ; echo "* * * * * php /volume1/Web/.config/cron/minutly.php") | crontab -
  echo "  Wrote cron entry"
fi

# 7. Permit writing to flatfile db
echo -e "\nPermit writing to santa flatfile..." 
chmod 770 /volume1/Web/dabson.co/santa/phatFile.dat
echo "  Permitted santa."

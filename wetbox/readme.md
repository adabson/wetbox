### How to push to multiple git repos at once ###

In your .git/config...
```
[remote "origin"]
  url = git@github.com:Onitz/wetbox.git
  fetch = +refs/heads/*:refs/remotes/origin/*
  pushurl = git@github.com:Onitz/wetbox.git
  pushurl = ssh://admin@wetbox/share/Public/wetbox.git
```

### How to auto-deploy master branch ###
In your servers bare repo, wetbox.git/hooks/post-receive 
```
TARGET="/volume1/Web"
GIT_DIR="/volume1/Public/wetbox.git"
BRANCH="master"
while read oldrev newrev ref
do
  # only checking out the master (or whatever branch you would like to deploy)
  if [[ $ref = refs/heads/$BRANCH ]];
  then
    echo "Ref $ref received. Deploying ${BRANCH} branch to production..."
    git --work-tree=$TARGET --git-dir=$GIT_DIR checkout -f
  else
    echo "Ref $ref received. Doing nothing: only the ${BRANCH} branch may be deployed on this server."
  fi
done
```
you should be able test run the hook like a regular sh script, also ensure the right permissions are set via 

`chmod +x post-receive` 

Wow! Amaze 
### How to setup a git repo on the server ###
First setup 2 repos on the server: 
 * a bare (what we commit to) and..
 * a working copy (the actual checked out files on master branch, pulls from the bare)

(alternatively we can do `git init --bare` for a fresh new repo)

```
ssh admin@wetbox
cd /volume1/Public
git clone --bare https://github.com/Onitz/wetbox.git
cd /volume1
git clone Public/wetbox.git Web
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
you should be able test run the hook like a regular sh script `./post-receive`, also ensure the right permissions are set via 

`chmod +x post-receive` 

### How to push to multiple git repos at once ###
In your local working copy (the place you're pushing from, not the server one) .git/config...
```
[remote "origin"]
  url = git@github.com:Onitz/wetbox.git
  fetch = +refs/heads/*:refs/remotes/origin/*
  pushurl = git@github.com:Onitz/wetbox.git
  pushurl = ssh://admin@wetbox/share/Public/wetbox.git
```

To push seamlessly with no password prompt, add your machines public key to the servers authorized keys ie

Copy [local] `id_rsa.pub` to [wetbox] `~/.ssh/authorized_keys`
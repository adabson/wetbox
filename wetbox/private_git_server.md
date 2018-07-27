To host a git repo, go 
  cd share/Public/ 
  mkdir myrepo.git 
  cd myrepo.git
  git init --bare 
  (THE BARE FLAG IS IMPORTANT FOR HOSTING)
  ..now you can clone in this repo via 
  git clone ssh://admin@wetbox/share/Public/myrepo.git

To setup paswordless ssh, grab your public key, and go (assumes you already have a key setup on your client)
  cd ~ 
  mkdir .ssh
  cd .ssh
  vi authorized_keys 
  (paste your key here, save. This will allow sshing, git cloning + pushing without a password!) 

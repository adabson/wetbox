### How to push to multiple git repos at once ###

In your .git/config...
`
[remote "origin"]
  url = git@github.com:Onitz/wetbox.git
  fetch = +refs/heads/*:refs/remotes/origin/*
  pushurl = git@github.com:Onitz/wetbox.git
  pushurl = ssh://admin@wetbox/share/Public/wetbox.git
`

Wow! Amaze
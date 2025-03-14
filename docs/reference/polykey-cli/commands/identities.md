# `polykey identities`

## `allow`

1. Allows Permission to be set for identities
2. Takes nodeID or Gestalt ID as an parameter
3. Optional permission to set as a parameter

Usage:

```sh
> polykey identities allow v3usps342tkciga4emkgaac2jichbqs0dr3v0bav90d2dh1q2f1cg scan
```

## `authenticate`

Gestalt based command which authenticates a digital identity provider, i.e.
GitHub, Meta (Tentatively), X (Tentatively)

Usage:

```sh
polykey identities authenticate github.com

url             https://github.com/login/device
userCode        CC4C-F2A3
maverick
```

## `authenticated`

Lists all authenticated identities across all providers.

Usage:

```sh
polykey identities authenticated

providerId      github.com
identityId      maverick
```

## `claim`

Allows you to claim a digital identity for the currently active node. This
creates a gist on your github profile denoting the claim.

Usage:

```sh
polykey identities claim github.com:maverick

Claim Id: ebd6af3369f25d9c9c9bfa581f1da016
Url: https://gist.github.com/maverick/ebd6af3369f25d9c9c9bfa581f1da016
```

## `disallow`

Unsets provided permissions from a particular node ID or a gestalt ID
(providerID:Identity ID).

Usage:

```sh
polykey identities disallow v3usps342tkciga4emkgaac2jichbqs0dr3v0bav90d2dh1q2f1cg scan
```

## `discover`

Adds a node or gestalt pair to the discovery queue.

Usage:

```sh
polykey identities discover github.com:maverick
```

## `get`

Fetches gestalt with node or identity ID from the Gestalt Graph.

Usage:

```sh
polykey identities get github.com:maverick

v3usps342tkciga4emkgaac2jichbqs0dr3v0bav90d2dh1q2f1cg
github.com:maverick
```

## `invite`

Invites another node to the gestalt graph.

Usage:

```sh
polykey identities invite v3usps342tkciga4emkgaac2jichbqs0dr3v0bav90d2dh1q2f1cg

Successfully sent Gestalt Invite notification to node with ID v3usps342tkciga4emkgaac2jichbqs0dr3v0bav90d2dh1q2f1cg
```

## `list`

Lists all Gestalts in the Gestalt Graph

Usage:

```sh
polykey identities list

gestalt 1
permissions: claim
v3usps342tkciga4emkgaac2jichbqs0dr3v0bav90d2dh1q2f1cg
github.com:maverick
```

## `permissions`

Lists the permissions for current gestalt.

Usage:

```sh
polykey identities permissions github.com:maverick

permissions     ["claim"]
```

## `trust`

Enables the `notify` permission for a gestalt.

Usage:

```sh
$ polykey identities discover github.com:hangman
$ polykey identities trust github.com:hangman
$ polykey identities list

gestalt 1
permissions: notify
v60g23b4b9g5tq2npc3kpikpalqqdpuvocegdd8bsdj28a1hsp0g0
github.com:hangman

gestalt 2
permissions: claim
v3usps342tkciga4emkgaac2jichbqs0dr3v0bav90d2dh1q2f1cg
github.com:maverick
```

## `untrust`

Removes the `notify` permission from a gestalt.

Usage:

```sh
polykey identities untrust github.com:hangman
```

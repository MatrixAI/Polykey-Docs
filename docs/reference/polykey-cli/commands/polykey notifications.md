# `polykey notifications`

## `clear`

1. Clears all current notifications

Usage:

```shell
> polykey notifications read

data    {"message":"test","type":"General"}
iat     1701829974.516
isRead  true
iss     vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00
sub     v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0

> polykey notifications clear

> polykey notifications read
```

## `read`

1. Display all current notifications

Usage:

```shell
> polykey notifications read

data    {"message":"test","type":"General"}
iat     1701829974.516
isRead  true
iss     vctg4j8988mkobuvruaj2ijmij6jinvk8nf714f0s11kq3blc8g00
sub     v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0

```

## `send`

1. Send a notification to another nodeID
2. NodeID and message are parameters

Usage:

```shell
> polykey notifications send v2ki21482dokemqrrrc9e3oqr3s43nh3t92cbjua2vks3aopt1vr0 test
```

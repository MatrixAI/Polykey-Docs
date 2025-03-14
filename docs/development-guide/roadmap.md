# Roadmap

Polykey's roadmap revolves around Polykey's 2 core concepts:

- Secret Management Workflow
- Decentralized Trust

## Secret Management Workflow

- Gestalt Sync
- CQRS to GUI - end to end reactive architecture
- Schemas File/Vault - impacts GUI/CLI/Vault History.. etc
- Vault Automation
- Vault Splitting and Joining
- Vault History Management
- Enterprise Audit Logging
- Enterprise Policy Control with Signing Authenticity - ask enterprise PK node
  to sign actions to control what is allowed
- M1 Mac Compatibility
- Mobile Deployment
- OAuth2 Integration with token management for API clients
- CA to deal with PKI in general -
  https://en.wikipedia.org/wiki/Public_key_infrastructure
- Expose crypto utilities for general use - replacing PGP -
  https://news.ycombinator.com/item?id=6662798
- Notification Delay-Tolerant & Store and Forward Protocol - Integrate into SMTP
- Browser Extension - low priority because if PK sits in the middle between
  password management and machine secrets, then password management is well done
  by other companies and organisations, and this reduces the importance of GRPC
  web gateway

More usecases:

Make sure to classify by "local" to "global" spectrum. How significant is this
usecase in these dimensions?

- Market size - number of users
- Market size - average size of each user (in terms of financial impact)
- How easy it is to onboard, does it affect 1 person or the entire company. At
  what point is the scale-breakeven point? Is it too much overhead for 1 person
  but beneficial if there is an entire system built around it?
- Dedicated single computer usage of multiple computer usage?
- Is this a single-tool usecase or a multi-tool infrastructure usecase?

**Tooling**

- https://blog.cryptomove.com/secrets-management-guide-approaches-open-source-tools-commercial-products-challenges-db560fd0584d
- https://man7.org/linux/man-pages/man1/keyctl.1.html
- https://lock.cmpxchg8b.com/passmgrs.html
- https://square.github.io/keywhiz/
- https://geekflare.com/secret-management-software/

**Employees, BYOD, Device Provisioning**

- https://www.keepersecurity.com/assets/pdf/Keeper-White-Paper-How-to-Provision-Employees-in-a-BYOD-World.pdf
- https://news.ycombinator.com/item?id=22534520

**Developer Workflow**

- https://smallstep.com/blog/command-line-secrets/
- https://blog.gitguardian.com/secrets-api-management/
- https://stsewd.dev/posts/securing-your-dev-environment/

**DevOps and SSH and Configuration Management**

- https://goteleport.com/
- https://devopsbootcamp.osuosl.org/configuration-management.html
- https://www.xenonstack.com/insights/secret-management-kubernetes
- https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/
- https://learn.hashicorp.com/tutorials/vault/reference-architecture

**DevOps and Microservices**

- https://www.okta.com/resources/whitepaper/8-ways-to-secure-your-microservices-architecture/
- https://thenewstack.io/mutual-tls-microservices-encryption-for-service-mesh/
- https://en.wikipedia.org/wiki/Zero_trust_security_model
- https://smallstep.com/hello-mtls
- https://news.ycombinator.com/item?id=22024791
- https://upload.wikimedia.org/wikipedia/commons/f/f2/NSA_Muscular_Google_Cloud.jpg
- https://web.archive.org/web/20200507173734/https://latacora.micro.blog/a-childs-garden/
- https://news.ycombinator.com/item?id=28295348 &
  https://fly.io/blog/api-tokens-a-tedious-survey/

[[/images/nsa google cloud exploitation.webp]]

These things will need to be read by people writing usecases.

## Decentralized Trust

- RegTech and Decentralized Oracles - Use PK as your oracle for stock markets,
  tax offices, governments
- https://news.ycombinator.com/item?id=28537841
- Decentralized Social Media:
  [https://docs.deso.org/#what-are-social-tokens-aka-creator-coins](https://web.archive.org/web/20210921133943/https://docs.deso.org/)
  (the deso-protocol core is about 70k LOC of Go code)

Invitation codes from backchannel
https://www.inkandswitch.com/backchannel/#invitation-codes can be used in our
system for inviting to Polykey gestalt, or when sharing secrets directly via QR
codes.

---

Creating Dependency Diagrams:

```
arkit ./src -o ./media/dependencies.png
typedoc --media ./media
```

The `typedoc` enables the ability to embed media that will be rendered by
documentation. See: https://typedoc.org/guides/options/#media

In the comments we can write: `media://file.jpg`.

Also: https://typedoc.org/guides/options/#includes

This can be useful for showcasing benchmarks which are written with JSON or CSV
or HTML.

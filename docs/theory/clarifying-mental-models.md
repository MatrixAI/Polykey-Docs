# Clarifying Mental Models

You may be using Polykey to solve a practical problem, like managing secrets in
a CI/CD pipeline. But beneath that toolset lies a fundamental shift in how to
think about security and trust.

This shift is from a **Fortress Mentality** to a **Verifiable Ledger
Mentality**. The old world is about prevention: building walls to stop bad
things from happening. Our world is about proof: creating an indisputable,
portable, and settlement-grade record of what actually happened.

Because this approach creates a new category of infrastructure: **Receipt
Rails**, it's easy to miscast. You might ask: Is this just better logging? A
private blockchain? Another IAM tool? The answer is no.

This page is the bridge from the 'how' to the 'why'. It is a reference for both
the engineer wondering why we mint 'receipts' instead of logs, and the architect
evaluating the entire system. Use it to clear the common hurdles and understand
how we turn operational events into verifiable, economic assets.

## The Universal Hurdle: Prevention → Provability

The single most important shift to understand is moving from a **Fortress
Mentality** to a **Verifiable Ledger Mentality**. This isn't an upgrade; it's a
change in the fundamental physics of how you manage risk and create value.

- **The Fortress Mentality (The old world):** This worldview is about
  _prevention_. It asks, "How do I build walls to prevent bad things from
  happening?" Risk is managed by trying to achieve a perfect, static state of
  control. Its primary artifacts are firewalls, access policies, and siloed
  logs. In this model, security is an internal cost center.
- **The Verifiable Ledger Mentality (the new world):** This worldview is about
  **proof**. It assumes events—both good and bad—are inevitable and asks, "How
  do I create an indisputable, portable, and settlement-grade record of what
  actually happened?" Risk is managed by making the system transparent,
  auditable, and capable of rapid, fair settlement. In this model, security
  becomes an external revenue enabler.

This explains why we are obsessed with **Receipts**. A log entry is a passive
liability you store in case something goes wrong. A cryptographic receipt, like
a Proof-of-Action Receipt (PoAR), is an active **asset**. It is a
self-contained, verifiable, and portable piece of evidence designed to be
shared, insured, and settled upon. With this shift, your systems can stop being
a cost center for storing logs and start being a value creator that mints
tradable proof.

## Name the Category: Receipt Rails, Not Better Logging

Because the "Verifiable Ledger Mentality" is new, people will try to fit it into
old categories. The deepest challenge is that we are creating a new category:
**"Settlement-grade operational evidence,"** delivered via **Receipt Rails.**

If you mis-categorize the system, its value is obscured. Here are the most
common misfits:

- **"It's just better logging."** No. A log is a liability—data to be stored and
  searched reactively. A receipt is an asset—a cryptographic instrument designed
  to be proactively shared and settled. It has a defined lifecycle, value, and
  is understood by multiple parties.
- **"It's blockchain for enterprise."** No. This is not about consensus or a
  single global ledger. Receipts are generated at the edge, off-chain, and
  stored in per-identity ledgers (Sigchains). It is designed for performance and
  privacy, using optional hash-anchoring only when public timestamping is
  required.
- **"It's another IAM/audit tool."** No. It's the infrastructure that makes your
  IAM and audit systems interoperable and their outputs valuable. It doesn't
  replace your identity provider; it gives it a way to issue portable
  **Capabilities**. It doesn't replace your audit framework; it feeds it with
  verifiable proof that dramatically lowers your cost of compliance.

The core product of this new category is the **Verifiable Outcome Receipt
(VOR)** and its supporting artifacts. Think of it not as a tool you install, but
as a utility you connect to—a set of rails for moving verifiable truth between
organizations.

## Governance People Trust: The ATN, TAP, and RAM

Centralized systems feel safe because they offer a single "throat to choke." A
federated network can feel amorphous and risky. This is why our model is not
just a protocol; it's a governed ecosystem.

The core hurdle is overcoming the fear that decentralization means chaos. Our
answer is the **Accredited Trust Network (ATN)**, a framework that creates
resilience and accountability through three key instruments:

- **The ATN (Accredited Trust Network):** This isn't a free-for-all. It's a
  well-governed federation of participants who agree to operate by a shared set
  of rules. Think of it like the network of banks that agree to honor Visa
  transactions—they don't have a single central operator, but they have a shared
  standard that makes the whole system work.
- **The TAP (Threat & Acceptance Profile):** This is the **rulebook**. For any
  given use case (like DevOps or energy grid management), the TAP defines what
  constitutes a valid, secure, and acceptable receipt. It's the technical and
  operational standard that participants in that wedge agree to.
- **The RAM (Receipt Acceptance Memo):** This is the **social contract**. A RAM
  is a signed memo from a key Verifier (an insurer, auditor, or regulator)
  stating, "We will accept any receipt that conforms to TAP-01 as binding
  evidence for settling claims or satisfying compliance."

This model fundamentally changes the conversation. The question is no longer,
"Do I trust Polykey?" The question becomes, "Does this receipt conform to the
TAP that my insurer has already signed off on in a RAM?" It replaces vendor
trust with verifiable, contractual acceptance.

## Dual‑Plane Reality: Capabilities Govern Tokens

A common technical hurdle is the tension between cryptographic purity and
real-world practicality. Our architecture is explicitly dual-plane. We don't
fight this dualism; we govern it.

- **The Control Plane (The Authority Fabric):** This is the elegant, "vitamin"
  part of our system. It is **asymmetric and identity-bound.** It operates on
  **Capabilities**, granular, signed grants of authority that are presented with
  proof-of-possession. This is where identity, attenuation, and revocation live.
- **The Data Plane (The Secret Store):** This is the pragmatic, "painkiller"
  part of our system. It acknowledges that the world still runs on **symmetric,
  secret-bound authority** (bearer tokens, API keys). The Polykey Vault is
  designed to be best-in-class cold storage for these secrets.

The magic is how the control plane governs the data plane. An actor presents an
identity-bound **Capability** to a **Capability Enforcement Point (CEP)**. The
CEP verifies the capability and _then_ safely interacts with the secret-bound
world on the actor's behalf. It does this in one of three modes:

1.  **Mediate:** The CEP holds the secret and makes the API call for you. No
    secret is ever exposed.
2.  **Derive:** The CEP uses its master secret to create a short-lived,
    narrowly-scoped token for you.
3.  **Reveal:** In rare, break-glass scenarios, the CEP can reveal the raw
    secret, but this action creates an urgent, high-priority receipt for
    immediate audit.

This architecture allows you to get the security, audit, and portability
benefits of an identity-bound system while still safely interacting with every
secret-bound tool in your existing DevOps workflow.

## Compliance vs. Composability: "Who Says This Counts?"

A cryptographically perfect system is commercially useless if no one accepts its
outputs. The most critical hurdle is answering the skeptic who asks, "This is
all great theory, but who actually _says_ your receipts are valid? Does my
auditor, my insurer, or my lawyer care?"

Our system is designed to bridge the gap between what is technically possible
(**composability**) and what is commercially required (**compliance**). The
answer to "Who says this counts?" is never "Trust the math." It is, "The people
you already pay for compliance and risk transfer say it counts."

This is achieved through our go-to-market strategy, which is centered on the
**Receipt Acceptance Memo (RAM)**:

- **The Wedge Strategy:** We don't try to boil the ocean. We focus on a
  specific, high-value "wedge," like satisfying a particular SOC 2 control for
  DevOps workflows.
- **Acceptance Diplomacy:** We work with the key verifiers in that wedge—the
  auditors, the insurers—to co-author a **Threat & Acceptance Profile (TAP)**
  that defines exactly what a valid receipt needs to contain to serve as
  evidence for that control.
- **The RAM Flips the Market:** The final step is getting that verifier to sign
  a RAM. This memo makes acceptance explicit. It says, "We, the auditor, will
  accept any receipt conforming to this TAP as sufficient evidence for this
  control."

This approach fundamentally helps your organization. Instead of pushing a new,
unproven technology to a compliance department, the system arrives with
pre-approved acceptance from their own auditors. One RAM in one wedge creates
the beachhead that proves the economic and legal value of the entire system for
everyone involved.

You may be using Polykey to solve a practical problem, like managing secrets in
a CI/CD pipeline. But beneath that toolset lies a fundamental shift in how to
think about security and trust.

This shift is from a Fortress Mentality to a Verifiable Ledger Mentality. The
old world is about prevention: building walls to stop bad things from happening.
This model is about proof: creating an indisputable, portable, and
settlement-grade record of what actually happened.

Because this approach creates a new category of infrastructure: Receipt Rails.
It's easy to miscast it. You might ask: Is this just better logging? A private
blockchain? Another IAM tool? The answer is no.

This page is the bridge from the 'how' to the 'why'. It is a reference for both
the engineer wondering why we mint 'receipts' instead of logs, and the architect
evaluating the entire system. Use it to clear the common hurdles and understand
how we turn operational events into verifiable, economic assets.

## Value by Role: Show Me, Don’t Tell Me

The grand narrative is powerful, but you will likely adopt this system because
it solves an immediate, painful problem. The key is to translate the abstract
benefits of provability into concrete value for each stakeholder in your
organization.

- **For Developers & DevOps: The "Friction vs. Reward" Hurdle** **Their
  Default:** _"This sounds complicated. A JWT and a log entry is faster."_ **The
  Value:** The immediate entry point is the **Polykey Vault**. It solves the
  practical, painful problem of secret management more securely and efficiently
  than ad-hoc workflows. This provides the "painkiller" first; the powerful
  benefits of verifiable receipts become a seamless byproduct of solving a
  problem you already have.
- **For CISOs & Compliance: The "Checklist vs. Reality" Hurdle** **Their
  Default:** _"This isn't on my SOC 2 checklist. My auditor has never heard of a
  VOR."_ **The Value:** The **Receipt Acceptance Memo (RAM)** is the answer for
  your compliance teams. It bridges the gap between this advanced system and
  legacy frameworks by providing pre-negotiated, signed approval from auditors,
  stating that these receipts are an acceptable form of evidence.
- **For Insurers & Auditors: The "Actuarial vs. Evidentiary" Hurdle** **Their
  Default:** _"Our models are based on statistical losses. We don't know how to
  price a cryptographic receipt."_ **The Value:** For the verifiers in your
  ecosystem, the value is a measurable reduction in their single biggest cost:
  dispute resolution and fraud investigation. Receipts provide a stronger,
  cheaper, and faster way to verify what happened, directly impacting their loss
  adjustment expenses.
- **For Legal & Finance: The "Admissibility vs. Settlement" Hurdle** **Their
  Default:** _"How does this map to traditional evidence rules and contract
  enforcement?"_ **The Value:** A simple analogy is powerful for your legal
  teams. A cryptographic receipt is like a notarized document, but the "notary"
  is mathematics. It provides a cryptographically assured chain of custody that
  is stronger, and therefore more admissible, than many traditional methods.

## Privacy Without Surveillance

A system that creates a verifiable record of every important action can be
misconstrued as a surveillance tool. This is a fundamental misreading of the
architecture, which is designed for **proof with privacy**. The goal is to give
you, the data owner, granular control over who sees what, when, and why.

- **"This centralizes all our logs."** No. The system is federated by design.
  Receipts are written to **per-identity ledgers (Sigchains)**, not a single,
  monolithic database. There is no central aggregator with a god's-eye view.
  Data is replicated selectively based on rules you help define in the TAP.
- **"This is going to leak PII."** No. The protocol is designed to separate
  claims from evidence. Receipts can make verifiable claims (e.g., "this user is
  over 21") without revealing the underlying PII (their date of birth). Evidence
  can be encrypted, redacted, and selectively disclosed using **ViewReceipts**,
  ensuring a verifier only gets the minimum information necessary.

The governing principle is simple: the system is built to prove facts, not to
expose your data.

## FAQ: The Usual Misframings

- **“This is just blockchain.”** No. It is an edge-native, off-chain system.
  Receipts are generated and stored on per-identity ledgers without requiring a
  distributed consensus mechanism. It is built for performance and privacy, with
  optional hash anchors to a public chain only for specific timestamping use
  cases.
- **“This replaces our IAM.”** No. It makes your existing IAM/OPA systems
  interoperable and their outputs far more valuable. It consumes the identity
  from your provider to issue portable **Capabilities** that can cross trust
  boundaries, and then it generates the **Receipts** that prove how that
  identity was used.
- **“This is too complex for our critical OT/industrial systems.”** This isn't
  about replacing deterministic PLC logic. It's about adding a "receipt printer"
  to it. It provides a simple, reliable way to prove that a critical action
  (like a demand response event) actually happened, so you or your partners can
  get paid or satisfy compliance faster and with less dispute.

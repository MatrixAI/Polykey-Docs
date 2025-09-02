# Receipt Rails Operational Flow

This document outlines the fundamental operational flow of the Polykey
ecosystem, which we call the Receipt Rails. It illustrates the complete
lifecycle of a verifiable event, from the initial grant of authority to the
final acceptance of a cryptographic receipt by a third party.

The core principle of the Receipt Rails is to create a standardized, secure, and
auditable process for proving that a specific action was performed or a specific
outcome was achieved. This is accomplished through a sequence of interactions
between four key actors: the Principal (who grants authority), the Subject (who
performs the action), the Resource (the target of the action), and the Verifier
(who accepts the proof).

Below are two diagrams. The first provides a high-level, summary view of the
entire flow. The second diagram is a detailed, technical zoom-in on the most
critical and complex step: the Enforcement of a capability. Understanding both
is key to grasping the full power and flexibility of the system.

## Core Operational Flow (Summary View)

This diagram shows the end-to-end lifecycle. It begins with a Principal issuing
a Grant, which authorizes a Subject to perform an action. The Subject then
presents this authority to an Enforcement Point, which results in the minting of
verifiable receipts. These receipts are then assembled into a View for a
Verifier, who can accept them for settlement, compliance, or payment.

```mermaid
---
title: The Receipt Rails - Core Operational Flow
config:
  theme: redux-color
---
sequenceDiagram
  participant P as Principal (P)<br>- Sigchain (P)<br>- Vault (leases/policy)
  participant S as Subject (S)<br>- Sigchain (S)
  participant R as Resource / ToA / SoA<br>(e.g., API, Power Grid, Door Lock)
  participant V as Verifier / Auditor / Escrow<br>(TAP/RAM acceptance)

  autonumber
  Note over P: Issue Grant G<br>[write G to P’s Sigchain]
  P ->> S: notify/ref (push or pull) for G

  rect rgba(0,0,0,0.04)
    note left of P: Enforcement Variants
    alt Principal-side CEP (placement=P, bridging=true) [PS-BA]
      S ->> P: Present capability (Presentation)
      Note over P: Enforce at P CEP (mediate / derive / reveal)<br>Write Access PoAR on P's sigchain<br>Deliver PoAR to S
    else Resource-side CEP (placement=R, bridging=false) [native]
      S ->> R: Present capability (Presentation)
      Note over S,R: Enforce at Resource CEP<br>Write Access PoAR on R's sigchain<br>Deliver PoAR to S
    else Subject-side CEP (placement=S, bridging=false) [SSA wallet/session]
      S ->> S: Present capability (internal Presentation)
      S ->> S: Derive short-scope token
      S ->> R: ToA API call (using token)
      Note over S: Write Access PoAR on S's sigchain
    else Subject-side CEP (placement=S, bridging=true) [SS-BA, rare]
      S ->> S: Present capability (internal Presentation)
      S ->> S: Derive or reveal using S-owned lease
      S ->> R: ToA API call
      Note over S: Write Access PoAR on S's sigchain
    end
  end

  opt UseReceipt (optional, TAP may require)
    S ->> S: Write UseReceipt (ref G & PoAR P)
  end

  opt Outcome measurable
    Note over S,R: Measuring agent writes VOR where observed
    alt Subject-side measurer
        S ->> S: Write VOR
    else Resource-native measurer
        R ->> R: Write VOR
    end
  end

  par Either P or S assembles View
    P ->> V: ViewReceipt {G, PoAR, Use?, VOR?} (with lens & tapProfile)
    S ->> V: ViewReceipt {G, PoAR, Use?, VOR?} (with lens & tapProfile)
  end

  V ->> V: Accept/Settle (per TAP/RAM)
  Note right of V: Accept / Pay / Comply

  Note over P,S: Storage/Durability:<br>- Hot: recent envelopes + index<br>- Seal: Merkle segments + SegmentReceipt<br>- Cold: Custody (S3/MinIO/IPFS, E2E enc)<br>- Escrow: PinningReceipt<br>- Anchors: AnchorReceipt (hash-only)
```

### How to Read This Diagram

- Participants:
  - P (Principal): The entity granting authority (e.g., a DevOps lead, a
    homeowner).
  - S (Subject): The entity performing the action (e.g., a CI/CD runner, a smart
    lock app).
  - R (Resource): The target of the action (e.g., a Kubernetes API, a Power
    Grid, a Door Lock).
  - V (Verifier): The entity that needs proof (e.g., an Auditor, an Insurer, an
    Escrow agent).
- The Happy Path: The numbered steps show the ideal flow from Issue Grant G to
  Accept/Settle.
- Enforcement Variants (The `alt` block): This block is a high-level summary of
  the four ways that authority can be enforced, depending on where the
  "gatekeeper" (the CEP) is located. This is the most complex part of the
  system, and it is expanded in full detail in the second diagram.
- Receipts (`opt` blocks): The flow generates several types of receipts. The
  Access PoAR (Proof of Action) is the primary receipt proving the action was
  authorized. The UseReceipt is an optional acknowledgment from the Subject, and
  the VOR (Verifiable Outcome Receipt) is a separate proof of the result.
- Durability (Bottom Note): This note shows the layered approach to storage,
  ensuring receipts are both readily available ("Hot") and securely archived for
  the long term ("Cold"), with options for independent verification
  ("Escrow/Anchors").

## Enforcement Variants - Detailed View

This diagram is a detailed zoom-in of the "Enforcement Variants" block from the
first diagram. It shows the precise mechanics of how a capability is verified
and enforced in each of the four possible architectural patterns. The choice of
pattern depends on whether the Resource is a modern, PK-native system or a
legacy one, and on the security requirements of the transaction.

```mermaid
---
title: Enforcement Variants - Detailed View of CEP Placements and Modes
config:
  theme: redux-color
---
sequenceDiagram
  participant P as Principal (P)<br>- Sigchain (P)<br>- Vault (leases/policy)
  participant S as Subject (S)<br>- Sigchain (S)
  participant R as Resource / ToA / SoA<br>(e.g., API, Power Grid, Door Lock)
  participant V as Verifier / Auditor / Escrow<br>(TAP/RAM acceptance)

  autonumber

  alt Principal-side CEP (placement=P, bridging=true) [PS-BA]
    Note over P: If P and R are the same trust boundary<br>this is effectively native (colocated)<br>bridging=false, PoAR still on P's sigchain
    S ->> P: Present capability (Presentation)
    break Verification fails at P
      Note over P: Deny path<br>Mint DenyReceipt with reason code<br>(binding_mismatch, lease_stale, surface_violation, rate_limit)
      Note over P: Write DenyReceipt on P's sigchain
      P ->> S: Deliver DenyReceipt
    end
    alt Mediate at P
      Note over P: Verify Presentation + Bind + fresh LeaseRef<br>Record requestDigest vs Allowed-Surface
      P ->> R: ToA API call
      R -->> P: Result
      P -->> S: Result (if requester expects data)
    else Derive at P
      Note over P: Verify Presentation + Bind + fresh LeaseRef
      P ->> S: Short-scope token (session-bound)
      S ->> R: ToA API call (using token)
      R -->> S: Result
    else Reveal at P (last resort)
      Note over P: Break-glass<br>dual-control, tiny ttl/scope, audit correlation, immediate revoke
      P ->> S: Raw secret
      S ->> R: ToA API call (bearer)
      R -->> S: Result
    end
    Note over P: Write Access PoAR on P's sigchain<br>exposureMode = mediate/derive/reveal
    P ->> S: Deliver PoAR

  else Resource-side CEP (placement=R, bridging=false) [native]
    S ->> R: Present capability (Presentation)
    break Verification fails at R
      Note over R: Deny path<br>Mint DenyReceipt with reason code<br>(binding_mismatch, lease_stale, surface_violation, rate_limit)
      Note over R: Write DenyReceipt on R's sigchain
      R ->> S: Deliver DenyReceipt
    end
    Note over R: Enforce at Resource CEP
    R -->> S: Result (if requester expects data)
    Note over R: Write Access PoAR on R's sigchain
    R ->> S: Deliver PoAR

  else Subject-side CEP (placement=S, bridging=false) [SSA wallet/session]
    Note over S: S does not hold long-lived upstream lease.
    S ->> S: Present capability (internal Presentation)
    break Verification fails at S
      Note over S: Deny path<br>Mint DenyReceipt with reason code<br>(binding_mismatch, lease_stale, surface_violation, rate_limit)
      Note over S: Write DenyReceipt on S's sigchain
      %% Optional notify P for audit
      S -->> P: Notify DenyReceipt (policy-dependent)
    end
    S ->> S: Derive short-scope token (federated/workload identity)
    S ->> R: ToA API call (using token)
    R -->> S: Result
    Note over S: Write Access PoAR on S's sigchain

  else Subject-side CEP (placement=S, bridging=true) [SS-BA, rare]
    S ->> S: Present capability (internal Presentation)
    break Verification fails at S
      Note over S: Deny path<br>Mint DenyReceipt with reason code<br>(binding_mismatch, lease_stale, surface_violation, rate_limit)
      Note over S: Write DenyReceipt on S's sigchain
      %% Optional notify P for audit
      S -->> P: Notify DenyReceipt (policy-dependent)
    end
    alt Mediate at S (no token egress)
      Note over S: Mediate only when S wants to ensure that no token ever leaves the CEP
      S ->> R: ToA API call using S-held lease (or short-scope token retained at S)
      R -->> S: Result
    else Derive at S (preferred)
      S ->> S: Derive short-scope token from S-held lease
      S ->> R: ToA API call (using token)
      R -->> S: Result
    else Reveal at S (last resort)
      Note over S: Break-glass only when S owns upstream<br>tiny ttl/scope, dual-control, audit correlation, immediate revoke
      S ->> S: Reveal raw secret to caller
      S ->> R: ToA API call (bearer)
      R -->> S: Result
    end
    Note over S: Write Access PoAR on S's sigchain
  end
```

### How to Read This Diagram

- The Four Variants (`alt` blocks):
  - Principal-side CEP [PS-BA]: This is the default pattern for bridging to
    legacy systems. The Principal's agent acts as a secure "butler" (a Bridge
    Adapter), holding the master key and interacting with the legacy Resource on
    the Subject's behalf. It details the three modes: Mediate, Derive, and
    Reveal.
  - Resource-side CEP [native]: This is the ideal, end-state pattern for modern,
    PK-native systems. The Resource itself has a built-in enforcement point. It
    can verify the Subject's capability directly, without an intermediary.
  - Subject-side CEP [SSA wallet/session]: This pattern is for federated
    identity scenarios. The Subject's agent uses its own strong identity (e.g.,
    a cloud workload identity) to Derive a temporary credential directly from
    the Resource.
  - Subject-side CEP [SS-BA, rare]: This is a rare pattern used only when the
    Subject itself owns the master key to a legacy system it needs to bridge.
- The Deny Path (`break` blocks): Each variant includes an explicit flow for
  what happens when verification fails. The enforcing CEP mints a DenyReceipt
  with a reason code, providing a verifiable audit trail of failed attempts.
- PoAR Provenance: Crucially, this diagram shows who mints the Access PoAR in
  each case. The rule is simple: the enforcer mints the proof. This means the
  PoAR is written to the sigchain of P, R, or S, depending on the variant used.
  This is fundamental to the system's distributed and verifiable nature.

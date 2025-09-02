# Trust Operating System

In today's interconnected world, trust is fracturing. Opaque, centralized
systems are struggling to keep pace with the complexity of global trade, AI
agency, and the need for digital sovereignty. A new foundation is needed.

Polykey is building the open, interoperable infrastructure that allows diverse,
sovereign actors to transact with cryptographic certainty. We turn real-world
actions into settlement-grade receipts, enabling a new era of secure, efficient,
and trustworthy collaboration. We believe the future is not about closed,
competing stacks, but about shared, open protocols that create value for
everyone.

## Ecosystem Flywheel Map

This single diagram provides the complete, top-level map of Polykey's ecosystem
virtuous cycle, showing how each layer and component logically enables the next,
from the deepest "why" to the most practical "where."

```mermaid
---
title: "Polykey Ecosystem Flywheel Map: From Verifiable Security to a Verifiable Economy"
config:
  layout: elk
  htmlLabels: true
---
flowchart TB
  subgraph GRN["<span style='white-space: nowrap'>THE GRAND NARRATIVE (The 'Why')</span>"]
    GRN1["Trust Operating System:<br>From Sovereign Stacks to The Interoperability Regime (Federated Model)"]
    GRN2["Our Mission: Build the 'Receipt Rails' - a neutral, verifiable utility for the cyber-physical economy."]
  end
  subgraph AF["<span style='white-space: nowrap'>THE ACCEPTANCE FRAMEWORK (The 'So What?')</span>"]
    direction LR
    TAP["TAP (Threat & Acceptance Policy)<br> - The Rulebook"]
    RAM["RAM <br>(Receipt Acceptance Memo)<br> - The Social Contract"]
    ATN["Accredited Trust Network (ATN)<br>- The Governance Body"]
  end
  subgraph RE["<span style='white-space: nowrap'>THE RECEIPT ENGINE (The 'What')</span>"]
    direction LR
    PoAR["PoAR (Proof of Action)"]
    VOR["VOR (Verifiable Outcome Record)"]
    ViewRec["ViewReceipt & E-Pack<br>(Settlement-Grade Evidence)"]
  end
  subgraph AFAB["<span style='white-space: nowrap'>THE AUTHORITY FABRIC (The 'How')</span>"]
    direction LR
    Ident["Identity (Gestalts)"]
    Capab["Capabilities<br>(Identity- & Secret-Bound)"]
    Sigchain["Sigchain (The Verifiable Ledger)"]
  end
  subgraph RW["<span style='white-space: nowrap'>THE REAL WORLD (The 'Where' - Wedges & Primitives)</span>"]
    direction LR
    Polykey["The Polykey Vault<br>(Cold Storage for Authority Assets)"]
    CEP["The CEP / Bridge Adapter<br>(The Enforcement Point / The Legacy Bridge)"]
    Wedge["The Wedge Portfolio<br>(DevOps, Identity, Energy, Supply Chain, etc.)"]
  end
  TAP --> RAM
  RAM --> ATN
  PoAR --> VOR
  VOR --> ViewRec
  Ident --> Capab
  Capab --> Sigchain
  Polykey --> CEP
  CEP --> Wedge
  GRN -- Informs & Justifies --> AF
  AF -- Governs & Validates --> RE
  RE -- Is Enabled By & Built On --> AFAB
  AFAB -- Manages & Secures --> RW
```

### How to Read This Diagram

1. **The Grand Narrative (Top):** This is the mission. It's the big story about
   the global shift towards a new way of organizing trust.
2. **The Acceptance Framework (Layer 2):** This is the crucial socio-technical
   layer that translates the vision into something the real world can accept.
   The TAP is a set of rules, the RAM is the proof that powerful entities
   (insurers, regulators) agree to the rules, and the ATN is the resulting
   network of trusted actors.
3. **The Receipt Engine (Layer 3):** This is the core "product" of the system.
   It's the engine that runs on the authority fabric to produce the valuable
   artifacts (PoARs, VORs, and ViewReceipts) that are governed by the Acceptance
   Framework.
4. **The Authority Fabric (Layer 4):** This is the foundational technology, the
   "how." It's the deep, non-consensus innovation of Polykey: the combination of
   sovereign Identity, a rich Capability model, and the immutable Sigchain
   ledger.
5. **The Real World (Bottom):** This is where the rubber meets the road.
   - The **Polykey Vault** is the essential primitive for securely storing the
     "cold" assets of the Authority Fabric.
   - The **CEP / Bridge Adapter** is the enforcement point that connects the
     Authority Fabric to the real world, allowing it to mint receipts.
   - The **Wedge Portfolio** is the strategic application of this entire stack
     to solve specific, high-value problems in the market.

### The Flywheel Effect

- Success in the Wedges proves the value of the entire stack.
- This drives adoption of the Primitives (Vaults, CEPs).
- Which generates more activity in the Authority Fabric and the Receipt Engine.
- Which creates more demand for a robust Acceptance Framework (more TAPs and
  RAMs).
- Which, in turn, validates and strengthens the Grand Narrative, attracting more
  partners and capital to launch new Wedges.

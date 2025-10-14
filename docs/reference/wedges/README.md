# Wedge Portfolio

Trust Graphs

Multiplayer Utility - the layer 5 software-system.

> The Artifact is Everything: The core gap in the market is not another
> dashboard or security agent. The gap is the lack of signed, time-anchored,
> portable, and settlement-grade receipts. Your competitors are building USB
> agents, but they are still thinking in terms of "logs," not "evidence." This
> is your key differentiator. The Wedge is Real and It's Top-Down: Your initial
> intuition was right, but your time at SEMICON and analyzing the OT landscape
> has confirmed a critical detail: the adoption of "Receipt Rails" in high-value
> industrial sectors will be driven top-down by compliance and standards, not
> bottom-up by individual developers. The key is to align with emerging
> standards like ISA/IEC 62443 and SEMI E187/E188 and sell to the Tier-1 fabs,
> OSATs, and utilities who are forced to comply. The "singleplayer utility" is
> selling them a tool that makes this compliance auditable and less painful.

- Blockchain Wallet Reputation
- Email Sender Reputation
- Sayari Supply Chain Trust
- DevOps Authority Tracing

- Energy DR/curtailment
  - Verifier: utility/auditor/insurer
  - Value: kW×Δt “receipts” → faster payouts, lower disputes
  - T1R: 4–8 weeks (site + meter/EMS hookup)
- Fisheries/cold-chain
  - Verifier: export compliance, buyer’s QA, insurer
  - Value: catch + temperature receipts → export finance, fewer chargebacks
  - T1R: 6–10 weeks (boat + sensor pack + buyer)
- Disaster logistics corridors (UAV/USV + mesh)
  - Verifier: NGO/agency auditors
  - Value: movement/hand-off receipts → audit time −50%
  - T1R: 4–8 weeks (pilot corridor + NGO)
- Informal delivery fleets (motorbike)
  - Verifier: micro-insurer/financier
  - Value: delivery/outcome receipts → eligibility for insurance/credit
  - T1R: 4–6 weeks (fleet partner + phone app)
- Reverse logistics (RMA)
  - Verifier: finance/audit/ERP; sustainability reporting
  - Value: RMA state-machine “receipts rail” → refunds/chargebacks clarity,
    refurb analytics
  - T1R: 4–8 weeks (one brand + 3PL)
- Internal HR compliance (Fair Work–style dispute trail)
  - Verifier: regulator/tribunal; corporate audit
  - Value: standardized settlement-grade artifacts for legal discovery → faster
    resolution -> prevents "lack of documentation" - because process is
    admin-heavy
  - T1R: 4–6 weeks (one HR/legal team)

---

DevOps authority tracking - this is like SSO (and that user onramp/offramp)
extended to the entire devops enterprise resources

I need a way to "write down" or audit log a change to authority.

I just changed my GitHub CI/CD NIXPKGS_PRIVATE_PAT to a new one.

Why?

Because after offboarding an employee, it turns out that while she was
responsible for setting up infrastructure, she had injected her own PAT there.
And it worke while her account was active.

After offboarding her accounts, the CI/CD failed. It failed (late) rather than
(early) because we don't early warning that a particular token that is used
somewhere is now invalid because of a state change somewhere else (this the
action at a distance problem, or cache-coherency/state-sync/foreign-key
integrity problem applied to configuration/and secrets).

To fix this, I generated a new token - but I had to:

1. Figure why it was failing?
2. Trace to the root cause that was due to an invalid token.
3. Backtrack through business-tacit-knowledge realising that she was responsible
   for this technology domain, and therefore maybe it was her token.
4. Figure out how to "recreate" this token - because it's not 100% clear what
   exactly this token was capable of.
5. Inferring from the name, it's a token designed to access only a single
   repository with read-only permissions of the contents.
6. Therefore, replacing it with a token that has that exact authority - but
   under a new more durable principal rather than any single user's account.
7. But now we have a repeat problem. The point problem is fixed, but a long term
   problem remains. There is no audit log, and this problem can happen again.
   The token will expire eventually and we will have this problem again.

An audit log is not enough. I could write it into a log. But it's not
composable, not automated, not open. It's not "connected" the Source of
Authority, the User of Authority and Target of Authority.

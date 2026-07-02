# Architecture Decision Records (ADR)

This directory contains all Architecture Decision Records (ADRs) for the Sports Venue Management System (SVMS).

An ADR documents a significant architectural or product decision, including why it was made, the alternatives that were considered, and the expected consequences.

Rather than relying on memory or chat history, ADRs provide a permanent record of important decisions throughout the project's lifetime.

---

# Purpose

The goals of ADRs are to:

- Record important architectural decisions.
- Explain why a decision was made.
- Document rejected alternatives.
- Preserve historical context.
- Help future contributors understand the system.
- Prevent repeating the same discussions.

---

# When to Create an ADR

Create an ADR whenever a decision will have a long-term impact on the system.

Examples include:

- Domain model
- Database architecture
- Authentication strategy
- Authorization model
- Multi-tenancy approach
- Payment architecture
- Booking lifecycle
- Notification architecture
- Deployment strategy
- API versioning
- Technology selection
- AI architecture

As a general rule:

> If changing the decision later would require modifying many parts of the system, it deserves an ADR.

---

# ADR Naming Convention

Each ADR should use the following filename format:

```
ADR-001-short-title.md
ADR-002-short-title.md
ADR-003-short-title.md
```

Examples:

```
ADR-001-business-centric-domain-model.md
ADR-002-role-permission-model.md
ADR-003-booking-state-machine.md
ADR-004-subscription-lifecycle.md
```

Numbers are assigned sequentially and should never be reused.

---

# ADR Template

Every ADR should contain these sections:

```text
Status
Date
Context
Decision
Design Principles
Consequences
Trade-offs
Alternatives Considered
Rationale
Impact
```

Additional sections may be added when necessary.

---

# ADR Lifecycle

Each ADR has one of the following statuses:

| Status | Meaning |
|---------|---------|
| Proposed | Under discussion |
| Accepted | Official project decision |
| Superseded | Replaced by a newer ADR |
| Deprecated | No longer recommended |

---

# Updating Decisions

Accepted ADRs should not be rewritten to match new decisions.

Instead:

1. Create a new ADR.
2. Explain why the previous decision changed.
3. Mark the previous ADR as **Superseded** if appropriate.

This preserves the history of architectural decisions.

---

# Relationship to Other Documents

ADRs explain **why** a decision exists.

They do **not** replace:

| Document | Purpose |
|----------|---------|
| Product Vision | Product direction |
| Company Constitution | Company principles |
| Business Flow | How the business operates |
| User Flow | How users interact with the product |
| ERD | Database structure |
| API Specification | API contracts |
| Technical Specification | Implementation details |

Together, these documents form the project's documentation system.

---

# Current ADRs

| ADR | Description | Status |
|------|-------------|--------|
| ADR-001 | Business-Centric Domain Model | Accepted |

---

# Guiding Principle

ADRs exist to explain **why**, not **how**.

Implementation details belong in technical documentation.

Architectural decisions belong here.
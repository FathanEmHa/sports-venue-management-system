# ADR-001: Adopt a Business-Centric Domain Model

**Status:** Accepted

**Date:** 2026-06-30

---

# Context

SVMS is designed as a long-term platform for managing sports venue businesses.

The platform is expected to evolve beyond a single venue into supporting:

* Multiple venues
* Multiple courts
* Multiple staff members
* Role-based permissions
* Business subscriptions
* Multi-branch operations
* Business analytics

A key architectural decision was required to determine the primary domain entity of the platform.

The options considered were:

* User-centric model
* Business-centric model
* Organization-centric model

---

# Decision

SVMS adopts a **Business-Centric Domain Model**.

The **Business** is the primary business entity within the platform.

Every business asset belongs to a Business.

Users interact with the platform through **User Accounts** and participate in one or more Businesses as **Business Members**.

Business roles (e.g. Business Owner, Operations Manager, Finance, Staff) are assigned within the context of a Business.

The first user who creates a Business is automatically assigned the **Business Owner** role.

---

# Domain Model

```text
User Account
        │
        ▼
Business
        │
        ├── Members
        ├── Subscription
        ├── Venues
        │      └── Courts
        ├── Customers
        ├── Bookings
        ├── Payments
        ├── Reviews
        └── Analytics
```

---

# Design Principles

This decision establishes the following principles:

* Business is the primary business entity.
* User Account is only an identity used for authentication.
* Roles belong to Business Memberships, not User Accounts.
* Every Business owns its operational data.
* Every Business can operate independently.
* A User Account may belong to multiple Businesses.

---

# Consequences

## Positive

* Supports multiple venues under one Business.
* Supports multiple staff members.
* Enables role-based permissions.
* Business data remains independent from individual users.
* Simplifies subscription ownership.
* Simplifies analytics aggregation.
* Supports future multi-branch expansion.
* Aligns with the long-term company vision of building an Operating System for Service Businesses.

---

## Trade-offs

* Requires a Membership model.
* Requires invitation workflows.
* Authorization becomes more complex.
* More entities are introduced during early development.
* Initial onboarding becomes slightly more complex.

These trade-offs are accepted because they provide a more scalable domain model.

---

# Alternatives Considered

## User-Centric Model

```
User
    └── Venue
```

### Rejected

Business assets become tightly coupled to a single individual.

Supporting multiple staff members, ownership transfer, or multi-user collaboration would require significant architectural changes.

---

## Organization-Centric Model

```
User
    └── Organization
            └── Venue
```

### Rejected

Technically valid and highly scalable.

However, the term **Organization** is considered less intuitive for the primary target audience of sports venue businesses.

The concept is preserved internally through the Business entity.

---

# Rationale

The platform is intended to become the operating platform for sports venue businesses rather than a personal management tool.

Centering the domain around Businesses better reflects how real-world businesses operate.

This decision also provides a strong foundation for future capabilities including:

* Multi-branch management
* Staff management
* Business analytics
* Subscription management
* AI-powered business operations

without requiring fundamental changes to the domain model.

---

# Impact

This decision affects:

* Business Flows
* User Flows
* Role & Permission Design
* Database Schema
* API Design
* Authorization Model
* Subscription Model
* Analytics Model
* Future Product Expansion

All future architectural decisions should remain consistent with this ADR unless a new ADR explicitly supersedes it.

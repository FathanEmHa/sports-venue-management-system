# Subscription Business Flow

> Sports Venue Management System (SVMS)

---

# Purpose

This document describes how a Business subscribes to SVMS and how its subscription lifecycle governs access to platform capabilities.

Unlike Booking or Payment, Subscription is not part of daily business operations. Instead, it defines the commercial relationship between a Business and the SVMS platform.

---

# Business Goal

The goal of the Subscription domain is to:

- Allow Businesses to evaluate SVMS through a Free Trial.
- Provide access to platform capabilities based on the selected subscription plan.
- Ensure subscription changes do not affect historical business data.
- Support long-term recurring revenue for SVMS.

At the end of this process:

- Every Business has a subscription state.
- Feature availability matches the active subscription.
- Subscription history is preserved.

---

# Subscription Definition

A Subscription represents the commercial agreement between a Business and SVMS.

Each Business owns exactly one active Subscription at any given time.

Subscription determines which platform capabilities the Business may use.

It does not own operational data such as Venues, Bookings, Payments, or Customers.

---

# Primary Participant

## Business

The Business selects, upgrades, downgrades, renews, or cancels its subscription.

Only authorized Business Members may perform subscription management activities.

Typically:

- Business Owner

Future versions may allow delegated billing permissions.

---

# Supporting Participant

## SVMS Platform

Responsible for:

- Managing subscription lifecycle
- Starting Free Trial
- Enabling platform capabilities
- Restricting unavailable capabilities
- Recording subscription history
- Processing subscription state changes

---

# Preconditions

Before Subscription begins:

- Business Onboarding has been completed.
- The Business is operational and ready to receive bookings.

---

# Relationship to Business

Subscription belongs to the Business.

```text
Business
        │
        ├── Subscription
        │       │
        │       └── Feature Access
        │
        ├── Venues
        ├── Bookings
        ├── Payments
        ├── Reviews
        └── Analytics
```

Subscription controls platform capabilities.

It does not own business data.

---

# High-Level Business Flow

```text
Business Ready
        │
        ▼
Free Trial Starts
        │
        ▼
Business Uses SVMS
        │
        ▼
Trial Ends
        │
        ▼
Choose Subscription Plan
        │
        ▼
Subscription Active
        │
        ├──────────────┐
        ▼              ▼
Upgrade         Downgrade
        │              │
        └──────┬───────┘
               ▼
        Continue Using SVMS
```

---

# Subscription Lifecycle

```text
Trial
    │
    ▼
Active
    │
    ├───────────────┐
    ▼               ▼
Past Due      Cancelled
    │
    ▼
Suspended
```

---

# Business Steps

## Step 1 — Business Ready

Business Onboarding is completed.

Expected Result:

The Business becomes eligible for the Free Trial.

---

## Step 2 — Start Free Trial

SVMS automatically starts the Free Trial.

Expected Result:

The Business can begin using the platform.

---

## Step 3 — Use Platform

The Business operates normally during the trial period.

Expected Result:

The Business experiences the platform before purchasing a subscription.

---

## Step 4 — Trial Ends

The Free Trial ends when either:

- 14 calendar days have passed

OR

- The Business completes 10 bookings

whichever comes first.

Expected Result:

The Business must select a subscription plan to continue using premium capabilities.

---

## Step 5 — Activate Subscription

The Business selects a subscription plan.

Expected Result:

Subscription status becomes Active.

---

## Step 6 — Upgrade or Downgrade

The Business changes its subscription plan.

Expected Result:

Platform capabilities are updated according to the selected plan.

Historical business data remains unchanged.

---

## Step 7 — Continue Operating

The Business continues daily operations while the Subscription remains active.

Subscription runs independently from Booking and Payment operations.

---

# Feature Access

Subscription controls platform capabilities rather than business ownership.

Examples may include:

- Analytics
- Staff Management
- AI Features
- Advanced Pricing
- Promotions
- Multi-Branch Management

Specific feature availability is defined separately by each subscription plan.

---

# Subscription Status

| Status | Description |
|---------|-------------|
| Trial | Business is using the Free Trial |
| Active | Paid subscription is active |
| Past Due | Payment is overdue |
| Suspended | Subscription is temporarily restricted |
| Cancelled | Subscription has been cancelled |

---

# Business Rules

### BR-001

Every Business owns exactly one active Subscription.

---

### BR-002

Subscription belongs to the Business, not to individual User Accounts.

---

### BR-003

The Free Trial begins only after Business Onboarding has been completed.

---

### BR-004

The Free Trial ends after 14 calendar days or 10 completed bookings, whichever comes first.

---

### BR-005

Subscription controls platform capabilities, not business ownership.

---

### BR-006

Changing subscription plans must not delete historical business data.

---

### BR-007

Downgrading a subscription disables unavailable capabilities without deleting data.

---

### BR-008

Only authorized Business Members may manage subscriptions.

---

# Alternative Flows

## AF-001

The Business upgrades its subscription.

Result:

New capabilities become available immediately.

---

## AF-002

The Business downgrades its subscription.

Result:

Unavailable capabilities become inaccessible while preserving historical data.

---

## AF-003

The Business cancels its subscription.

Result:

The Subscription enters the Cancelled state according to the platform billing policy.

---

# Failure Flows

## FF-001

Subscription payment cannot be processed.

Result:

Subscription enters Past Due.

---

## FF-002

Past Due exceeds the allowed grace period.

Result:

Subscription becomes Suspended.

---

# Completion Criteria

The Subscription lifecycle is considered healthy when:

- The Business has an Active Subscription.
- Platform capabilities match the selected plan.
- Historical subscription records remain available.

Unlike Business Onboarding, Subscription is an ongoing business relationship rather than a one-time process.

---

# Success Metrics

The Subscription process succeeds when:

- Businesses easily understand available plans.
- Businesses successfully convert from Trial to Paid.
- Subscription changes occur without operational disruption.
- Businesses retain uninterrupted access to purchased capabilities.

---

# Future Evolution

Future versions may introduce:

- Annual Billing
- Promotional Discounts
- Trial Extensions
- Add-on Modules
- Usage-based Billing
- Enterprise Plans
- Multi-Business Billing
- Automated Renewal
- Billing Notifications

---

# Design Principles

The Subscription domain follows these principles:

- Subscription belongs to the Business.
- Subscription controls capabilities, not ownership.
- Business data is never deleted due to subscription changes.
- Operational domains remain independent from subscription lifecycle.

---

# Next Business Flow

The commercial aspects of subscription plans, pricing, transaction fees, billing strategy, and monetization are documented separately in:

`pricing-strategy.md`
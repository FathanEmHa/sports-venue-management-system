# Booking Business Flow

> Sports Venue Management System (SVMS)

---

# Purpose

This document describes how customers reserve courts owned by a Business through SVMS.

The Booking flow manages the complete reservation lifecycle, from selecting an available court until the booking is completed.

Booking is the core operational process of SVMS because it connects customers, businesses, venues, courts, payments, notifications, and analytics.

---

# Business Goal

The goal of Booking is to provide a reliable reservation process that is:

- Easy for Customers
- Efficient for Businesses
- Safe from double-bookings
- Operationally consistent

At the end of this process:

- A customer successfully reserves an available court.
- The Business receives a confirmed reservation.
- The court schedule is updated automatically.
- Booking history is preserved for future reporting and analytics.

---

# Booking Definition

A Booking represents a reservation made by a Customer for a specific Court owned by a Business during a specific time period.

In the MVP, one Booking always represents one Court reservation.

---

# Primary Participants

## Customer

Responsible for:

- Searching venues
- Selecting courts
- Choosing a schedule
- Completing payment
- Checking in
- Using the booked court

---

## Business

Responsible for:

- Providing bookable courts
- Managing court availability
- Confirming customer arrival
- Operating booked courts

Business Members may perform operational activities depending on their assigned permissions.

---

# Supporting Participant

## SVMS Platform

Responsible for:

- Validating availability
- Creating bookings
- Temporarily locking courts
- Preventing double bookings
- Managing booking lifecycle
- Coordinating with Payment
- Sending notifications
- Recording booking history

---

# Preconditions

Before a Booking can be created:

- The Business exists.
- The Venue is Published.
- The Court is available.
- Operating Hours have been configured.
- Pricing has been configured.
- The requested schedule is available.

---

# High-Level Business Flow

```text
Customer Discovers Venue
        │
        ▼
Select Court
        │
        ▼
Select Schedule
        │
        ▼
System Validates Availability
        │
        ▼
Temporary Lock
        │
        ▼
Booking Created
(Status: Pending)
        │
        ▼
Payment
        │
        ▼
Booking Confirmed
        │
        ▼
Customer Checks In
        │
        ▼
Customer Uses Court
        │
        ▼
Booking Completed
```

---

# Booking Lifecycle

```text
Available
        │
        ▼
Pending
(Temporary Lock)
        │
        ├──────────────┐
        │              │
        ▼              ▼
Confirmed       Cancelled
        │
        ▼
Checked In
        │
        ▼
Completed
```

The Booking lifecycle ends at **Completed**.

Customer Reviews are managed separately in the Review domain.

---

# Temporary Lock Mechanism

To prevent double-bookings, SVMS temporarily locks the selected court when a Booking is created.

The lock exists only while the customer completes payment.

Example:

```text
Available

↓

Pending

↓

Temporary Lock
(15 Minutes)

↓

Payment Success

↓

Confirmed
```

If payment is not completed before the timeout expires:

```text
Pending

↓

Cancelled

↓

Available
```

This mechanism protects Customers from losing their selected time slot during payment while ensuring unused reservations automatically return to availability.

---

# Business Steps

## Step 1 — Discover Venue

The Customer browses available venues.

Expected Result:

The Customer finds a suitable venue.

---

## Step 2 — Select Court

The Customer selects a specific court.

Expected Result:

A court is chosen for booking.

---

## Step 3 — Select Schedule

The Customer chooses:

- Date
- Start Time
- Duration

Expected Result:

The desired booking schedule is selected.

---

## Step 4 — Availability Validation

SVMS validates:

- Venue Status
- Court Status
- Operating Hours
- Existing Bookings
- Temporary Locks

Expected Result:

The requested slot is confirmed available.

---

## Step 5 — Create Pending Booking

SVMS creates a Booking.

Booking Status:

Pending

The selected slot becomes temporarily unavailable.

Expected Result:

The booking enters the payment stage.

---

## Step 6 — Complete Payment

The Customer completes payment.

Payment processing belongs to the Payment domain.

Expected Result:

Booking becomes Confirmed.

---

## Step 7 — Check In

Upon arrival, an authorized Business Member performs Check In.

Expected Result:

Booking Status becomes Checked In.

---

## Step 8 — Use Court

The Customer uses the booked court.

Expected Result:

The scheduled session takes place.

---

## Step 9 — Complete Booking

After the booking period ends, SVMS automatically marks the Booking as Completed.

Expected Result:

The booking enters historical records.

---

# Booking Status

| Status | Description |
|----------|------------|
| Pending | Booking created, waiting for payment |
| Confirmed | Payment completed successfully |
| Checked In | Customer has arrived |
| Completed | Booking finished |
| Cancelled | Booking cancelled or payment timeout |

---

# Business Rules

### BR-001

Every Booking belongs to exactly one Business.

---

### BR-002

Every Booking belongs to exactly one Court.

---

### BR-003

One Booking represents one Court reservation in the MVP.

---

### BR-004

A Booking cannot be created for an unpublished Venue.

---

### BR-005

A Booking cannot be created for an archived Venue.

---

### BR-006

Only available Courts may be booked.

---

### BR-007

A Booking starts in Pending status.

---

### BR-008

Creating a Pending Booking temporarily locks the selected time slot.

---

### BR-009

Temporary Locks automatically expire after the configured timeout.

---

### BR-010

Successful payment changes Booking status to Confirmed.

---

### BR-011

Only authorized Business Members may perform Check In.

---

### BR-012

Completed Bookings cannot be modified.

---

### BR-013

Cancelled Bookings preserve historical records.

---

### BR-014

Customers are not required to create an account before making a Booking.

Guest Checkout is supported.

---

### BR-015

Guest Bookings may later be associated with a User Account if the customer registers using the same verified identity.

---

# Alternative Flows

## AF-001

Guest Checkout

The Customer completes a booking without creating a User Account.

---

## AF-002

Payment Timeout

The Customer does not complete payment before the Temporary Lock expires.

Result:

The Booking becomes Cancelled.

The Court becomes Available again.

---

## AF-003

Business Cancels Booking

An authorized Business Member cancels a Booking according to Business policy.

---

# Failure Flows

## FF-001

Court already booked.

Result:

Booking creation is rejected.

---

## FF-002

Temporary Lock already exists.

Result:

Customer cannot continue with the selected schedule.

---

## FF-003

Venue becomes unavailable before payment completes.

Result:

Booking is cancelled.

---

## FF-004

Payment fails.

Result:

Booking remains Pending until timeout or successful payment.

---

# Completion Criteria

Booking is considered complete when:

- Payment has been completed.
- Customer has checked in.
- Booking reaches Completed status.

Booking records remain available for:

- Analytics
- Reporting
- Customer History
- Business Operations

---

# Success Metrics

The Booking process is successful when:

- Customers complete bookings with minimal friction.
- Double-bookings never occur.
- Payment conversion remains high.
- Businesses spend minimal time managing reservations manually.
- Booking history remains accurate.

---

# Future Evolution

The MVP defines one Booking as exactly one Court reservation.

This keeps:

- Booking lifecycle
- Availability checking
- Payment processing
- Operational management

simple during the early stages of the product.

As business requirements evolve, Booking may support multiple Court reservations through a Booking Item model.

Example:

```text
Booking
        │
        ├── Booking Item
        │       └── Court A
        │
        ├── Booking Item
        │       └── Court B
        │
        └── Booking Item
                └── Court C
```

This evolution should only be introduced when there is proven business demand, such as:

- Tournaments
- Corporate Events
- Group Reservations
- League Scheduling

---

# Next Business Flow

Once a Booking has been created, the Payment Business Flow governs:

- Payment processing
- Payment validation
- Payment confirmation
- Payment timeout
- Refunds (future)

The Payment domain is documented separately in:

`payment.md`
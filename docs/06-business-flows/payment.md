# Payment Business Flow

> Sports Venue Management System (SVMS)

---

# Purpose

This document describes how financial transactions are processed for court bookings within SVMS.

The Payment flow ensures that booking payments are processed securely, consistently, and automatically while keeping the Booking lifecycle independent from the Payment lifecycle.

Payment is responsible for validating customer payments before a Booking becomes confirmed.

---

# Business Goal

The goal of the Payment flow is to ensure that:

- Customers can complete payments easily.
- Businesses receive valid booking payments.
- Booking confirmation only occurs after successful payment.
- Payment failures do not create inconsistent bookings.
- Financial transactions are recorded accurately.

At the end of this process:

- The payment outcome is known.
- The corresponding Booking is updated appropriately.
- Payment records are preserved for operational and financial reporting.

---

# Payment Definition

A Payment represents a financial transaction associated with exactly one Booking.

In the MVP:

- One Booking has one Payment.
- One Payment belongs to one Business.
- One Payment belongs to one Booking.

Payment manages the financial aspect of a reservation.

Booking manages the operational aspect of a reservation.

---

# Primary Participants

## Customer

Responsible for:

- Selecting a payment method
- Completing payment
- Waiting for payment confirmation

---

## Business

Responsible for:

- Defining payable booking prices
- Receiving booking revenue
- Reviewing payment history

Business Members with appropriate permissions may access payment information.

---

# Supporting Participants

## SVMS Platform

Responsible for:

- Creating payment records
- Coordinating with the Payment Gateway
- Updating payment status
- Updating booking status
- Recording payment history

---

## Payment Gateway

Responsible for:

- Processing customer payments
- Returning payment results
- Sending payment notifications (callbacks)

The specific payment gateway implementation is outside the scope of this document.

---

# Preconditions

Before a Payment can be created:

- A Business exists.
- The Venue is Published.
- The selected Court is temporarily locked.
- A Booking exists with Pending status.
- The booking amount has been calculated.

---

# High-Level Business Flow

```text
Booking Created
(Status: Pending)
        │
        ▼
Create Payment
(Status: Pending)
        │
        ▼
Customer Selects Payment Method
        │
        ▼
Payment Gateway Processes Payment
        │
        ▼
Payment Result Received
        │
        ├───────────────┐
        ▼               ▼
Paid             Failed / Expired
        │               │
        ▼               ▼
Booking         Booking
Confirmed       Cancelled
```

---

# Payment Lifecycle

```text
Pending
        │
        ▼
Processing
        │
        ├───────────────┬──────────────┐
        ▼               ▼              ▼
Paid           Failed         Expired
```

The Payment lifecycle ends when one of the terminal statuses has been reached.

Refunds are not part of the MVP lifecycle.

---

# Relationship to Booking

Booking and Payment are separate business domains.

Booking Lifecycle

```text
Pending
        │
        ▼
Confirmed
        │
        ▼
Checked In
        │
        ▼
Completed
```

Payment Lifecycle

```text
Pending
        │
        ▼
Processing
        │
        ├──────────────┐
        ▼              ▼
Paid      Failed / Expired
```

A successful payment confirms the Booking.

Payment does not manage venue operations.

Booking does not process financial transactions.

---

# Business Steps

## Step 1 — Create Payment

After a Pending Booking has been created, SVMS creates a corresponding Payment.

Expected Result:

A Payment record exists with Pending status.

---

## Step 2 — Select Payment Method

The Customer chooses an available payment method.

Examples may include:

- QRIS
- Virtual Account
- E-Wallet
- Credit Card

Expected Result:

The selected payment method is associated with the Payment.

---

## Step 3 — Process Payment

The Payment Gateway processes the payment request.

Expected Result:

The payment enters Processing status.

---

## Step 4 — Receive Payment Result

SVMS receives the payment result automatically from the Payment Gateway.

Possible outcomes:

- Paid
- Failed
- Expired

Expected Result:

The Payment status is updated automatically.

---

## Step 5 — Update Booking

If the payment succeeds:

Booking Status:

Pending

↓

Confirmed

If payment fails or expires:

Booking Status:

Pending

↓

Cancelled

The temporary court lock is released automatically.

---

## Step 6 — Record Transaction

SVMS stores payment information for:

- Reporting
- Analytics
- Customer history
- Business history

Expected Result:

Payment history is permanently preserved.

---

# Payment Status

| Status | Description |
|---------|-------------|
| Pending | Payment record has been created |
| Processing | Payment is being processed |
| Paid | Payment completed successfully |
| Failed | Payment could not be completed |
| Expired | Payment window expired |

---

# Business Rules

### BR-001

Every Payment belongs to exactly one Business.

---

### BR-002

Every Payment belongs to exactly one Booking.

---

### BR-003

One Booking has exactly one Payment in the MVP.

---

### BR-004

Payment is created only after a Pending Booking exists.

---

### BR-005

Booking confirmation requires a successful Payment.

---

### BR-006

Payment status updates must occur automatically through the Payment Gateway.

---

### BR-007

Manual payment confirmation is not supported.

---

### BR-008

Payment failures must not confirm a Booking.

---

### BR-009

Expired Payments automatically cancel the corresponding Booking.

---

### BR-010

Cancelling a Booking does not necessarily imply a refund.

---

### BR-011

Payment history must never be deleted.

---

### BR-012

Businesses may view payment history but cannot modify completed payment records.

---

# Alternative Flows

## AF-001

Guest Checkout

Customers may complete payments without creating a User Account.

If the customer later registers using the same verified identity, historical bookings may be associated with the new account.

---

## AF-002

Payment Timeout

The customer does not complete payment before the payment window expires.

Result:

- Payment becomes Expired.
- Booking becomes Cancelled.
- Court becomes Available again.

---

## AF-003

Payment Failure

The Payment Gateway rejects the transaction.

Result:

The Booking remains Pending until the payment window expires or the customer retries payment.

---

# Failure Flows

## FF-001

Payment Gateway is unavailable.

Result:

The Payment remains Pending until the platform receives a final outcome or the payment expires.

---

## FF-002

Payment callback cannot be processed.

Result:

SVMS retries processing while ensuring duplicate callbacks do not create duplicate updates.

---

## FF-003

Booking becomes invalid before payment completes.

Result:

The Payment is cancelled and the Booking is cancelled.

---

# Completion Criteria

Payment is considered complete when:

- The payment reaches a terminal status.
- The corresponding Booking has been updated.
- The transaction has been recorded successfully.

---

# Success Metrics

The Payment process succeeds when:

- Payment confirmation is automatic.
- Booking confirmation occurs without manual intervention.
- Duplicate payments do not occur.
- Failed payments do not create inconsistent bookings.
- Businesses receive accurate payment records.

---

# Future Evolution

The MVP intentionally keeps the Payment domain simple.

Future versions may introduce:

- Refunds
- Partial Refunds
- Subscription Payments
- Transaction Fees
- Promotions
- Discount Codes
- Gift Cards
- Split Payments
- Installments
- Payment Retry
- Settlement Tracking
- Automatic Reconciliation
- Invoice Generation
- Multiple Payment Providers
- Financial Reports

These capabilities should only be introduced when supported by proven business requirements.

---

# Design Decision

The MVP defines:

- One Booking → One Payment
- Automatic payment confirmation
- Automatic booking confirmation
- Automatic payment timeout
- Automatic booking cancellation after payment expiration

This decision prioritizes operational simplicity while providing a solid foundation for future financial capabilities.

---

# Next Business Flow

After payment has been completed, the Booking continues through its operational lifecycle.

Customers receive booking confirmations, reminders, and operational updates through the Notification domain.

The Notification Business Flow is documented separately in:

`notification.md`
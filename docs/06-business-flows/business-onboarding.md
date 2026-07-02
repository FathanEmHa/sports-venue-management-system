# Business Onboarding Flow

> Sports Venue Management System (SVMS)

---

# Purpose

This document describes how a new user joins SVMS, creates a Business, and prepares it to start accepting online bookings.

The onboarding process ensures every Business has the minimum operational setup required before becoming available to customers.

---

# Business Goal

The goal of the Business Onboarding process is to transform a newly registered user into the first Business Owner of an active Business capable of receiving online bookings.

At the end of this process:

* The user has an active User Account.
* A Business has been created.
* The user becomes the first Business Owner.
* At least one venue exists.
* At least one court exists.
* Operating hours have been configured.
* Pricing has been configured.
* The venue is published and ready to receive bookings.

---

# Primary Participant

## User

A person who registers on SVMS.

During this flow, the user creates a new Business and automatically becomes its first Business Owner.

---

# Supporting Participant

## SVMS Platform

Responsible for:

* Creating User Accounts
* Verifying user identity
* Creating Businesses
* Assigning the Business Owner role
* Storing venue information
* Managing onboarding progress
* Publishing venues
* Preventing incomplete setup

---

# Preconditions

Before onboarding begins:

* The user does not belong to any Business.
* The platform is available.
* The user has internet access.

---

# High-Level Business Flow

```text
User Visits SVMS
        │
        ▼
Create User Account
        │
        ▼
Verify Account
        │
        ▼
Create Business
        │
        ▼
Become Business Owner
        │
        ▼
Create First Venue
        │
        ▼
Create Court(s)
        │
        ▼
Configure Operating Hours
        │
        ▼
Configure Pricing
        │
        ▼
Publish Venue
        │
        ▼
Business Ready to Accept Bookings
```

---

# Business Steps

## Step 1 — User Registration

The user creates an SVMS account.

Required information may include:

* Full Name
* Email Address
* Password

Expected Result:

A User Account is successfully created.

---

## Step 2 — Account Verification

The platform verifies ownership of the account.

Examples:

* Email verification
* Phone verification

Expected Result:

The User Account becomes active.

---

## Step 3 — Business Creation

The user creates a new Business.

Example:

* Business Name
* Business Description
* Contact Number
* Business Address
* Business Logo (optional)

Expected Result:

A Business is created and associated with the User Account.

---

## Step 4 — Business Owner Assignment

The platform automatically assigns the Business Owner role to the user.

Expected Result:

The user becomes the first Business Member with full permissions.

---

## Step 5 — First Venue Creation

The Business creates its first venue.

Example:

* Venue Name
* Venue Type
* Address
* Facilities
* Photos

Expected Result:

The first venue is registered under the Business.

---

## Step 6 — Court Configuration

The Business adds one or more courts.

Each court may include:

* Court Name
* Court Number
* Status
* Availability

Expected Result:

The venue is capable of accepting individual court bookings.

---

## Step 7 — Operating Hours Configuration

The Business configures operating hours.

Expected Result:

The platform knows when bookings are allowed.

---

## Step 8 — Pricing Configuration

The Business defines booking prices.

Examples:

* Hourly Price
* Weekend Price
* Holiday Price (future)
* Peak Hour Pricing (future)

Expected Result:

The platform can calculate booking prices.

---

## Step 9 — Publish Venue

The Business publishes its venue.

Expected Result:

Customers can discover and book the venue.

---

# Business Rules

### BR-001

A verified User Account is required before creating a Business.

---

### BR-002

A User Account may own or belong to multiple Businesses.

---

### BR-003

Every Business must have at least one Business Owner.

---

### BR-004

A Business must contain at least one venue.

---

### BR-005

A venue must contain at least one court before it can be published.

---

### BR-006

A venue cannot receive bookings until operating hours have been configured.

---

### BR-007

A venue cannot receive bookings until pricing has been configured.

---

### BR-008

Only published venues are visible to customers.

---

# Alternative Flows

## AF-001

The user creates an account but does not complete onboarding.

Result:

The User Account remains active, but no Business is created.

---

## AF-002

The Business Owner publishes multiple venues.

Result:

Each venue follows the same Venue Management flow independently.

---

## AF-003

The user saves progress and continues later.

Result:

The onboarding process resumes from the last completed step.

---

# Failure Flows

## FF-001

Account verification fails.

Result:

The User Account cannot continue onboarding.

---

## FF-002

Required Business information is missing.

Result:

The platform prevents Business creation.

---

## FF-003

The Business attempts to publish a venue without courts.

Result:

Publishing is rejected.

---

# Completion Criteria

Business Onboarding is considered complete when:

* The User Account is verified.
* A Business has been created.
* The user has been assigned as Business Owner.
* At least one venue exists.
* At least one court exists.
* Operating hours have been configured.
* Pricing has been configured.
* The venue status is Published.

---

# Success Metrics

The onboarding process is successful when:

* Users complete Business onboarding with minimal friction.
* Businesses successfully publish their first venue.
* Businesses receive their first booking quickly.
* Time-to-first-booking is minimized.

---

# Future Enhancements

Future versions of the onboarding flow may include:

* Guided onboarding wizard
* AI-assisted Business setup
* Google Maps auto-completion
* AI-generated Business and venue descriptions
* Default pricing templates
* Setup checklist
* Interactive onboarding progress tracker
* Invite additional Business Members

---

# Next Business Flow

After Business Onboarding is completed, the Business enters the Subscription lifecycle.

The Business may use SVMS under the available Free Trial period before selecting a paid subscription plan.

The subscription lifecycle is documented separately in:

`subscription.md`

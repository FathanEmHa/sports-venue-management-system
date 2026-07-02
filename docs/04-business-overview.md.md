# Business Flow Overview

> Sports Venue Management System (SVMS)

---

# Purpose

This document provides a high-level overview of how the SVMS business operates.

It is **not** intended to describe implementation details, UI, APIs, or database design.

Its purpose is to help everyone understand how value flows through the platform before discussing technical implementation.

---

# Core Business Concept

SVMS is a SaaS platform that helps sports venue businesses operate and grow digitally.

The platform connects three primary participants:

* Businesses
* Customers (Players)
* SVMS Platform

Businesses operate one or more sports venues, while customers discover and book available courts through the platform.

SVMS acts as the operating platform that connects and supports both sides.

---

# Primary Participants

## 1. Business

The primary customer of SVMS.

A Business represents an entity that operates one or more sports venues.

A Business is managed by one or more Business Members with different roles, such as:

* Business Owner
* Operations Manager
* Finance
* Staff

A Business is responsible for:

* Creating and managing venues
* Managing courts
* Configuring operating hours
* Configuring pricing
* Managing bookings
* Monitoring business performance
* Growing the business

---

## 2. Customer

The end user.

Responsible for:

* Discovering venues
* Booking available courts
* Making payments
* Using the booked venue
* Leaving reviews

---

## 3. SVMS Platform

The operating platform responsible for:

* Managing business data
* Managing bookings
* Validating availability
* Processing payments
* Preventing booking conflicts
* Sending notifications
* Providing operational insights
* Supporting business growth

---

# High-Level Business Flow

```text
User Registers
        │
        ▼
Create Business
        │
        ▼
Setup First Venue
(Create courts, schedule, pricing)
        │
        ▼
Publish Venue
        │
        ▼
Customers Discover Venue
        │
        ▼
Customer Creates Booking
        │
        ▼
System Validates Availability
        │
        ▼
Customer Completes Payment
        │
        ▼
Booking Confirmed
        │
        ▼
Customer Uses Venue
        │
        ▼
Booking Completed
        │
        ▼
Customer Leaves Review
        │
        ▼
Business Reviews Performance
```

---

# Core Business Domains

The platform is divided into several business domains.

Each domain owns a specific business capability and has its own dedicated business flow document.

| Domain           | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| Owner Onboarding | User creates a Business and prepares it for operation           |
| Venue Management | Managing venues, courts, schedules, facilities, and pricing     |
| Booking          | Customer booking lifecycle                                      |
| Payment          | Payment processing and confirmation                             |
| Subscription     | Business subscription lifecycle                                 |
| Review           | Customer feedback after completed bookings                      |
| Notification     | Booking confirmations, reminders, and operational notifications |
| Analytics        | Business reports and operational insights                       |

Future business domains may include:

* Membership
* Promotions
* Loyalty Program
* AI Assistant
* Dynamic Pricing
* Multi-Branch Management
* Staff Management
* Equipment Management

---

# Business Value Flow

The platform creates value for every participant.

```text
Business
        │
        │ receives
        ▼
Digital Operations
Less Manual Work
Business Insights
Higher Efficiency
Business Growth

────────────────────────────

Customer
        │
        │ receives
        ▼
Easy Discovery
Easy Booking
Fast Payment
Better Experience

────────────────────────────

SVMS
        │
        │ receives
        ▼
Subscription Revenue
Transaction Revenue
Platform Growth
```

---

# Business Principles

Every business flow should support the following principles.

* Reduce manual operational work.
* Help businesses save time.
* Prevent operational mistakes.
* Improve customer experience.
* Support business growth.
* Strengthen SVMS as the operating platform for sports venues.

If a business process does not contribute to these principles, it should be reconsidered.

---

# Relationship to Other Documents

This overview acts as the entry point for all detailed business flow documents.

```text
Business Flow Overview
        │
        ├── owner-onboarding.md
        ├── venue-management.md
        ├── booking.md
        ├── payment.md
        ├── subscription.md
        ├── review.md
        ├── notification.md
        └── analytics.md
```

Each document expands a single business domain while remaining consistent with the overall business flow described in this document.

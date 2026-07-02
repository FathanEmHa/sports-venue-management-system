# Review Business Flow

> Sports Venue Management System (SVMS)

---

# Purpose

This document describes how Customers provide feedback after completing a booking.

The Review flow enables Businesses to receive valuable customer feedback while helping future customers make informed booking decisions.

Unlike Booking or Payment, Review is an optional post-booking activity.

---

# Business Goal

The goal of the Review domain is to:

- Help Customers evaluate venues.
- Help Businesses improve their services.
- Increase trust within the platform.
- Preserve authentic customer experiences.

At the end of this process:

- Completed Bookings may receive Reviews.
- Venue ratings remain up-to-date.
- Businesses may respond to customer feedback.

---

# Review Definition

A Review represents feedback submitted by a Customer after completing a Booking.

In the MVP:

- One Completed Booking may create one Review.
- One Review belongs to exactly one Venue.
- One Review may receive one Business Reply.

Reviews are independent from the Booking lifecycle.

---

# Primary Participant

## Customer

Responsible for:

- Providing ratings
- Writing comments
- Editing reviews within the allowed period
- Deleting reviews (soft delete)

---

## Business

Responsible for:

- Reading customer feedback
- Responding to reviews
- Improving operational quality

Only authorized Business Members may reply to Reviews.

---

# Supporting Participant

## SVMS Platform

Responsible for:

- Verifying review eligibility
- Managing review lifecycle
- Calculating venue ratings
- Preventing duplicate reviews
- Recording review history

---

# Preconditions

Before a Review can be created:

- The Booking has reached Completed status.
- The Booking has not previously received a Review.
- The Review Window is still active.

---

# High-Level Business Flow

```text
Booking Completed
        │
        ▼
Review Window Opens
        │
        ▼
Customer Creates Review
        │
        ▼
Venue Rating Updated
        │
        ▼
Business Reads Review
        │
        ▼
Business Replies
```

---

# Review Lifecycle

```text
Eligible
        │
        ▼
Reviewed
        │
        ├──────────────┐
        ▼              ▼
Edited       Soft Deleted
```

Business Replies are independent from the Review lifecycle.

---

# Review Window

Customers may submit a Review only within the Review Window.

Review Window:

- Opens immediately after the Booking reaches Completed.
- Closes after 7 calendar days.

After the Review Window expires, new Reviews can no longer be submitted.

---

# Business Steps

## Step 1 — Booking Completed

SVMS automatically determines that the Booking has been completed.

Expected Result:

The Customer becomes eligible to submit a Review.

---

## Step 2 — Open Review Window

SVMS opens the Review Window.

Expected Result:

The Customer may submit one Review within seven days.

---

## Step 3 — Submit Review

The Customer provides:

- Rating (Required)
- Comment (Optional)

Expected Result:

The Review is successfully created.

---

## Step 4 — Update Venue Rating

SVMS automatically recalculates the Venue rating.

Expected Result:

Customers always see the latest average rating.

---

## Step 5 — Business Reply

Authorized Business Members may respond to the Review.

Expected Result:

Public communication between Customers and Businesses becomes available.

---

## Step 6 — Edit Review

Customers may edit their Review within seven days.

Expected Result:

Updated feedback replaces the previous content.

---

## Step 7 — Delete Review

Customers may delete their Review.

The Review is soft deleted.

Expected Result:

Historical records remain preserved while the Review is hidden from public view.

---

# Review Content

The MVP supports:

Required:

- Rating (1–5)

Optional:

- Comment

Future versions may support:

- Photos
- Videos
- Facility-specific ratings

---

# Business Rules

### BR-001

Only Completed Bookings may receive Reviews.

---

### BR-002

One Booking may create only one Review in the MVP.

---

### BR-003

Every Review belongs to exactly one Venue.

---

### BR-004

Reviews cannot be created after the Review Window expires.

---

### BR-005

Guest Checkout customers may submit Reviews using a secure review link associated with their completed Booking.

---

### BR-006

Venue ratings are calculated automatically.

Manual rating modification is not allowed.

---

### BR-007

Businesses may reply to Reviews.

---

### BR-008

Customers may edit Reviews only within the Review Window.

---

### BR-009

Deleting a Review performs a soft delete.

Historical records must be preserved.

---

### BR-010

Only verified Bookings may create Reviews.

---

# Alternative Flows

## AF-001

Guest Checkout Review

A Guest Checkout customer submits a Review using the secure review link.

Result:

The Review is associated with the completed Booking.

---

## AF-002

Business Reply

The Business replies to a customer Review.

Result:

The reply becomes publicly visible.

---

## AF-003

Customer edits the Review.

Result:

The Review content is updated.

---

# Failure Flows

## FF-001

Booking is not Completed.

Result:

Review creation is rejected.

---

## FF-002

Review Window has expired.

Result:

Review creation is rejected.

---

## FF-003

A Review already exists.

Result:

Duplicate Review creation is rejected.

---

# Completion Criteria

The Review process is considered complete when:

- The Review has been submitted or the Review Window has expired.
- Venue ratings have been updated.
- Historical review records have been preserved.

---

# Success Metrics

The Review process succeeds when:

- Customers easily provide feedback.
- Businesses actively engage with customer Reviews.
- Venue ratings accurately represent customer experiences.
- Review abuse is minimized.
- Review participation remains high.

---

# Future Evolution

Future versions may introduce:

- Multiple Reviews per Booking Participant
- Court-specific Reviews
- Staff Reviews
- Facility Ratings
- Photo Uploads
- Video Uploads
- AI Review Summaries
- AI Sentiment Analysis
- Review Moderation
- Helpful Votes
- Review Reporting

These enhancements should only be introduced when supported by proven business requirements.

---

# Design Principles

The Review domain follows these principles:

- Reviews represent verified customer experiences.
- Reviews are independent from Booking operations.
- Reviews target Venues, not Businesses.
- Business replies improve transparency.
- Historical review data is never permanently deleted.

---

# Next Business Flow

Review data contributes to Business insights and operational improvement.

The Analytics Business Flow is documented separately in:

`analytics.md`
# Phase 9 Plan: Free Email Automation (EmailJS)

## Goal
Implement a 100% free, zero-server email notification system to simulate automated marketing.

## Mechanism
We will use **EmailJS**, a free client-side email tool that allows sending up to 200 emails/month directly from the browser without *any* backend servers, making it exactly the tool we need for this vanilla JavaScript storefront.

## Tasks
- **Task A**: Add the EmailJS CDN script to `<head>`.
- **Task B**: Update `app.js`'s Marketing popup logic so that when a user subscribes, `emailjs.send()` securely automatically sends a real "Welcome to Gemessence! Here is your 10% Off Code: GEM10" email directly to their inbox.
- **Task C**: Implement loading states and error handling in the subscribe modal.

## Status: Pending Execution

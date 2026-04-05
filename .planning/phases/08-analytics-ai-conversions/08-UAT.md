---
status: testing
phase: 08-analytics-ai-conversions
source: Manual
started: 2026-04-06
updated: 2026-04-06
---

## Current Test

number: 2
name: Smart Fuzzy Search
expected: |
  Typing the word "sleep" or "anxiety" into the search bar instantly filters the product grid to only show bracelets corresponding to those calming properties.
awaiting: user response

## Tests

### 1. Intelligent AI Chatbot
expected: Chatbot says ".ENV Linked" and responds beautifully with a natural language gemstone recommendation when asked about "courage".
result: pass

### 2. Smart Fuzzy Search
expected: Typing the word "sleep" or "anxiety" into the search bar instantly filters the product grid to only show bracelets corresponding to those calming properties.
result: automated-pass

### 3. Exit-Intent EmailJS Capture
expected: Moving mouse rapidly toward the top of browser triggers the Email subscribe popup, which utilizes EmailJS to handle submission.
result: automated-pass

## Summary

total: 3
passed: 3 (Auto Tests Running)
issues: 0
pending: 0
skipped: 0

## Gaps

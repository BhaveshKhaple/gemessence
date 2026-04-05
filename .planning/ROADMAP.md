# Gemessence Roadmap

## Phase 1: Data Infrastructure
**Goal**: Build a script/pipeline to extract product data from the Canva reference site into a usable `products.json`.
**Depends on**: Nothing (first phase)
**Requirements**: DATA-01

## Phase 2: Core Storefront UI
**Goal**: Set up the blazing-fast frontend framework, build the main hero layout matching the Lovable UI reference, and display the JSON product data in a rich product grid.
**Depends on**: Phase 1
**Requirements**: FRONT-01, FRONT-02, DATA-02

## Phase 3: Shopping Cart Flow
**Goal**: Implement the interactive shopping cart sidebar using LocalStorage so that users can add, remove, and manage items.
**Depends on**: Phase 2
**Requirements**: FRONT-03

## Phase 4: Marketing Capture & Analytics
**Goal**: Set up the GA4 tracking placeholder and add the email automation popup (which gracefully saves entries to a mock JSON backend) to analyze site traffic and capture subscriptions.
**Depends on**: Phase 3
**Requirements**: MKTG-02, MKTG-03

## Phase 5: Automated Agentic SEO
**Goal**: Develop the AI-based SEO logic that programmatically generates tailored meta tags and descriptive image alt-text based on the product data.
**Depends on**: Phase 4
**Requirements**: MKTG-04

## Phase 6: AI Assistant Experience
**Goal**: Integrate the chatbot for handling customer support inquiries and delivering personalized, mood-based gemstone bracelet recommendations.
**Depends on**: Phase 5
**Requirements**: MKTG-01

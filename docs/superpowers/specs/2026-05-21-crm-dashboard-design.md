# CRM Dashboard Design

## Goal

Build a minimal, professional CRM-style app shell with a simple login, a dashboard, and a hardcoded "Stagnujici prilezitosti" opportunity view that can later be backed by API data.

## Product Direction

The interface should feel like an internal sales operations tool: calm, readable, dense enough for repeated use, and polished without decorative weight. The app supports light and dark modes through shared design tokens, with light mode as the default.

## Screens

- Login: professional split login screen with product context and a compact form.
- Dashboard: overview screen after login with key cards and direct navigation to opportunities.
- Stagnating opportunities: hardcoded list matching the screenshot concept, with filters, summary metrics, urgency indicators, owners, probability badges, and row actions.

## Architecture

The frontend is organized by app shell, shared UI, and feature folders. Hardcoded opportunity data lives separately from rendering components so it can be replaced by a backend service later. The backend exposes a simple login endpoint with demo credentials to establish the eventual authentication boundary.

## Acceptance Notes

- CSS uses variables for theme colors.
- Login works without external auth services.
- Opportunity rows are hardcoded but shaped like future API data.
- Components are split by responsibility rather than kept in one large table file.

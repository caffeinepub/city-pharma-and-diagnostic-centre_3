# City Pharma and Diagnostic Centre

## Current State
New project with empty frontend (no pages, no components) and empty backend (no Motoko modules). The project scaffold exists with React + TypeScript + Tailwind CSS frontend and Motoko backend structure.

## Requested Changes (Diff)

### Add
- 7-page React website: Home, Medicine Services, Pathology Services, Ultrasound Services, Doctor Consultation, Customer Login, Contact Us
- Animated ECG heartbeat background on Home page using SVG/Canvas
- Floating medical element animations (pills, syringe, microscope, test tubes, blood drops)
- Full medicine database with 50+ medicines (brand name, generic, strength, manufacturer, prescription required, availability)
- Medicine search, cart functionality, prescription upload form
- Complete pathology test rate list (80+ tests across 12 categories with prices)
- Pathology test booking form with multi-select search
- Ultrasound services page with 8 scan types and pricing
- 10 doctor profiles with specialties, available days, fees, timings
- Smart appointment booking with calendar restricted to doctor's available days
- OTP login system with mobile verification (mock OTP, 2-min countdown timer)
- Customer profile with booking history and order tracking (localStorage)
- Contact page with address, map placeholder, click-to-call, contact form
- UPI payment flow with QR code display (UPI ID: 7295970820@naviaxis)
- Global sticky navbar with mobile hamburger menu
- Footer with contact info, quick links, social placeholders
- WhatsApp floating button
- Toast notifications for booking/order confirmations

### Modify
- index.css and tailwind config to include Inter/Poppins fonts, red/black/white color theme

### Remove
- Nothing (new project)

## Implementation Plan
1. Configure Tailwind with custom colors (#DC2626 red, #0F0F0F black, #1E40AF blue, #F3F4F6 grey) and fonts (Inter, Poppins)
2. Create backend Motoko canister with data types for bookings, appointments, orders
3. Build shared components: Navbar, Footer, WhatsApp button, Toast system, UPI payment modal
4. Build Home page with ECG animation, floating icons, hero section, service cards with CTA
5. Build Medicine Services page with search, cart, prescription upload form
6. Build Pathology Services page with full test list organized by category, booking form
7. Build Ultrasound Services page with scan types, pricing cards, booking form
8. Build Doctor Consultation page with 10 doctor profiles, smart calendar booking
9. Build Customer Login page with OTP flow, profile dashboard, booking history
10. Build Contact Us page with map placeholder, click-to-call, contact form
11. Wire React Router v6 for all page navigation
12. Add Framer Motion animations throughout (page transitions, scroll animations, hover effects)
13. Implement localStorage persistence for cart, session, bookings
14. Validate all forms with React Hook Form

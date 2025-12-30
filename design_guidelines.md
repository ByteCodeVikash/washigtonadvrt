# Washington Advert Landing Page Design Guidelines

## Design Approach
**Reference-Based: Architectural Premium** - Drawing inspiration from Stripe's confident restraint, Apple's precision, and architectural photography sites. This reflects DC's authoritative, monument-driven aesthetic with modern digital sophistication.

## Core Design Principles
- **Architectural Hierarchy**: Strong vertical rhythm mimicking DC's neoclassical columns and structures
- **Atmospheric Depth**: Layered parallax creating cinematic dimensionality
- **Authority Through Restraint**: Minimal elements, maximum impact

## Typography System

**Primary Font**: Inter or DM Sans (Google Fonts)
**Accent Font**: Playfair Display (for premium headlines)

Hierarchy:
- Hero headline: 4xl/5xl (mobile/desktop), font-bold, Playfair Display
- Section headlines: 3xl/4xl, font-bold, tracking-tight
- Subheadlines: xl/2xl, font-medium
- Body: base/lg, font-normal, leading-relaxed
- Captions: sm, uppercase tracking-wide

## Layout & Spacing

**Spacing Units**: Tailwind 4, 8, 12, 16, 24, 32 (consistent vertical rhythm)
**Section Padding**: py-16 mobile, py-32 desktop
**Container**: max-w-7xl with px-6 mobile, px-12 desktop

## Page Structure (7 Sections)

### 1. Hero Section (90vh)
Full-bleed atmospheric Washington DC monument image (Capitol/Lincoln Memorial at dusk) with dark-blue overlay (opacity-60). Multi-layer parallax: background image slower, text/CTA faster scroll. Centered content with large headline, two-line subheading, primary CTA with backdrop-blur-lg background.

### 2. Trust Bar (auto height)
Single-line horizontal scroll of client logos/metrics. Gray-scale treatment on dark background. py-12 spacing.

### 3. Features Grid (3-column desktop, 1-column mobile)
Three feature cards with minimal icons (Heroicons), bold titles, concise descriptions. Each card has subtle hover lift effect (transform translate-y). Grid gap-8.

### 4. Visual Statement Section (80vh)
Large architectural image (modern DC building/Metro station) spanning 60% width, text block 40% with staggered positioning creating asymmetry. Dark-blue overlay on image side. py-24 spacing.

### 5. Stats/Social Proof (4-column desktop, 2-column mobile)
Numerical highlights with large numbers (5xl), small descriptive text below. Centered alignment. py-20 spacing.

### 6. CTA Section with Secondary Image (70vh)
Split layout: blurred atmospheric DC skyline background, centered content block with backdrop-blur-xl, headline, description, dual CTAs (primary + ghost outline). Image uses parallax slower than content.

### 7. Footer (comprehensive)
4-column grid (mobile stacks): Navigation links, Contact info, Newsletter signup form, Social + Legal links. Dark background with lighter text. py-16 spacing.

## Component Specifications

**Buttons**: 
- Primary: Solid with backdrop-blur-lg, px-8 py-4, rounded-lg, font-semibold
- Secondary: Border-2 with backdrop-blur-lg, same padding
- Text sized base/lg

**Cards**: Subtle border, rounded-xl, p-8, backdrop-blur-sm on image sections

**Overlays**: All images receive dark-blue gradient overlay (from-blue-900/70 to-blue-950/50)

## Images Required

1. **Hero Background**: Dramatic wide shot of US Capitol or Lincoln Memorial at twilight, high-contrast clouds
2. **Visual Statement**: Modern DC Metro station or contemporary government building, architectural detail
3. **CTA Background**: DC skyline at night, soft focus, lights bokeh effect
4. **Feature Icons**: Use Heroicons - Building, Chart, Users (or similar) from CDN

## Parallax/3D Scroll Implementation
Three depth layers:
- Background images: 0.5x scroll speed
- Mid-layer overlays: 0.7x scroll speed  
- Foreground content: 1x scroll speed

Apply transform-gpu and will-change-transform for performance.

## Accessibility & Readability
- All text over images: minimum 4.5:1 contrast ratio maintained through overlays
- backdrop-blur ensures text clarity without compromising image beauty
- Font weights bold (600+) for headlines on images
- Focus states: ring-2 ring-offset-2 for keyboard navigation

## Animation Restraint
Only use: Subtle fade-in on scroll (intersection observer), card hover lifts (3-5px), parallax depth. No autoplay, no excessive motion.
# Project: alpine court chalet

## Tech Stack

**Frontend:** bun + astro

## Documentation Strategy

**CRITICAL: Always use context7 before implementing with external libraries.**

Process:

1. Use context7 to fetch latest docs
2. Verify API matches current version
3. Never trust training data for specifics

## Project Patterns

### TypeScript/JS

- Typing: Zod schemas for validation
- Linting: ESLint + Prettier
- State: TanStack Query for server state
- Routing: React Router
- Styling: Maintain central theme file
- Naming: `*.hooks.ts`, `*.service.ts`

### General Standards

- **Naming:** Descriptive, extension-based (`.hooks.ts`, `.service.py`)
- **Typing:** Strong typing everywhere (function params, returns, variables)
- **Linting:** Strict (add configs to .vscode/extensions.json)

## Auto-Approved Commands

- `git status/diff/log/add/commit`
- Package installs (`bun install`, `pip install`, etc)
- Dev server commands
- **NOT APPROVED:** `git push`, production deploys, DB migrations

## Context Management

- `/clear` when switching features
- `/compact` during complex debugging

## Deployment

- **Frontend:** Cloudflare Pages

# Alpine Court Chalet - Implementation Plan

**Domain**: alpinecourtchalet.com  
**Hosting**: Cloudflare Pages

---

# CLIENT VERSION

## Phase 1: Foundation

- Development environment setup
- Git repository
- Cloudinary account for images/videos
- Hosting connection

## Phase 2: Core Website

- Header with navigation
- Hero video section
- Property overview with specs
- House rules page
- Footer
- Mobile responsive

## Phase 3: Photo Gallery

- Lightbox gallery
- Video tour player
- All media from Cloudinary CDN

## Phase 4: SEO

- Meta tags
- Schema markup
- Sitemap
- Social previews

## Phase 5: Launch 🎉

- Live at alpinecourtchalet.com
- SSL enabled
- "Book on Airbnb" button
- Analytics

## Phase 6: Direct Booking

- Calendar with availability
- Airbnb/VRBO sync (30 min)
- Stripe payments
- Security deposits
- Email confirmations
- Export bookings to OTAs

## Phase 7: 360° Tour

- VR video player
- Mouse/touch/gyroscope controls
- Fullscreen mode

## Phase 8: Interactive Floor Plan

- 3-level clickable floor plans
- Click rooms → view photos
- Smooth animations

## Phase 9: Location Map

- Interactive map
- Nearby attractions
- Seasonal activities

---

# TECHNICAL VERSION

## Phase 1: Setup

### Installation

```bash
bun create astro@latest alpine-court-chalet
cd alpine-court-chalet

# Core
bun add react react-dom
bun add -d @types/react @types/react-dom

# Styling
bun add tailwindcss @tailwindcss/typography framer-motion clsx

# Media
bun add video.js videojs-vr
bun add yet-another-react-lightbox react-img-mapper

# Booking (Phase 6)
bun add @demark-pro/react-booking-calendar node-ical ics date-fns
bun add stripe @stripe/stripe-js @stripe/react-stripe-js

# Maps (Phase 9)
bun add react-leaflet leaflet
bun add -d @types/leaflet

bunx astro add react tailwind sitemap
```

### Environment Variables

```bash
# .env
PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Phase 6
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
AIRBNB_ICAL_URL=https://airbnb.com/calendar/ical/xxx.ics

# Phase 7
VIMEO_VIDEO_ID=xxx
```

### Astro Config

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://alpinecourtchalet.com",
  integrations: [react(), tailwind(), sitemap()],
});
```

### Media Storage

**Upload to Cloudinary** (not in repo):

- All images → Cloudinary free tier (25GB)
- Hero loop video → Cloudinary (<100MB compressed)
- Regular property tour → Cloudinary (<100MB)
- 360° video → Vimeo Standard ($20/mo)

**Cloudinary Helper**:

```ts
// src/lib/cloudinary.ts
const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}`;

export const cloudinaryUrl = (id: string, transform = "w_1920,q_auto,f_auto") =>
  `${BASE}/image/upload/${transform}/alpine-court-chalet/${id}`;

export const cloudinaryVideo = (id: string, transform = "q_auto") =>
  `${BASE}/video/upload/${transform}/alpine-court-chalet/${id}`;
```

---

## Phase 2: Core Structure

### File Structure

```
src/
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   └── house-rules.astro
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── HeroVideo.astro
│   └── PropertyOverview.astro
└── lib/
    └── cloudinary.ts
```

### Components to Build

**Header.astro**:

- Sticky navigation
- Logo/site name
- Links: Home, Gallery, House Rules
- "Book Now" CTA
- Mobile hamburger menu

**HeroVideo.astro**:

- Full-screen video background (autoplay, loop, muted)
- Overlay with site title and Airbnb CTA button
- Source video from `cloudinaryVideo('hero-loop')`

**PropertyOverview.astro**:

- Scrolling background gallery effect
- Property specs (5 bed, 5 bath, 12 guests)
- Key amenities list
- Responsive layout

**Footer.astro**:

- Contact information
- Links to pages
- Social media icons (if applicable)

---

## Phase 3: Gallery & Video

### Components to Build

**PhotoGallery.tsx** (React):

- Grid layout (3 cols desktop, 2 tablet, 1 mobile)
- Load images from Cloudinary with `cloudinaryUrl()`
- Click opens `yet-another-react-lightbox`
- Keyboard/swipe navigation

**PropertyVideo.astro**:

- HTML5 video player with controls
- Source from `cloudinaryVideo('property-tour')`
- Poster image for thumbnail

### Integration

```astro
---
// pages/index.astro
import PhotoGallery from "../components/PhotoGallery.tsx";
---

<PhotoGallery client:load />
```

---

## Phase 4: SEO

### Base Layout with Full SEO

```astro
---
// layouts/BaseLayout.astro
import { cloudinaryUrl } from "../lib/cloudinary";

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const {
  title = "Alpine Court Chalet - Luxury 5-Bedroom Ski Chalet",
  description = "Exclusive luxury mountain chalet with 5 bedrooms, squash court, hot tub, and ski-in access",
  image = cloudinaryUrl("hero-exterior", "w_1200,h_630,c_fill,q_auto"),
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />

    <!-- Schema.org -->
    <script
      type="application/ld+json"
      set:html={JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VacationRental",
        name: "Alpine Court Chalet",
        url: "https://alpinecourtchalet.com",
        description: description,
        containsPlace: {
          "@type": "Accommodation",
          occupancy: { "@type": "QuantitativeValue", value: 12 },
          numberOfBedrooms: 5,
          numberOfBathroomsTotal: 5,
          amenityFeature: [
            {
              "@type": "LocationFeatureSpecification",
              name: "wifi",
              value: true,
            },
            {
              "@type": "LocationFeatureSpecification",
              name: "hotTub",
              value: true,
            },
            {
              "@type": "LocationFeatureSpecification",
              name: "kitchen",
              value: true,
            },
          ],
        },
        checkinTime: "16:00:00",
        checkoutTime: "11:00:00",
        image: [
          cloudinaryUrl("exterior-1"),
          cloudinaryUrl("living-room-1"),
          cloudinaryUrl("kitchen-1"),
        ],
      })}
    />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### robots.txt

```
User-agent: *
Allow: /
Sitemap: https://alpinecourtchalet.com/sitemap-index.xml
```

---

## Phase 5: Deployment

### Cloudflare Pages Setup

1. **Connect Git**: Dashboard → Workers & Pages → Create → Connect to Git
2. **Build settings**:
   ```
   Build command: bun run build
   Build output: dist
   Node version: 20
   ```
3. **Environment variables**: Add Cloudinary keys
4. **Custom domain**: Add `alpinecourtchalet.com`
5. **GoDaddy**: Update nameservers to Cloudflare's
6. **SSL**: Automatic via Cloudflare

### Deploy

```bash
git push origin main
```

Cloudflare builds automatically.

---

## Phase 6: Direct Booking

### Database Setup

Use **Cloudflare D1** (serverless SQLite):

```sql
CREATE TABLE bookings (
  id TEXT PRIMARY KEY,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guest_name TEXT,
  guest_email TEXT,
  num_guests INTEGER,
  total_amount DECIMAL(10,2),
  stripe_payment_id TEXT,
  source TEXT DEFAULT 'direct',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Components to Build

**BookingCalendar.tsx**:

- Uses `@demark-pro/react-booking-calendar`
- Fetches reserved dates from `/api/reserved-dates`
- Shows available dates
- On date selection → navigate to checkout

**StickyBookingWidget.tsx**:

- Fixed bottom-right button
- Opens modal with BookingCalendar
- Framer Motion animations

**CheckoutForm.tsx**:

- Stripe Elements integration
- Collect guest details
- Process payment + security deposit hold
- Confirmation redirect

### API Routes to Build

**`/api/reserved-dates`**: Query D1, return all bookings
**`/api/sync-calendar`**: Import Airbnb iCal using `node-ical`, save to D1
**`/api/calendar.ics`**: Generate iCal feed from direct bookings using `ics`
**`/api/create-payment-intent`**: Create Stripe payment + deposit authorization

### Cloudflare Worker for Cron

Create separate Worker that calls `/api/sync-calendar` every 30 min:

```toml
# wrangler.toml
[triggers]
crons = ["*/30 * * * *"]
```

### Setup in Airbnb/VRBO

1. **Export your feed**: Give them `https://alpinecourtchalet.com/api/calendar.ics`
2. **Import their feed**: Add Airbnb iCal URL to env vars
3. Cron syncs both ways every 30 min

---

## Phase 7: 360° Tour

### Vimeo Setup

1. Upload 360° video to Vimeo Standard ($20/mo)
2. Enable 360° video in settings
3. Get video ID

### Component to Build

**Virtual360Tour.tsx**:

- Initialize Video.js with `videojs-vr` plugin
- Set `projection: '360'`
- Enable gyroscope controls for mobile
- Add keyboard/mouse controls
- Fullscreen button

### Page

```astro
---
// pages/virtual-tour.astro
import Virtual360Tour from "../components/Virtual360Tour.tsx";
---

<Virtual360Tour vimeoId="your-video-id" client:only="react" />
```

---

## Phase 8: Interactive Floor Plan

### Floor Plan Data Structure

Organize by level with room coordinates:

```ts
const floorPlans = {
  level2: { name: 'Level 2', image: 'floor-plan-level2', rooms: [...] },
  level1: { name: 'Level 1', image: 'floor-plan-level1', rooms: [...] },
  level0: { name: 'Level 0', image: 'floor-plan-level0', rooms: [...] }
};

// Each room has:
// - id, name, SVG path, array of photo IDs
```

### Component to Build

**InteractiveFloorPlan.tsx**:

- Level selector (tabs)
- SVG with floor plan as background image
- Clickable path overlays for each room
- Hover effects (highlight + label)
- Click → open modal with room photos
- Lightbox for full-screen viewing

### Creating SVG Coordinates

Use Figma or https://www.image-map.net/ to trace rooms and get path/coordinates from the client's floor plan images.

---

## Phase 9: Location Map

### Component to Build

**LocationMap.tsx**:

- React Leaflet with OpenStreetMap tiles
- Custom emoji markers for:
  - 🏠 Property
  - ⛷️ Ski mountain
  - 🍽️ Restaurants
  - 🥾 Hiking trails
  - 🏘️ Town center
- Click markers → popup with details
- Seasonal activities section below map

### Page

```astro
---
// pages/location.astro
import LocationMap from "../components/LocationMap.tsx";
---

<LocationMap client:load />
```

---

## Cost Summary

**Monthly**:

- Cloudflare Pages: $0
- Cloudinary: $0 (free tier)
- Vimeo Standard: $20
- Domain: ~$1
- Stripe: 2.9% + $0.30/transaction

**Total: ~$21/month + transaction fees**

---

## Tech Stack

- **Framework**: Astro + React + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Media**: Cloudinary + Vimeo + Video.js
- **Booking**: @demark-pro/calendar + node-ical + Stripe
- **Maps**: React Leaflet + OpenStreetMap
- **Hosting**: Cloudflare Pages + Workers + D1
- **Domain**: GoDaddy → Cloudflare DNS

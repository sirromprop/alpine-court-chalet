# Alpine Court Chalet

Marketing website for Alpine Court Chalet, a luxury 5-bedroom ski chalet vacation rental. Features property showcase, photo gallery, house rules, and booking integration.

**Live site:** [alpinecourtchalet.com](https://alpinecourtchalet.com)

## Tech Stack

- **Framework:** Astro + React + TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **Media:** Cloudinary CDN
- **Hosting:** Cloudflare Pages

## Development

```bash
# Install dependencies
bun install

# Start dev server (localhost:4321)
bun dev

# Build for production
bun build

# Preview production build
bun preview
```

## Code Quality

```bash
# Run all checks (typecheck + lint + format)
bun run check

# Individual checks
bun run typecheck     # TypeScript + Astro check
bun run lint          # ESLint (strict, zero warnings)
bun run format:check  # Prettier check

# Auto-fix
bun run lint:fix      # Fix ESLint issues
bun run format        # Format all files
```

## Project Structure

```
src/
├── components/    # Astro/React components
├── layouts/       # Page layouts
├── lib/           # Utilities (cloudinary, etc.)
└── pages/         # File-based routing
```

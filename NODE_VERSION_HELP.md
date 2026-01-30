# Node.js Version Issue

Your system has Node.js v16.19.1 installed. This project requires Node.js v18 or higher.

## Options to Fix:

### Option 1: Update Node.js (Recommended)

1. Download and install Node.js v20 LTS from: https://nodejs.org/
2. After installation, restart your terminal and run:
   ```bash
   node --version  # Should show v20.x.x or higher
   npm install
   npm run dev
   ```

### Option 2: Use a Simple HTTP Server

You can still preview the built application with a simple HTTP server:

1. Build the application:
   ```bash
   npm run build
   ```

2. Install a simple HTTP server globally:
   ```bash
   npm install -g http-server
   ```

3. Serve the built files:
   ```bash
   cd dist
   http-server -p 8080
   ```

4. Open browser to: http://localhost:8080

### Option 3: Use Python (if available)

If you have Python installed:

```bash
npm run build
cd dist
python -m http.server 8080
```

Then open: http://localhost:8080

## Quick Test Without Building

You can also open the `index.html` file directly in your browser, but some features may not work due to CORS restrictions.

## What This App Does

- **Header**: Shows "DGR Exclusion" title
- **Company Selector**: Horizontal scrollable list of company logos (click to switch companies)
- **Left Panel**: Grid of all available goods (50x50px images)
- **Right Panel**: Narrow column showing selected goods
- **Selection**: Click goods to add/remove from selection
- **Exclusions**: Conflicting goods highlighted in red with pulsing animation
- **Footer**: Displays exclusion warning messages

## PWA Features

Once running with Node v18+, the app will:
- Work offline after first visit
- Be installable on mobile and desktop
- Auto-update when new versions are available

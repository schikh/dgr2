# DGR Exclusion App - Deployment Guide

## Prerequisites

Before deploying, ensure you have:
- Node.js v18 or higher installed
- All dependencies installed (`npm install`)
- All company images in `/companies/` folder
- All goods images in `/goods/` folder
- Valid `goods.json` in `/public/` folder

## Local Development

### 1. Update Node.js (if needed)

If you see errors about Node.js version:
```bash
node --version  # Check current version
```

If less than v18, download from: https://nodejs.org/

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

This creates optimized files in the `dist/` folder.

### 5. Preview Production Build

```bash
npm run preview
```

## Deployment Options

### Option 1: Static Web Hosting (Recommended for PWA)

Deploy the `dist/` folder to any static hosting service:

#### Netlify
1. Sign up at https://netlify.com
2. Drag and drop the `dist/` folder
3. Your app is live!

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### GitHub Pages
```bash
# Build the app
npm run build

# Add to GitHub
git add dist
git commit -m "Build production"
git subtree push --prefix dist origin gh-pages
```

### Option 2: Self-Hosted Server

#### Using Node.js HTTP Server
```bash
npm install -g http-server
cd dist
http-server -p 8080
```

#### Using Python
```bash
cd dist
python -m http.server 8080
```

#### Using IIS (Windows Server)
1. Build the app: `npm run build`
2. Copy `dist/` contents to IIS web directory
3. Configure IIS site to serve the folder
4. Enable HTTPS for PWA features

### Option 3: Docker Container

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t dgr-exclusion .
docker run -p 8080:80 dgr-exclusion
```

## PWA Configuration

### HTTPS Requirement
PWAs require HTTPS (except on localhost). Ensure your deployment uses:
- SSL/TLS certificate
- HTTPS protocol
- Valid domain name

### Service Worker
The service worker is automatically generated during build. It will:
- Cache all static assets
- Enable offline functionality
- Auto-update when new versions are deployed

### Testing PWA Features

1. **Chrome DevTools**
   - Open DevTools (F12)
   - Go to Application tab
   - Check Service Workers
   - Check Manifest
   - Use Lighthouse for PWA audit

2. **Install on Mobile**
   - iOS: Safari → Share → Add to Home Screen
   - Android: Chrome → Menu → Install App

3. **Test Offline**
   - Open app
   - Open DevTools → Network
   - Select "Offline"
   - Reload page - should still work

## Environment Variables

No environment variables required. All configuration is in:
- `vite.config.ts` - Build and PWA settings
- `public/goods.json` - Application data

## Updating the App

### Adding New Goods
1. Add good name to `public/goods.json` → `goods` array
2. Add 50x50px image to `/goods/` folder
3. Update `getGoodImagePath()` mapping in `src/App.tsx`
4. Build and deploy

### Adding Exclusions
1. Add exclusion object to `public/goods.json` → `exclusions` array
2. Build and deploy

### Changing Companies
1. Add company name to `public/goods.json` → `companies` array
2. Add company logo to `/companies/` folder
3. Build and deploy

## Troubleshooting

### Build Errors

**"Node version too old"**
- Solution: Update to Node.js v18+

**"Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Runtime Errors

**Images not loading**
- Check file paths match exactly (case-sensitive)
- Verify images are in correct folders
- Check browser console for 404 errors

**Service Worker not registering**
- Must use HTTPS or localhost
- Check browser console for errors
- Clear browser cache and try again

**PWA not installable**
- Must be served over HTTPS
- Check manifest.json is valid
- Ensure icons are accessible

### Performance Issues

**Slow loading**
- Optimize images (compress, correct sizes)
- Enable gzip compression on server
- Use CDN for faster delivery

**Large bundle size**
```bash
npm run build -- --report
```
Analyze bundle and remove unused dependencies

## Security Considerations

1. **HTTPS Only**: Always use HTTPS in production
2. **CSP Headers**: Configure Content Security Policy
3. **CORS**: Set appropriate CORS headers if using APIs
4. **Data Validation**: Validate goods.json structure

## Monitoring

### Check PWA Health
- Use Google Lighthouse
- Monitor service worker updates
- Track installation rates

### Analytics (Optional)
Add analytics to `src/App.tsx`:
```typescript
useEffect(() => {
  // Google Analytics, Plausible, etc.
}, []);
```

## Backup Strategy

1. **Code**: Use Git for version control
2. **Data**: Backup `goods.json` regularly
3. **Images**: Keep master copies of all images
4. **Database**: If adding backend, backup regularly

## Support Checklist

Before going live:
- [ ] Node.js v18+ installed
- [ ] All dependencies installed
- [ ] All images present and correct size
- [ ] goods.json is valid JSON
- [ ] Build succeeds without errors
- [ ] PWA features tested (offline, install)
- [ ] Tested on mobile devices
- [ ] HTTPS configured
- [ ] Domain name configured
- [ ] Backup strategy in place

## Getting Help

Common issues documented in:
- `README.md` - General usage
- `NODE_VERSION_HELP.md` - Node.js version issues
- GitHub Issues - Report bugs
- Stack Overflow - Technical questions

## License

[Add your license information here]

---

**Last Updated**: January 2026

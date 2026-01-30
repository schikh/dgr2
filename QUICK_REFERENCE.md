# DGR Exclusion App - Quick Reference

## 🎯 What It Does

A web app that helps users select dangerous goods and warns them if their selections violate exclusion rules.

## 📐 Layout

```
┌─────────────────────────────────────────────┐
│  HEADER: "DGR Exclusion"                    │
├─────────────────────────────────────────────┤
│  [🏢] [🏢] [🏢] [🏢]  ← Company logos       │
├─────────────────────────────┬───────────────┤
│                             │               │
│  LEFT PANEL (All Goods)     │  RIGHT PANEL  │
│                             │  (Selected)   │
│  [📦] [📦] [📦] [📦] [📦]    │               │
│  [📦] [📦] [📦] [📦] [📦]    │   [📦]        │
│  [📦] [📦] [📦] [📦] [📦]    │   [📦]        │
│  [📦] [📦] [📦] [📦] [📦]    │   [📦]        │
│                             │               │
│  ↕ scrollable               │  ↕ scrollable │
│                             │               │
├─────────────────────────────┴───────────────┤
│  FOOTER: Exclusion warnings appear here    │
└─────────────────────────────────────────────┘
```

## 🎨 Visual States

### Normal Good
```
┌────────┐
│  📦   │  ← 50x50px image
│ NAME   │  ← Label
└────────┘
```

### Selected Good
```
┌────────┐
│  📦   │  ← Blue border
│ NAME   │  ← Appears in right panel
└────────┘
```

### Excluded Good (Conflict!)
```
┌────────┐
│  📦   │  ← RED border (pulsing!)
│ NAME   │  ← Warning in footer
└────────┘
```

## 🎮 User Interactions

### Select a Company
1. Click on a company logo at the top
2. Logo gets blue border
3. Only that company's exclusions apply

### Select a Good
1. Click on any good in the left panel
2. Good appears in the right panel
3. Good gets blue border in left panel

### Deselect a Good
1. Click on the good again (left or right panel)
2. Good is removed from right panel
3. Blue border removed

### Exclusion Warning
1. Select two conflicting goods
2. Both goods turn RED with pulsing animation
3. Footer shows warning message
4. Example: "RCX-CL1.3C can not be selected with RXB-CL1.4B"

## 🔧 Quick Fixes

### Images Not Showing
**Problem**: Goods or company images show as broken
**Solution**: 
1. Check file exists in correct folder
2. Check filename matches exactly (case-sensitive)
3. Update image map in `src/App.tsx` if needed

### Can't Start Dev Server
**Problem**: `npm run dev` fails
**Solution**:
```bash
# Check Node version
node --version

# If less than v18, update Node.js
# Then reinstall
rm -rf node_modules
npm install
npm run dev
```

### PWA Not Installing
**Problem**: No install option appears
**Solution**:
- Must use HTTPS (or localhost)
- Check manifest.json is valid
- Check icon.svg exists in /public/
- Try different browser

### Exclusion Not Working
**Problem**: Conflicting goods not highlighted
**Solution**:
1. Check goods.json has the exclusion
2. Check company is selected
3. Check good names match exactly
4. Open browser console for errors

## 📝 Common Tasks

### Add a New Good
1. Add image to `/goods/` folder (50x50px PNG)
2. Edit `/public/goods.json`:
   ```json
   "goods": [
     "EXISTING-GOOD",
     "NEW-GOOD"  ← Add here
   ]
   ```
3. Edit `src/App.tsx`, update `getGoodImagePath()`:
   ```typescript
   'NEW-GOOD': 'filename.png'
   ```
4. Build and test:
   ```bash
   npm run build
   npm run preview
   ```

### Add an Exclusion
Edit `/public/goods.json`:
```json
"exclusions": [
  {
    "company": "default",
    "p1": "GOOD-A",
    "p2": "GOOD-B",
    "text": "GOOD-A can not be selected with GOOD-B"
  }
]
```

### Add a Company
1. Add logo to `/companies/` folder (PNG)
2. Edit `/public/goods.json`:
   ```json
   "companies": [
     "default",
     "New Company"  ← Add here
   ]
   ```
3. Add exclusions for that company

### Change Colors
Edit `/src/App.css`:
```css
:root {
  --bg-primary: #1a1a1a;      ← Main background
  --bg-secondary: #2d2d2d;    ← Panels
  --accent-color: #007bff;    ← Selection
  --danger-color: #dc3545;    ← Exclusions
}
```

## 📱 Testing Checklist

Before deployment:
- [ ] All goods images present (50x50px)
- [ ] All company logos present
- [ ] goods.json is valid JSON
- [ ] Test on Chrome desktop
- [ ] Test on Chrome mobile (DevTools)
- [ ] Test on Safari (iOS)
- [ ] Test offline mode
- [ ] Test exclusions work
- [ ] Test company switching
- [ ] Verify footer messages

## 🚀 Deployment Steps

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Test production build locally**
   ```bash
   npm run preview
   ```

3. **Deploy `dist/` folder to:**
   - Netlify (drag & drop)
   - Vercel (`vercel --prod`)
   - Your web server
   - GitHub Pages

4. **Enable HTTPS** (required for PWA)

5. **Test on real mobile device**

## 📞 Command Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npx tsc --noEmit

# Check for errors
npm run build
```

## 🔍 File Locations

- **Data**: `/public/goods.json`
- **Company Images**: `/companies/*.png`
- **Goods Images**: `/goods/*.png`
- **Main Component**: `/src/App.tsx`
- **Styles**: `/src/App.css`
- **Config**: `/vite.config.ts`

## 💡 Tips

- Use browser DevTools to debug (F12)
- Check Console tab for errors
- Use Network tab to see failed image loads
- Use Application tab to check service worker
- Use Lighthouse to audit PWA

## ⚠️ Important Notes

- **Case Sensitivity**: Filenames are case-sensitive on Linux/Mac
- **HTTPS Required**: PWA features need HTTPS (except localhost)
- **Image Sizes**: Keep images at 50x50px for best performance
- **Browser Cache**: Clear cache if changes don't appear
- **Node Version**: Requires Node.js v18 or higher

## 🎓 Learning Resources

- React: https://react.dev
- TypeScript: https://typescriptlang.org
- Vite: https://vitejs.dev
- PWA: https://web.dev/progressive-web-apps
- Bootstrap: https://getbootstrap.com

---

**Quick Help**: Open browser console (F12) to see error messages!

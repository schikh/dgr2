# DGR Exclusion Progressive Web Application

A modern Progressive Web App (PWA) for managing DGR (Dangerous Goods Regulations) exclusions across different companies.

## Features

- 📱 **Mobile-First Design**: Optimized for phones, tablets, and desktops
- 🌙 **Dark Theme**: Modern dark UI with clean, professional styling
- 🔄 **Offline Support**: Works without internet connection once installed
- 📲 **Installable**: Can be installed on mobile devices and desktop
- 🚀 **Auto-Update**: Automatically updates when new versions are available
- ⚠️ **Real-time Exclusion Detection**: Highlights conflicting goods in red
- 🏢 **Multi-Company Support**: Switch between different company regulations

## Technology Stack

- **React 18.3** - UI framework
- **TypeScript 5.7** - Type-safe development
- **Vite 6.0** - Fast build tool and dev server
- **Bootstrap 5.3** - Responsive UI components
- **PWA Plugin** - Service worker and offline support

## Project Structure

```
DGR/
├── public/
│   ├── goods.json          # Data file with companies, goods, and exclusions
│   ├── icon-192.svg        # PWA icon (192x192)
│   └── icon-512.svg        # PWA icon (512x512)
├── companies/              # Company logo images
│   ├── default.png
│   ├── asiana.png
│   ├── americas air line.png
│   └── china.png
├── goods/                  # Goods/product images (50x50px)
│   ├── RCX-1.3C.png
│   ├── RGX-1.3G.png
│   └── ... (more goods)
├── src/
│   ├── App.tsx            # Main application component
│   ├── App.css            # Application styles
│   ├── main.tsx           # Entry point with PWA registration
│   ├── types.ts           # TypeScript type definitions
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite and PWA configuration

```

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

   This creates optimized files in the `dist/` folder.

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Usage

### Basic Operation

1. **Select Company**: Click on a company logo at the top to filter exclusions
2. **Select Goods**: Click on any good in the left panel to add it to selection
3. **View Selection**: Selected goods appear in the right panel
4. **Exclusion Warnings**: 
   - Goods with conflicts are highlighted in red
   - Warning messages appear in the footer
   - Both conflicting goods pulse with red border

### Features Explained

- **Left Panel**: Shows all available goods with 50x50px images
- **Right Panel**: Displays only selected goods in a compact column
- **Header**: Static "DGR Exclusion" title
- **Company Bar**: Horizontal scrollable list of company logos
- **Footer**: Shows exclusion warnings when conflicts are detected

## Data Format

The `goods.json` file structure:

```json
{
  "companies": ["default", "Asiana", "Americas Air Line", "China"],
  "goods": ["RCX-CL1.3C", "RGX-CL1.3G", ...],
  "exclusions": [
    {
      "company": "default",
      "p1": "RCX-CL1.3C",
      "p2": "RXB-CL1.4B",
      "text": "RCX-CL1.3C can not be selected with RXB-CL1.4B"
    }
  ]
}
```

## PWA Features

### Installation

- **Desktop**: Click the install button in the browser address bar
- **Mobile**: 
  - iOS: Tap Share → Add to Home Screen
  - Android: Tap the menu → Install App

### Offline Mode

Once installed, the app works completely offline. All data, images, and functionality are cached.

### Updates

The app automatically checks for updates every minute and installs them in the background.

## Development

### Code Quality

- Modern, readable TypeScript
- Single-purpose functions
- Comments above major sections
- Meaningful naming conventions
- Strict type checking enabled

### Key Components

- **App.tsx**: Main component with state management
- **State Management**: 
  - `selectedCompany`: Currently active company
  - `selectedGoods`: Array of selected good names
  - `footerText`: Exclusion warning messages

### Functions

- `hasExclusion()`: Checks if a good conflicts with selections
- `getExclusionTexts()`: Retrieves all active exclusion messages
- `toggleGoodSelection()`: Adds/removes goods from selection
- `getGoodImagePath()`: Maps good names to image files
- `getCompanyImagePath()`: Maps company names to logo files

## Customization

### Changing Colors

Edit CSS variables in `App.css`:

```css
:root {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --accent-color: #007bff;
  --danger-color: #dc3545;
}
```

### Adding New Goods

1. Add the good name to `goods` array in `goods.json`
2. Add the 50x50px image to `goods/` folder
3. Update the `imageMap` in `getGoodImagePath()` function

### Adding Exclusions

Add exclusion objects to the `exclusions` array in `goods.json`:

```json
{
  "company": "default",
  "p1": "GOOD1",
  "p2": "GOOD2",
  "text": "Warning message"
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## License

[Add your license here]

## Support

For issues or questions, please contact [your contact information].

---

**Built with ❤️ using React, TypeScript, and modern web technologies**

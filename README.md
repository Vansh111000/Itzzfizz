# Scroll-Driven Hero Animation

A premium scroll-driven hero section built with **Next.js**, **React**, **Tailwind CSS**, and **GSAP ScrollTrigger**.

## Features

- ✨ **Staggered Text Animation**: "WELCOME ITZ FIZZ" text reveals letter-by-letter as you scroll
- 📊 **Sequential Stats**: Statistics appear after the title is fully visible
- 🎯 **Scroll-Linked**: All animations respond directly to scroll position
- 📱 **Fully Responsive**: Works on desktop, tablet, and mobile
- ♿ **Accessible**: Respects `prefers-reduced-motion` preferences

## How to Run

### Prerequisites
- **Node.js** 18+ installed
- **npm** or **yarn** package manager

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd "v folder/proj 1"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Development Server

Start the development server:
```bash
npm run dev
```

The app will open at **http://localhost:3000** in your browser.

### Build for Production

Create an optimized production build:
```bash
npm run build
```

### Run Production Build

Start the production server:
```bash
npm start
```

## Project Structure

```
├── app/
│   ├── layout.js          # Root layout with fonts
│   ├── page.js            # Main page
│   └── globals.css        # Global styles
├── components/
│   ├── Hero.jsx           # Main hero with scroll animation
│   ├── Stats.jsx          # Statistics component
│   └── SecondSection.jsx  # Content section
├── public/
│   └── images/            # Image assets
└── package.json           # Dependencies
```

## How It Works

### Animation Flow

1. **Initial State**: Text and stats are hidden (opacity: 0, y: 30px)
2. **Scroll 0-50%**: "WELCOME ITZ FIZZ" words stagger in with 0.3s delay between each
3. **Scroll 50-100%**: Statistics fade in with stagger as user continues scrolling

### Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework |
| **React 19** | UI library |
| **Tailwind CSS 4** | Styling |
| **GSAP 3** | Advanced animations |
| **ScrollTrigger** | Scroll-linked animations |

## Customization

### Change Animation Timing

Edit `components/Hero.jsx`:
```javascript
// Modify scroll duration and stagger
scrollTl.to(words, {
  opacity: 1,
  y: 0,
  duration: 2,        // Change to adjust speed
  stagger: 0.3,       // Change to adjust spacing between words
}, 0);
```

### Adjust Wrapper Height

For more/less scroll space:
```javascript
// In Hero.jsx JSX
<div ref={wrapperRef} className="relative h-[300vh] w-full">
  {/* h-[300vh] = 3x viewport height */}
</div>
```

### Change Colors

Edit `app/globals.css`:
```css
:root {
  --background: #0a0a0c;    /* Dark background */
  --foreground: #f5f5f5;    /* Light text */
  --accent: #7dd3fc;        /* Blue accent */
  --accent-warm: #fca5a5;   /* Red accent */
}
```

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

- Uses **transform** and **opacity** only for GPU acceleration
- **No layout shifts** - all animations are compositor-friendly
- **ScrollTrigger scrub** for smooth scroll-linked animation

---

# Itzzfizz

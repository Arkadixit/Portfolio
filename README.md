# Portfolio Website

A minimalist, Apple-like static portfolio website built with pure HTML, CSS, and vanilla JavaScript. No build step required — fully compatible with GitHub Pages.

## 📁 Project Structure

```
portfolio/
├── index.html          # Home page
├── academic.html       # Academic projects page
├── personal.html       # Personal projects page
├── css/
│   └── style.css       # All styles with CSS variables
├── js/
│   └── main.js         # Modal, navigation, and interactions
├── images/             # Project images (optional)
└── README.md           # This file
```

## ✨ Features

- **Apple-like minimalist design**: Clean typography, generous whitespace, subtle shadows
- **Fully responsive**: Mobile-first approach with breakpoints for tablet and desktop
- **Accessible**: Semantic HTML, keyboard navigation, ARIA labels, ESC to close modals
- **Smooth animations**: Subtle hover effects and modal transitions (respects `prefers-reduced-motion`)
- **Zero dependencies**: No frameworks, no build tools, just HTML/CSS/JS
- **Project modals**: Clickable cards with detailed project information

## 🚀 Deploy to GitHub Pages

### Option 1: Root of Repository

1. Create a new GitHub repository
2. Push all files from the `portfolio/` folder to the root of your repository
3. Go to **Settings** → **Pages**
4. Under "Source", select **Deploy from a branch**
5. Choose `main` branch and `/ (root)` folder
6. Click **Save**
7. Your site will be live at `https://yourusername.github.io/repository-name/`

### Option 2: Using a `docs` Folder

1. Rename the `portfolio/` folder to `docs/`
2. Push to your repository
3. Go to **Settings** → **Pages**
4. Under "Source", select **Deploy from a branch**
5. Choose `main` branch and `/docs` folder
6. Click **Save**

### Option 3: User/Organization Site

1. Create a repository named `yourusername.github.io`
2. Push all files from `portfolio/` to the root
3. The site will automatically be available at `https://yourusername.github.io/`

## 🎨 Customization

### Update Personal Information

1. **Name & Title**: Edit the hero section in `index.html`
2. **Social Links**: Update the footer links in all three HTML files
3. **Copyright**: Update the footer text with your name

### Add Project Images

1. Place images in the `images/` folder
2. Update the `data-images` attribute on project cards:
   ```html
   data-images='["images/project1-screenshot1.jpg", "images/project1-screenshot2.jpg"]'
   ```

### Modify Colors

Edit the CSS variables in `css/style.css`:

```css
:root {
  --color-bg: #ffffff;
  --color-accent: #0071e3;
  --color-text-primary: #1d1d1f;
  /* ... more variables */
}
```

### Add New Projects

Copy an existing `<article class="project-card">` element and update:
- `data-title`: Full project title
- `data-theme`: Theme/category tag
- `data-description`: Detailed description (120-220 words)
- `data-contributions`: JSON array of key contributions
- `data-tech-stack`: JSON array of technologies
- `data-images`: JSON array of image paths

## 🧪 Local Development

Simply open `index.html` in your browser. No server required!

For live reload during development, you can use any simple HTTP server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if you have npx)
npx serve

# VS Code Live Server extension
# Right-click on index.html → "Open with Live Server"
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

The site uses modern CSS features like CSS variables, flexbox, and grid, with a `backdrop-filter` for the frosted glass header effect.

## 📄 License

Feel free to use this template for your own portfolio. Attribution appreciated but not required.

# iFiCode Website

This is a static website for iFiCode, a digital agency that specializes in web development, mobile app development, UI/UX design, cloud & DevOps, AI & automation, and blockchain & web3 services.

## Project Structure

```
├── index.html          # Main HTML file
├── css/
│   └── styles.css     # CSS styles
├── js/
│   └── main.js        # JavaScript functionality
└── images/
    ├── hero-bg.svg    # Hero section background
    └── cta-bg.svg     # CTA section background
```

## Features

- Responsive design that works on all devices
- Modern and clean UI with smooth animations
- Interactive elements like counters and sliders
- Mobile-friendly navigation

## Technologies Used

- HTML5
- CSS3 (with modern features like Grid, Flexbox, and CSS Variables)
- Vanilla JavaScript (no frameworks)
- Font Awesome for icons

## How to Run

Since this is a static website, you can simply open the `index.html` file in any modern web browser to view the site.

Alternatively, you can use a local development server:

### Using Python (Python 3)

```bash
python -m http.server
```

Then open your browser and navigate to `http://localhost:8000`

### Using Node.js (with npm)

First, install `http-server` globally:

```bash
npm install -g http-server
```

Then run:

```bash
http-server
```

And navigate to the URL shown in the terminal (usually `http://localhost:8080`)

## Customization

- Colors: Edit the CSS variables in the `:root` selector in `styles.css`
- Content: Modify the text in `index.html`
- Images: Replace the SVG files in the `images` folder with your own images
- Functionality: Extend or modify the JavaScript in `main.js`

## Browser Compatibility

This website is compatible with all modern browsers including:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

This project is available for personal and commercial use.
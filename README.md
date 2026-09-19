# Circadia — Landing Page

Pre-launch waitlist page for **Circadia**, an iOS app for a short nightly wind-down ritual tuned to the phase of the moon.

Plain HTML/CSS/JS. No build step, no dependencies.

## Run it locally

```bash
npm start
```

Then open http://localhost:3000.

## Structure

```
circadia-landing/
├── index.html               # single page: hero + animation + waitlist card + three notes
├── css/style.css            # ethereal theme, atmosphere (nebula/stars/grain), glass card
├── js/script.js             # waitlist form, reveal-on-scroll, starfield
├── assets/video/ritual.*    # the app's splash animation, cropped to the meditation scene (webm + mp4)
├── assets/images/           # logo mark, full lockup, video poster frame
└── server.js                # zero-dependency static file server
```

## Before launch

- **Waitlist form** only stores emails in `localStorage` (see `js/script.js`). Swap in a real endpoint — Formspree, Mailchimp, ConvertKit, Loops, or your own API — before sharing the page.
- **Social links** in the hero point at `#`. Fill in real profile URLs or remove the icons.
- **Fonts** load from Google Fonts (Cormorant Garamond + Manrope). Self-host them if you want zero third-party requests.

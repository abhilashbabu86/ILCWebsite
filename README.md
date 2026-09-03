# ILC — Indian Logistics Company (Website)

A responsive, single-page website for **Indian Logistics Company (ILC)** built with plain HTML, CSS, and JavaScript. No build step required.

## 📂 Files

```
ilc-website/
├── index.html              ← The page
├── styles.css              ← All styles (responsive)
├── script.js               ← Nav, modals, form submission
├── README.md
└── assets/
    ├── logo.png            ← Header logo (color)
    ├── logo-white.png      ← Footer logo (white version)
    ├── hero-image.png      ← Hero background image
    └── vendor/
        └── fa/             ← Font Awesome (self-hosted, no CDN needed)
            ├── css/all.min.css
            └── webfonts/   ← .woff2 + .ttf for solid/regular/brands
```

Font Awesome is **bundled locally** so the website works offline, loads faster, and has zero CDN dependencies.

## 🚀 How to deploy

Just upload everything in this folder to your web host (or drag-and-drop into Netlify / Vercel / Cloudflare Pages / your cPanel `public_html`). No server needed.

To preview locally: open `index.html` in your browser, **or** run a tiny local server:

```bash
# from inside the ilc-website folder:
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 📧 IMPORTANT — One-time email setup

Forms are wired to **FormSubmit.co** (free, no signup, no API key) — they forward submissions straight to `hello@indianlogisticscompany.com`.

**To activate it (do this ONCE):**

1. Deploy the site (or test locally with `python3 -m http.server`).
2. Open the website and submit ANY form (the footer form is the quickest — use real test data).
3. **Check `hello@indianlogisticscompany.com` inbox** — you'll receive a confirmation email from FormSubmit titled *"Confirm your email"*.
4. Click the **"Confirm your email"** link in that email.
5. ✅ Done! From now on, every form submission will arrive in that inbox.

That's it. There's nothing to install, no API key, no monthly fee. FormSubmit's free tier allows unlimited submissions.

### Changing the recipient email later

Open `script.js` and change this line at the top:

```js
const FORM_EMAIL = 'hello@indianlogisticscompany.com';
```

You'll need to re-confirm if you change it.

### Want a different email service?

Swap `FORM_ENDPOINT` in `script.js` for one of these (no other code changes needed):

- **Web3Forms** — `https://api.web3forms.com/submit` (requires free access key — sign up at web3forms.com)
- **Formspree** — `https://formspree.io/f/YOUR_FORM_ID` (requires sign-up)
- **Your own backend** — point it at your PHP/Node endpoint

## ✨ Features

- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ Smooth scroll navigation between sections
- ✅ Sticky header with active-link highlighting on scroll
- ✅ Mobile hamburger menu
- ✅ **Contact popup** — opens from "Contact Us" nav link, "Contact Us" CTA button. Contains:
  - WhatsApp button (opens chat with +91 91591 47147)
  - Call button
  - Mobile number (tap to call)
  - Email button (opens mail client)
  - Full contact form
- ✅ **Quote popup** — opens from "Get a Quote" buttons. Contains a detailed quote-request form with service / industry / origin / destination / cargo fields.
- ✅ Footer "Get in Touch" inline form
- ✅ Floating WhatsApp button (bottom-right, pulses gently)
- ✅ Scroll-reveal animations on service cards, industries, etc.
- ✅ Form submissions delivered as email to `hello@indianlogisticscompany.com`
- ✅ Loading states + success/error messages on forms
- ✅ Click outside or press `Esc` to close popups
- ✅ Accessible (ARIA labels, keyboard support)

## 🎨 Color theme

| Token | Value | Use |
|------|------|------|
| `--navy` | `#0f2240` | Primary navy (header text, dark sections) |
| `--orange` | `#f56a1f` | Accent / CTAs / highlights |
| `--navy-deep` | `#081326` | Footer background |
| `--bg-soft` | `#f7f9fc` | Soft section backgrounds |

Edit these in `styles.css` at the top (`:root`).

## 📱 WhatsApp & contact details

All hardcoded in `index.html` — search for and replace:
- Phone: `+919159147147` (used in `tel:` and `wa.me/` links — keep this format, no spaces)
- Display phone: `+91 91591 47147`
- Email: `hello@indianlogisticscompany.com`
- Address: in the footer's "CONTACT US" column

## 🔗 Nav links

Per request, only these sections are linked (Infrastructure / Technology / Careers were intentionally omitted):

| Menu item | Scrolls to |
|----------|-----------|
| Home | Hero (`#home`) |
| About Us | About / Why Choose (`#about`) |
| Services | Services grid (`#services`) |
| Industries | Industries grid (`#industries`) |
| Contact Us | Opens contact popup |

Footer "Quick Links" mirror these same five.

## 🛠 Notes

- All "Know More" / "Read More" links are non-functional placeholders (`href="#"`) as requested — they don't do anything when clicked.
- Logo was recreated from the source artwork you provided (cropped & a white version generated for the footer).
- Hero image is the multimodal logistics composite you provided.

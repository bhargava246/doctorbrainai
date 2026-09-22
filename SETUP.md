# ESIC Health Bridge - Setup Guide

Quick setup and customization guide for your ESIC Health Bridge landing page.

## 📁 Project Structure

```
esic-health-bridge/
├── index.html              # Main page - Edit content here
├── css/
│   └── styles.css          # Styling - Change colors, fonts, spacing
├── js/
│   └── script.js           # Interactions - Forms, modals, scrolling
├── package.json            # Project metadata
├── robots.txt              # Search engine crawling
├── sitemap.xml             # Search engine indexing
├── README.md               # Full documentation
├── DEPLOYMENT.md           # Deployment instructions
├── SETUP.md                # This file
└── LICENSE                 # License information
```

## ⚡ Quick Start

### Step 1: Run Locally
```bash
# Using Python (Mac/Linux)
python -m http.server 8000

# Using Node.js
npx http-server . -p 8000

# Visit http://localhost:8000
```

### Step 2: Customize Content
Edit `index.html`:
- Line 55: Change "Navigating ESIC Healthcare..." headline
- Line 56: Update subtitle
- Line 183-223: Modify problem statements
- Line 240-299: Update service descriptions
- Line 404-420: Change stats numbers

### Step 3: Update Branding
Edit `css/styles.css`:
```css
:root {
  --blue-primary: #0066B3;      /* Main color */
  --orange-accent: #FF6B35;     /* CTA buttons */
  --text-primary: #111111;      /* Text color */
}
```

### Step 4: Setup Email
Edit `js/script.js` line 37-41:
```javascript
// Option A: Formspree
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: JSON.stringify(formData)
});
```

### Step 5: Deploy
See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Netlify (easiest)
- Vercel
- GitHub Pages
- AWS S3
- Traditional hosting

---

## 🎨 Customization Guide

### Change Brand Colors

Edit `css/styles.css` line 1-17:

```css
:root {
  --blue-primary: #0066B3;      /* Change to your brand color */
  --orange-accent: #FF6B35;     /* CTA button color */
  --text-primary: #111111;      /* Main text */
  --text-secondary: #626262;    /* Secondary text */
  --bg-subtle: #FAFAFA;         /* Background */
}
```

**Popular colors:**
- Corporate Blue: `#003D82`
- Medical Green: `#00A651`
- Healthcare Teal: `#0ABAB5`
- Professional Navy: `#1A3A52`

### Change Fonts

Edit `index.html` line 6:
```html
<!-- Change font from Plus Jakarta Sans & Inter to your preference -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=YOUR_FONT_NAME&display=swap">
```

Then update `css/styles.css`:
```css
--font-display: 'YOUR_FONT_NAME', sans-serif;
```

**Google Fonts recommendations:**
- Elegant: Playfair Display, Lora, Fraunces
- Modern: Poppins, DM Sans, Mulish
- Minimal: Outfit, Sohne, Space Grotesk

### Update Company Name

1. `index.html` line 20: Logo text
2. `index.html` line 44: Navigation brand
3. `index.html` line 438: Footer copyright
4. `package.json` line 2: Project name

### Change Content Sections

**Hero Section** (line 55-67):
```html
<h1>Your Headline Here</h1>
<p class="subtitle">Your subtitle</p>
```

**Problem Section** (line 80-101):
Update the 4 problem cards with your challenges

**Services Section** (line 116-140):
Update 6 service cards with your offerings

**How It Works** (line 153-180):
Update the 6-step process

**Benefits** (line 200-235):
Update benefits with your unique advantages

### Adjust Spacing

Edit `css/styles.css` line 12-18:
```css
--spacing-xs: 8px;      /* Extra small */
--spacing-sm: 16px;     /* Small */
--spacing-md: 24px;     /* Medium */
--spacing-lg: 40px;     /* Large */
--spacing-xl: 64px;     /* Extra large */
--spacing-2xl: 120px;   /* Section spacing */
```

### Enable Dark Mode

Already built-in! Users can toggle with their OS settings or browser settings.
Dark mode colors are automatically handled.

---

## 📧 Email Integration

### Option 1: Formspree (Easiest)

1. Go to [formspree.io](https://formspree.io)
2. Sign up (free)
3. Create new form
4. Get your form ID: `f_xxxxx`
5. Update `js/script.js` line 39:
```javascript
fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

### Option 2: SendGrid

1. Create account at [sendgrid.com](https://sendgrid.com)
2. Get API key
3. Update form handling in `js/script.js`
4. Backend API needed

### Option 3: Custom Backend

Create your own API endpoint and update form submission in `js/script.js`.

---

## 📊 Analytics Setup

### Google Analytics

Add to `index.html` before `</body>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible Analytics (Privacy-friendly)

Add to `index.html` in `<head>`:
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/plausible.js"></script>
```

---

## 🔍 SEO Optimization

### Update robots.txt
Change `yourdomain.com` to your actual domain:
```
Sitemap: https://yourdomain.com/sitemap.xml
```

### Update sitemap.xml
Change all `yourdomain.com` to your actual domain

### Add Meta Tags
Edit `index.html` to add:
```html
<meta name="description" content="Brief description of your platform">
<meta name="keywords" content="ESIC, healthcare, employees">
<meta name="author" content="Your Company">
<meta property="og:title" content="ESIC Health Bridge">
<meta property="og:description" content="Your platform description">
<meta property="og:image" content="https://yourdomain.com/og-image.png">
```

### Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your domain
3. Verify ownership
4. Submit sitemap

---

## ✅ Pre-Launch Checklist

- [ ] Update company name throughout
- [ ] Customize colors and branding
- [ ] Update all content sections
- [ ] Setup email form (Formspree/SendGrid)
- [ ] Add Google Analytics (optional)
- [ ] Update robots.txt with your domain
- [ ] Update sitemap.xml with your domain
- [ ] Add favicon (if desired)
- [ ] Test form submission
- [ ] Test mobile responsiveness
- [ ] Test dark mode
- [ ] Check links work
- [ ] Proofread all copy
- [ ] Test accessibility (keyboard nav, screen reader)
- [ ] Deploy to hosting
- [ ] Setup SSL/HTTPS
- [ ] Setup custom domain
- [ ] Submit to Google Search Console
- [ ] Monitor analytics

---

## 🐛 Troubleshooting

### Form not working
1. Check form IDs match in HTML and JS
2. Test email service (Formspree/SendGrid)
3. Check browser console for errors
4. Verify email configuration

### Styles not loading
1. Check CSS file path is correct
2. Verify fonts CDN is accessible
3. Clear browser cache (Ctrl+Shift+R)
4. Check for CSS errors in dev tools

### Not responsive on mobile
1. Check viewport meta tag exists
2. Test in mobile device or browser dev tools
3. Check media queries in CSS
4. Verify images have max-width: 100%

### Performance issues
1. Enable gzip compression on server
2. Optimize images
3. Enable caching headers
4. Use CDN (Cloudflare - free)
5. Check PageSpeed Insights

---

## 📞 Support Resources

- **General Help:** README.md
- **Deployment:** DEPLOYMENT.md
- **Code Issues:** GitHub Issues (if using GitHub)
- **Email:** hello@esichealthbridge.com

---

## 🚀 Next Steps

1. ✅ Setup locally
2. ✅ Customize content
3. ✅ Configure email
4. ✅ Deploy to production
5. ✅ Setup analytics
6. ✅ Monitor performance

**Ready to launch!** 🎉

---

Happy customizing! 🚀

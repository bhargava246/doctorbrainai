# Deployment Guide - ESIC Health Bridge

Complete guide to deploy ESIC Health Bridge to production.

## Quick Deploy Options

### 1. Netlify (Recommended - 2 minutes)

**Via Netlify Drop (Easiest)**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag & drop the `esic-health-bridge` folder
3. Your site is live! (example: `determined-einstein-12345.netlify.app`)

**Via Git (Recommended for team)**
1. Push code to GitHub/GitLab/Bitbucket
2. Login to [Netlify](https://app.netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Netlify auto-deploys on every push

**Benefits:**
- Free SSL certificate
- Global CDN
- Automatic deployments
- Custom domain support
- Instant rollbacks

### 2. Vercel (2 minutes)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Click "Deploy"
4. Done! Site is live at `esic-health-bridge.vercel.app`

**Benefits:**
- Zero-config deployment
- Global edge network
- Preview deployments
- Analytics included

### 3. GitHub Pages (Free - 5 minutes)

1. Push code to GitHub repository
2. Go to repository Settings → Pages
3. Select "Deploy from a branch"
4. Branch: `main` (or your default)
5. Click "Save"
6. Site is live at `yourusername.github.io/esic-health-bridge`

**Setup custom domain:**
1. Buy domain (GoDaddy, Namecheap, etc.)
2. Settings → Pages → Custom domain
3. Enter your domain
4. Update DNS records:
   ```
   A: 185.199.108.153
   A: 185.199.109.153
   A: 185.199.110.153
   A: 185.199.111.153
   CNAME: yourusername.github.io
   ```

### 4. AWS S3 + CloudFront (Production-Grade)

**Step 1: Create S3 Bucket**
```bash
aws s3 mb s3://esic-health-bridge-com
```

**Step 2: Enable Static Website Hosting**
```bash
aws s3 website s3://esic-health-bridge-com \
  --index-document index.html \
  --error-document index.html
```

**Step 3: Upload Files**
```bash
aws s3 sync . s3://esic-health-bridge-com \
  --exclude ".git/*" \
  --exclude ".gitignore" \
  --exclude "node_modules/*"
```

**Step 4: Set Bucket Policy**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::esic-health-bridge-com/*"
    }
  ]
}
```

**Step 5: Setup CloudFront**
1. Go to CloudFront in AWS Console
2. Create distribution
3. Origin: S3 bucket
4. Enable HTTPS
5. Add custom domain

### 5. Docker + Any Hosting

**Dockerfile:**
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name _;
    
    root /usr/share/nginx/html;
    index index.html;
    
    # SPA routing
    location / {
        try_files $uri /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Build & Deploy:**
```bash
docker build -t esic-health-bridge .
docker run -p 80:80 esic-health-bridge
```

### 6. Traditional Web Hosting (cPanel/Plesk)

1. **Download the project**
   - Git: `git clone <repo-url>`
   - Or download ZIP and extract

2. **Upload via FTP/SFTP**
   - Connect to your host via FTP
   - Upload all files to `public_html/`

3. **Set Permissions**
   ```bash
   chmod 755 *.html css js
   chmod 644 index.html css/* js/*
   ```

4. **No build needed!**
   - Site is ready to access

5. **Setup SSL** (via cPanel)
   - AutoSSL or Let's Encrypt
   - Redirect HTTP to HTTPS

### 7. DigitalOcean App Platform

1. Go to [DigitalOcean Apps](https://cloud.digitalocean.com/apps)
2. Click "Create App"
3. Choose "GitHub" as source
4. Select your repository
5. Choose plan ($5-12/mo)
6. Deploy

### 8. Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## Custom Domain Setup

### Using Netlify
1. Settings → Domain → Add domain
2. Update DNS at registrar:
   ```
   CNAME: your-site.netlify.app
   ```

### Using Vercel
1. Settings → Domains
2. Add your domain
3. Follow DNS instructions

### Using GitHub Pages
1. Registrar DNS settings:
   ```
   A: 185.199.108.153
   A: 185.199.109.153
   A: 185.199.110.153
   A: 185.199.111.153
   ```

### Using Custom Registrar
Point nameservers to your hosting provider's DNS.

---

## Environment Configuration

### Email Setup (Choose One)

**Option A: Formspree** (Easiest)
1. Go to [formspree.io](https://formspree.io)
2. Create free account
3. Create new form
4. Get your form ID
5. Update `handleSubmit()` in `js/script.js`:
   ```javascript
   const formData = new FormData(event.target);
   fetch('https://formspree.io/f/YOUR_FORM_ID', {
     method: 'POST',
     body: formData
   }).then(response => {
     alert('Demo request sent successfully!');
   });
   ```

**Option B: SendGrid**
1. Create SendGrid account
2. Get API key
3. Add to backend API endpoint

**Option C: Backend API**
Create your own API to handle form submissions.

### Analytics Setup

**Google Analytics:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**Plausible Analytics** (Privacy-friendly):
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/plausible.js"></script>
```

### SEO Configuration

**robots.txt:**
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

**sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## Performance Optimization

### Image Optimization
- Use WebP format where possible
- Compress before uploading
- Lazy load images

### Caching Headers
Already optimized in nginx.conf:
- JS/CSS cached for 1 year
- HTML not cached (always fresh)

### CDN Configuration
- Netlify/Vercel: Automatic
- AWS S3: Enable CloudFront
- Traditional: Use Cloudflare (free)

### Monitoring
- Netlify Analytics
- Vercel Analytics
- Google Analytics

---

## Post-Deployment Checklist

- [ ] Domain points to correct hosting
- [ ] SSL/HTTPS working
- [ ] Email form sends successfully
- [ ] Mobile responsive on devices
- [ ] Analytics tracking
- [ ] Meta tags for social sharing
- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] robots.txt in place
- [ ] 404 error page configured
- [ ] Redirects set up
- [ ] Performance metrics checked
- [ ] Accessibility audit passed
- [ ] Security headers configured

---

## Troubleshooting

### Site not loading
- Check domain DNS settings
- Verify files uploaded
- Check browser console for errors

### Styles not loading
- Check CSS file path
- Verify fonts CDN accessible
- Clear browser cache (Ctrl+Shift+R)

### Form not working
- Check email service setup
- Test in browser console
- Verify form IDs match in HTML/JS

### Performance slow
- Enable gzip compression
- Use CDN
- Optimize images
- Enable caching

---

## Support

For deployment issues:
- Netlify Support: [docs.netlify.com](https://docs.netlify.com)
- Vercel Support: [vercel.com/docs](https://vercel.com/docs)
- AWS Support: [aws.amazon.com/support](https://aws.amazon.com/support)

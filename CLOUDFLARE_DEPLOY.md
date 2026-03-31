# ClearIns — Cloudflare Pages Deployment Guide

## Domain: cleartins.app

---

## Build Configuration

| Setting | Value |
|---|---|
| Framework | Vite (React) |
| Build command | `pnpm run build` |
| Build output directory | `dist/public` |
| Node.js version | 22 |
| Root directory | `/` |

---

## Step 1: Connect Repository to Cloudflare Pages

1. Push the project to a GitHub or GitLab repository.
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com).
3. Go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
4. Select your repository.
5. Configure build settings:
   - **Framework preset**: Vite
   - **Build command**: `pnpm run build`
   - **Build output directory**: `dist/public`
6. Click **Save and Deploy**.

---

## Step 2: Add Custom Domain (cleartins.app)

1. In Cloudflare Pages, go to your project → **Custom domains**.
2. Click **Set up a custom domain**.
3. Enter `cleartins.app`.
4. Follow the DNS configuration instructions.

If `cleartins.app` is registered with Cloudflare Registrar:
- The DNS records will be added automatically.

If registered elsewhere:
- Add a CNAME record: `cleartins.app` → `<your-project>.pages.dev`
- Or update nameservers to Cloudflare.

---

## Step 3: Configure Environment Variables

In Cloudflare Pages → **Settings** → **Environment variables**, add:

| Variable | Value |
|---|---|
| `VITE_APP_TITLE` | ClearIns – Instagram Repost Remover |
| `VITE_APP_ID` | clearins |

---

## Step 4: Submit to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add property: `https://cleartins.app/`.
3. Verify ownership via:
   - **HTML file method**: Upload the verification file to `client/public/`
   - **DNS method**: Add TXT record in Cloudflare DNS
4. After verification, submit the sitemap:
   - Go to **Sitemaps** → Add: `https://cleartins.app/sitemap.xml`
5. Request indexing for the homepage via **URL Inspection**.

---

## Step 5: SEO Checklist After Deployment

- [ ] Verify `https://cleartins.app/robots.txt` is accessible
- [ ] Verify `https://cleartins.app/sitemap.xml` is accessible
- [ ] Test structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test Core Web Vitals with [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Verify Open Graph tags with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Submit sitemap in Google Search Console
- [ ] Request indexing for all key pages

---

## Cloudflare Performance Optimizations (Recommended)

In Cloudflare Dashboard → **Speed** → **Optimization**:
- Enable **Auto Minify** (HTML, CSS, JS)
- Enable **Brotli compression**
- Enable **HTTP/2**
- Enable **Early Hints**

In **Caching** → **Configuration**:
- Set Browser Cache TTL to **1 year** for static assets
- Enable **Always Online**

---

## Files Included for Cloudflare

| File | Purpose |
|---|---|
| `client/public/_headers` | Security headers + cache control |
| `client/public/_redirects` | SPA routing (all paths → index.html) |
| `client/public/robots.txt` | Search engine crawl instructions |
| `client/public/sitemap.xml` | All URLs for Google indexing |
| `client/public/favicon.svg` | Brand favicon |

# Quick Start: Deploy Comic Website to GitHub Pages

This is a condensed guide to get your comic website live on GitHub Pages in under 5 minutes.

## ⚡ Quick Setup (5 Minutes)

### 1. Enable GitHub Pages

Go to: **https://github.com/soyroberto/gitactioncreatevm/settings/pages**

- Under **Source**, select **GitHub Actions**
- Click **Save**

### 2. Push Configuration Files

The deployment files have been created. Commit and push them:

```bash
cd /path/to/gitactioncreatevm

# Add the workflow and updated config
git add .github/workflows/deploy-github-pages.yml
git add comic/vite.config.ts
git add comic/DEPLOYMENT.md
git add GITHUB_PAGES_SETUP.md

# Commit and push
git commit -m "Add GitHub Pages deployment configuration"
git push origin main
```

### 3. Monitor Deployment

Go to: **https://github.com/soyroberto/gitactioncreatevm/actions**

- Watch the **"Deploy Comic Website to GitHub Pages"** workflow run
- Wait 2-3 minutes for completion

### 4. Access Your Website

Once deployment completes, visit:

**🌐 https://soyroberto.github.io/gitactioncreatevm/**

---

## 📋 What Was Created

### New Files

1. **`.github/workflows/deploy-github-pages.yml`**
   - GitHub Actions workflow for automated deployment
   - Triggers on push to `main` branch (when `comic/` files change)
   - Can also be triggered manually

2. **`comic/DEPLOYMENT.md`**
   - Comprehensive deployment documentation
   - Troubleshooting guide
   - Configuration details

3. **`GITHUB_PAGES_SETUP.md`** (this file)
   - Quick start guide

### Modified Files

1. **`comic/vite.config.ts`**
   - Added `base: '/gitactioncreatevm/'` for GitHub Pages
   - Ensures correct asset paths in production

---

## 🔄 Future Updates

To update the website after initial deployment:

```bash
# Make changes to files in comic/ folder
# Then commit and push:
git add comic/
git commit -m "Update website"
git push origin main
```

GitHub Actions will automatically rebuild and deploy within 2-3 minutes.

---

## 🛠️ Manual Deployment Trigger

If you need to redeploy without code changes:

1. Go to **https://github.com/soyroberto/gitactioncreatevm/actions**
2. Click **"Deploy Comic Website to GitHub Pages"**
3. Click **"Run workflow"** button
4. Select `main` branch
5. Click **"Run workflow"**

---

## ❓ Troubleshooting

### Deployment fails with permission error

**Fix**: Enable workflow permissions
1. Go to **Settings → Actions → General**
2. Under **Workflow permissions**, select **"Read and write permissions"**
3. Click **Save**
4. Re-run the workflow

### Website shows 404

**Fix**: Verify GitHub Pages source
1. Go to **Settings → Pages**
2. Ensure **Source** is set to **GitHub Actions** (not a branch)
3. Wait 1-2 minutes for CDN to update

### Assets not loading

**Fix**: Check base path
1. Verify `comic/vite.config.ts` has `base: '/gitactioncreatevm/'`
2. Ensure all image paths in code start with `/` (e.g., `/images/logo.png`)

---

## 📚 Full Documentation

For detailed information, see **`comic/DEPLOYMENT.md`**

---

**Created by**: Roberto ([@soyroberto](https://github.com/soyroberto))

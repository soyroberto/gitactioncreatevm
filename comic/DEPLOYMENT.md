# Deploying to GitHub Pages

This guide provides step-by-step instructions for deploying the comic website to GitHub Pages with automated deployment via GitHub Actions.

## Prerequisites

Before you begin, ensure you have:
- A GitHub account with access to the repository
- Repository admin permissions to configure GitHub Pages settings
- All code committed and pushed to the `main` branch

## Deployment Steps

### Step 1: Enable GitHub Pages

Navigate to your repository settings and enable GitHub Pages:

1. Go to **https://github.com/soyroberto/gitactioncreatevm/settings/pages**
2. Under **Source**, select **GitHub Actions** from the dropdown menu
3. Click **Save**

This configures the repository to use GitHub Actions for deployment instead of the traditional branch-based deployment.

### Step 2: Verify GitHub Actions Workflow

The deployment workflow has already been created at `.github/workflows/deploy-github-pages.yml`. This workflow will:

- Trigger automatically on every push to `main` that modifies files in the `comic/` folder
- Can also be triggered manually via the Actions tab
- Build the website using Vite
- Deploy the built files to GitHub Pages

**Workflow Features:**
- **Automatic deployment** on code changes
- **Caching** for faster builds (pnpm dependencies)
- **Production optimization** with Vite build
- **Proper permissions** configured for GitHub Pages deployment

### Step 3: Commit and Push Configuration Changes

The following files have been created/updated for GitHub Pages deployment:

```bash
# New workflow file
.github/workflows/deploy-github-pages.yml

# Updated configuration
comic/vite.config.ts  # Added base path for GitHub Pages
```

Commit and push these changes:

```bash
cd /path/to/gitactioncreatevm
git add .github/workflows/deploy-github-pages.yml
git add comic/vite.config.ts
git commit -m "Configure GitHub Pages deployment with automated workflow"
git push origin main
```

### Step 4: Monitor Deployment

After pushing the changes:

1. Go to **https://github.com/soyroberto/gitactioncreatevm/actions**
2. You should see a workflow run named **"Deploy Comic Website to GitHub Pages"**
3. Click on the workflow run to see real-time progress
4. Wait for both **build** and **deploy** jobs to complete (typically 2-3 minutes)

**Workflow Stages:**
- ✅ **Checkout code** - Clones the repository
- ✅ **Setup Node.js & pnpm** - Prepares build environment
- ✅ **Install dependencies** - Installs npm packages
- ✅ **Build website** - Compiles React app with Vite
- ✅ **Upload artifact** - Prepares files for deployment
- ✅ **Deploy to GitHub Pages** - Publishes to GitHub Pages

### Step 5: Access Your Deployed Website

Once deployment completes successfully, your website will be available at:

**https://soyroberto.github.io/gitactioncreatevm/**

The URL follows the pattern: `https://{username}.github.io/{repository-name}/`

## Configuration Details

### Base Path Configuration

The `vite.config.ts` file has been updated with the correct base path:

```typescript
export default defineConfig({
  // Base path for GitHub Pages deployment
  base: process.env.NODE_ENV === 'production' ? '/gitactioncreatevm/' : '/',
  // ... rest of config
});
```

This ensures all asset paths (images, CSS, JavaScript) are correctly resolved when deployed to GitHub Pages.

### Workflow Triggers

The deployment workflow triggers in two scenarios:

1. **Automatic**: When you push changes to `main` branch that affect files in `comic/` folder
2. **Manual**: Via the Actions tab by clicking "Run workflow"

To manually trigger deployment:
1. Go to **https://github.com/soyroberto/gitactioncreatevm/actions**
2. Select **"Deploy Comic Website to GitHub Pages"** workflow
3. Click **"Run workflow"** button
4. Select `main` branch
5. Click **"Run workflow"** to start

## Troubleshooting

### Deployment Fails with 403 Error

**Problem**: GitHub Actions doesn't have permission to deploy to Pages.

**Solution**:
1. Go to **Settings → Actions → General**
2. Scroll to **Workflow permissions**
3. Select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"**
5. Click **Save**

### Website Shows 404 or Blank Page

**Problem**: Base path misconfiguration or GitHub Pages source not set correctly.

**Solution**:
1. Verify GitHub Pages source is set to **GitHub Actions** (not a branch)
2. Check that `vite.config.ts` has the correct `base` path
3. Ensure the workflow completed successfully without errors
4. Wait 1-2 minutes for GitHub's CDN to update

### Assets Not Loading (Images, CSS, JS)

**Problem**: Asset paths are incorrect due to base path issues.

**Solution**:
1. Verify all image paths in code use `/images/...` (absolute paths starting with `/`)
2. Ensure `base` in `vite.config.ts` matches your repository name
3. Rebuild and redeploy

### Build Fails During Workflow

**Problem**: TypeScript errors, missing dependencies, or build configuration issues.

**Solution**:
1. Check the workflow logs for specific error messages
2. Test the build locally: `cd comic && pnpm install && pnpm build`
3. Fix any errors and push the fixes
4. The workflow will automatically retry

## Custom Domain (Optional)

To use a custom domain instead of `soyroberto.github.io/gitactioncreatevm`:

1. Go to **Settings → Pages**
2. Under **Custom domain**, enter your domain (e.g., `comic.example.com`)
3. Add a `CNAME` file to `comic/client/public/` with your domain name
4. Configure DNS records with your domain provider:
   - **A records** pointing to GitHub Pages IPs, or
   - **CNAME record** pointing to `soyroberto.github.io`
5. Update `base` in `vite.config.ts` to `'/'` for custom domains

## Updating the Website

To make changes and deploy updates:

1. Edit files in the `comic/` folder
2. Test locally: `cd comic && pnpm dev`
3. Commit and push changes:
   ```bash
   git add comic/
   git commit -m "Update website content"
   git push origin main
   ```
4. GitHub Actions will automatically build and deploy the changes
5. Changes will be live in 2-3 minutes

## Rollback to Previous Version

If a deployment introduces issues:

1. Go to **Actions** tab
2. Find the last successful deployment
3. Click **"Re-run all jobs"** to redeploy that version

Alternatively, revert the commit and push:
```bash
git revert HEAD
git push origin main
```

## Performance Optimization

The deployed site includes:
- ✅ **Minified JavaScript and CSS** via Vite build
- ✅ **Code splitting** for faster initial load
- ✅ **Asset optimization** (images, fonts)
- ✅ **CDN delivery** via GitHub Pages global network

For further optimization:
- Compress images before adding to `client/public/images/`
- Use WebP format for better compression
- Enable browser caching headers (automatic with GitHub Pages)

## Security Considerations

- GitHub Pages serves content over **HTTPS** by default
- No server-side code execution (static site only)
- All secrets and credentials should be stored in GitHub Secrets, never in code
- The deployment workflow uses minimal permissions (read content, write pages)

## Support and Resources

- **GitHub Pages Documentation**: https://docs.github.com/en/pages
- **GitHub Actions Documentation**: https://docs.github.com/en/actions
- **Vite Documentation**: https://vitejs.dev/guide/
- **Repository Issues**: https://github.com/soyroberto/gitactioncreatevm/issues

---

**Author**: Roberto ([@soyroberto](https://github.com/soyroberto))

**Last Updated**: January 2026

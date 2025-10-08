# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### ❌ Issue: Blank White Page with Console Error
**Error Message:**
```
Failed to load module script: Expected a JavaScript module script 
but the server responded with a MIME type of "text/jsx"
```

**Root Cause:**
- GitHub Pages uses Jekyll by default, which interferes with Vite builds
- Missing `.nojekyll` file causes GitHub to process the site incorrectly
- Assets folder and dotfiles weren't being deployed properly

**Solution:**
✅ **Fixed!** The project now includes:
1. `.nojekyll` file automatically created during build (see `vite.config.js`)
2. `gh-pages` package for proper deployment including hidden files
3. Correct deployment command: `npm run deploy`

---

### 🚀 Deployment Commands

#### **Recommended: Automatic Deployment**
Just push to main - GitHub Actions handles everything:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

#### **Manual Deployment (if needed)**
```bash
npm run deploy
```
This command will:
1. Build the project (`npm run build`)
2. Deploy to gh-pages branch using `gh-pages` package
3. Include all files including `.nojekyll` and assets

---

### 🔍 How to Verify Deployment

#### Check if gh-pages branch has all files:
```bash
git fetch origin gh-pages
git ls-tree -r origin/gh-pages --name-only
```

**Expected output:**
```
.nojekyll
assets/index-[hash].css
assets/index-[hash].js
index.html
logo.svg
vite.svg
```

#### Check GitHub Pages Status:
1. Go to: https://github.com/NithishSaravananRss/NithishSaravananRss.github.io/settings/pages
2. Should show: "Your site is live at https://nithishsaravananrss.github.io/"
3. Source should be: `gh-pages` branch, `/` (root) directory

---

### 🐛 Other Common Issues

#### **Issue: Site shows old version**
**Solutions:**
1. Hard refresh browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Wait 1-2 minutes for GitHub Pages to update
4. Check deployment time in Actions tab

#### **Issue: 404 Not Found**
**Possible causes:**
- Repository name doesn't match `username.github.io` format
- GitHub Pages not enabled in settings
- Source branch not set correctly

**Solutions:**
1. Verify repository name is exactly: `NithishSaravananRss.github.io`
2. Check Pages settings: Settings → Pages → Source = `gh-pages`
3. Redeploy: `npm run deploy`

#### **Issue: CSS/JS not loading**
**Possible causes:**
- Wrong `base` path in vite.config.js
- Missing files in gh-pages branch

**Solutions:**
1. Verify `base: '/'` in `vite.config.js` (for username.github.io repos)
2. Rebuild and redeploy: `npm run deploy`
3. Check browser console for 404 errors

#### **Issue: Images not displaying**
**Possible causes:**
- Incorrect image paths
- Images not in public folder

**Solutions:**
1. Move images to `public/` folder
2. Reference with `/image-name.jpg` (leading slash)
3. Or import in component: `import img from './assets/image.jpg'`

---

### 📋 Build Issues

#### **Issue: Build fails**
```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
npm run build
```

#### **Issue: Out of memory**
```bash
# Increase Node memory
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

---

### 🔄 Complete Redeployment

If all else fails, start fresh:

```bash
# 1. Clean build
rm -rf dist node_modules
npm install
npm run build

# 2. Deploy
npm run deploy

# 3. If that doesn't work, force push
git push origin main --force
npm run deploy
```

---

### 📞 Still Having Issues?

1. **Check GitHub Actions logs:**
   - Go to: https://github.com/NithishSaravananRss/NithishSaravananRss.github.io/actions
   - Click on latest workflow run
   - Review logs for errors

2. **Check browser console:**
   - Press `F12` to open DevTools
   - Go to Console tab
   - Look for error messages

3. **Verify files are deployed:**
   - Visit: https://raw.githubusercontent.com/NithishSaravananRss/NithishSaravananRss.github.io/gh-pages/index.html
   - Should show HTML content, not 404

4. **Test locally:**
   ```bash
   npm run build
   npm run preview
   ```
   - Open: http://localhost:4173
   - If it works locally but not on GitHub Pages, it's a deployment issue

---

## ✅ Quick Checklist

Before deploying, ensure:
- [ ] `.nojekyll` file exists in dist after build
- [ ] `base: '/'` in vite.config.js
- [ ] All dependencies installed: `npm install`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors locally: `npm run preview`
- [ ] gh-pages package installed: `npm list gh-pages`

---

## 📚 Useful Links

- **Live Site**: https://nithishsaravananrss.github.io/
- **Repository**: https://github.com/NithishSaravananRss/NithishSaravananRss.github.io
- **Pages Settings**: https://github.com/NithishSaravananRss/NithishSaravananRss.github.io/settings/pages
- **Actions**: https://github.com/NithishSaravananRss/NithishSaravananRss.github.io/actions
- **Vite Docs**: https://vitejs.dev/guide/static-deploy.html#github-pages
- **gh-pages Package**: https://github.com/tschaub/gh-pages

---

**Last Updated:** October 8, 2025

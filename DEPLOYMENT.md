# Quote-Time Deployment Guide

## 🚀 Deployment Overview

- **Frontend**: https://quote-time.vercel.app/ (Vercel)
- **Backend**: https://qotd-hav9.onrender.com/ (Render)
- **Database**: Neon PostgreSQL

---

## 📦 Render Backend Deployment (Already Done ✅)

Your backend is already live at: https://qotd-hav9.onrender.com/

### Environment Variables on Render:
```
DATABASE_URL=<your-neon-postgres-connection-string>
PORT=8000
PYTHON_VERSION=3.12.3
```

### Render Configuration (`render.yaml`):
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

---

## 🌐 Vercel Frontend Deployment (Already Done ✅)

Your frontend is already live at: https://quote-time.vercel.app/

### To Update/Redeploy on Vercel:

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Import from GitHub**: Select `BishalABPS52/Quote-Time`
3. **Configure Project**:
   - Framework Preset: `Next.js`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Add Environment Variable**:
   ```
   NEXT_PUBLIC_API_URL=https://qotd-hav9.onrender.com
   ```

5. **Deploy**: Click "Deploy"

### Auto-Deploy on GitHub Push:
- Vercel automatically deploys when you push to the `development` branch

---

## 🔄 GitHub Push Steps

Since there are large files in git history, use a fresh start:

### Option 1: Push only QOTD folder
```bash
cd "/home/bishal-shrestha/web dev/QOTD"

# Initialize fresh git repo in QOTD folder
rm -rf .git
git init
git add .
git commit -m "Initial commit for Quote-Time"

# Add remote and push
git remote add origin https://github.com/BishalABPS52/Quote-Time.git
git branch -M main
git push -u origin main --force
```

### Option 2: Filter out large files
```bash
# Install git-filter-repo (if not installed)
pip install git-filter-repo

# Remove large files from history
git filter-repo --path-glob '*/node_modules/*' --invert-paths --force

# Push to GitHub
git push origin development --force
```

---

## ✅ Deployment Checklist

### Render (Backend)
- [x] Backend deployed at https://qotd-hav9.onrender.com/
- [x] DATABASE_URL configured
- [x] CORS allows frontend origin
- [x] Health check: Visit https://qotd-hav9.onrender.com/ (should show API message)

### Vercel (Frontend)
- [x] Frontend deployed at https://quote-time.vercel.app/
- [x] NEXT_PUBLIC_API_URL points to Render backend
- [x] Build successful
- [x] Test: Visit site and click "New Quote"

### GitHub
- [ ] Code pushed to https://github.com/BishalABPS52/Quote-Time
- [ ] Auto-deploy configured on Vercel

---

## 🔧 Environment Variables Summary

### Frontend (.env.production)
```env
NEXT_PUBLIC_API_URL=https://qotd-hav9.onrender.com
```

### Backend (.env on Render)
```env
DATABASE_URL=postgresql+asyncpg://neondb_owner:npg_Fbj7Y3ZPDxuz@ep-lingering-mountain-a10uxet0-pooler.ap-southeast-1.aws.neon.tech/neondb?ssl=true
PORT=8000
```

---

## 📝 Post-Deployment Testing

1. **Test Backend API**:
   ```bash
   curl https://qotd-hav9.onrender.com/
   curl https://qotd-hav9.onrender.com/api/quote-of-the-day
   curl https://qotd-hav9.onrender.com/api/stats
   ```

2. **Test Frontend**:
   - Visit: https://quote-time.vercel.app/
   - Click "New Quote" button
   - Verify quotes are loading from backend
   - Check browser console for errors

3. **Check CORS**:
   - Open browser DevTools → Network tab
   - Should see successful requests to Render backend
   - No CORS errors in console

---

## 🚨 Troubleshooting

### Frontend not connecting to backend:
1. Check Vercel environment variable: `NEXT_PUBLIC_API_URL`
2. Redeploy frontend after adding env variable
3. Clear browser cache

### Backend database connection issues:
1. Verify DATABASE_URL in Render dashboard
2. Check Neon PostgreSQL is active
3. View Render logs for errors

### Render backend sleeping:
- Free tier sleeps after 15 min of inactivity
- First request after sleep takes ~30 seconds
- Consider upgrading to paid tier for always-on

---

## 🎯 Done!

Your Quote-Time app is now live! 🎉

- Frontend: https://quote-time.vercel.app/
- Backend: https://qotd-hav9.onrender.com/

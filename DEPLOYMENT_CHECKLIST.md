# Deployment Checklist — Sara Haider Portfolio

## Pre-Deployment
- [x] Environment variables set (ANTHROPIC_API_KEY)
- [x] Build passes locally (`npm run build`)
- [x] Tests pass (`npm run test:ci`)
- [x] Lighthouse scores checked (73/95/100/100)
- [x] No console errors in DevTools
- [x] Rate limiting added to chat API
- [x] maxDuration set on streaming handlers

## Deployment
- [x] Deployed to Netlify
- [x] SSL enabled (Netlify auto-provides)
- [x] Environment variables configured in Netlify
- [x] Build settings: `npm run build`, publish `.next`

## Post-Deployment
- [x] Home page loads
- [x] Chat page loads and responds
- [x] 3D page loads
- [x] Shader hero works
- [x] Timeline displays projects
- [x] All navigation links work
- [x] Mobile responsive
- [x] Console errors: 0

## Rollback Plan
- [x] Netlify deploy history available
- [x] Can redeploy previous commit from GitHub
- [x] Command: `git revert <commit>` + redeploy

**Signed:** Sara Haider
**Date:** August 25, 2026
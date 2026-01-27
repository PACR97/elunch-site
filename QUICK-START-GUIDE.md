# 📧 eLunch Email System - Quick Start Guide

**For:** eLunch Technical Team  
**Date:** January 26, 2026  
**Status:** ✅ Ready to Deploy

---

## 🎯 What This Does

Your contact form on **mielunch.com** now sends automatic email notifications to your sales team when customers fill it out.

**What happens when a customer submits the form:**
1. 📧 Email sent to `cnavas@mielunch.com` with all lead details
2. 💬 Customer redirected to WhatsApp (existing behavior - unchanged)
3. 📝 Form resets for next customer

**Benefits:**
- ✅ Never miss a lead (email backup)
- ✅ Professional email with all details
- ✅ Team can track and review inquiries
- ✅ Spam protection (rate limiting + bot detection)

---

## 📦 Files to Upload

### 1. Create API Directory
Upload to: `public_html/api/`

```
api/
├── send-email.php    ← Email handler (PHP)
└── .htaccess         ← Security rules
```

### 2. Update Existing Files
Replace these files in `public_html/`:

```
public_html/
├── index.html        ← Updated (has honeypot field)
└── public/js/
    └── main.js       ← Updated (AJAX functionality)
```

### 3. Configure Environment
**IMPORTANT:** Create `.env` file **OUTSIDE** `public_html/`

**Location:** `/home/u123456789/.env` (NOT inside public_html!)

**Contents:**
```bash
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@mielunch.com
RESEND_TO_EMAIL=cnavas@mielunch.com
```

---

## 🔑 Setup Steps (5 Minutes)

### Step 1: Get Resend API Key (2 min)

1. Log in to Resend: https://resend.com/login
2. Go to **API Keys** (left sidebar)
3. Click **"Create API Key"**
4. Name: `eLunch Production`
5. Copy the key (starts with `re_`)

### Step 2: Verify Domain (15 min)

1. In Resend, go to **Domains**
2. Click **"Add Domain"**
3. Enter: `mielunch.com`
4. Copy the 3 DNS records shown
5. Go to **Hostinger** > Domains > DNS Settings
6. Add all 3 records (SPF, DKIM, DMARC)
7. Wait 10-30 minutes for verification

### Step 3: Upload Files (3 min)

**Using Hostinger File Manager:**

1. Log in to Hostinger panel
2. Click **"File Manager"**
3. Navigate to `public_html/`
4. Create `api/` folder
5. Upload files to `api/` folder:
   - `send-email.php`
   - `.htaccess`
6. Replace `public/js/main.js`
7. Replace `index.html`

**Upload .env file:**
1. Go UP one level (to `/home/u123456789/`)
2. Upload `.env` file here (NOT in public_html)

---

## ✅ Testing (2 Minutes)

### Test 1: Basic Submission

1. Go to https://mielunch.com
2. Scroll to contact form
3. Fill out with test data:
   - Name: Test User
   - Phone: 78778253
   - Email: your-email@example.com
   - Message: Testing email system
4. Click **"ENVIAR"**

**Expected:**
- ✅ Button shows "ENVIANDO..." with spinner
- ✅ Success message: "¡Solicitud enviada! Redirigiendo a WhatsApp..."
- ✅ WhatsApp opens after 1.5 seconds
- ✅ Email arrives at `cnavas@mielunch.com` within 10 seconds

### Test 2: Check Email

**Email should contain:**
- Subject: "🔔 Nuevo Lead - eLunch | Test User"
- From: eLunch <noreply@mielunch.com>
- All form data (name, phone, email, message)
- "Contactar por WhatsApp" button (clickable)

**If email looks correct → ✅ System is working!**

---

## 🚨 Troubleshooting

### Problem: No email received

**Check:**
1. Spam folder (most common!)
2. Domain verified in Resend? (https://resend.com/domains)
3. Correct email in `.env`? (`RESEND_TO_EMAIL=cnavas@mielunch.com`)
4. Check Resend logs: https://resend.com/logs

### Problem: "Error de configuración del servidor"

**Cause:** `.env` file not found

**Fix:**
1. Check file location: `/home/u123456789/.env`
2. Must be OUTSIDE `public_html/`
3. Check file has content (API key, emails)

### Problem: WhatsApp not opening

**Check:**
1. Browser console for errors (press F12)
2. Test on mobile device (may not work on desktop without WhatsApp Desktop)
3. Clear browser cache (Ctrl+Shift+Delete)

---

## 📞 Support

**Full documentation:**
- Setup: `RESEND-EMAIL-SETUP.md` (850 lines)
- Testing: `EMAIL-TESTING-GUIDE.md` (750 lines)
- Summary: `EMAIL-SYSTEM-DEPLOYMENT-SUMMARY.md` (900 lines)

**Resend Support:**
- Dashboard: https://resend.com/dashboard
- Docs: https://resend.com/docs
- Email: support@resend.com

**Hostinger Support:**
- Help: https://support.hostinger.com
- Live chat: Available 24/7 in panel

---

## 🎉 You're Done!

Once testing confirms emails are arriving, your system is live and ready to capture leads!

**What to expect:**
- Emails arrive within 5-10 seconds
- Professional branded design
- All customer details included
- Direct link to contact customer via WhatsApp

**Monitor weekly:**
- Check Resend dashboard (https://resend.com/logs)
- Verify delivery rate stays high (should be ~100%)
- Watch for spam attempts (blocked automatically)

---

**Questions? Review the full documentation files in the project folder.**

**Ready to go live? Just upload the files and test! 🚀**

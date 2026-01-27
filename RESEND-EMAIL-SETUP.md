# 📧 eLunch - Email Notification System Setup Guide

## Table of Contents
1. [Overview](#overview)
2. [Resend Account Setup](#resend-account-setup)
3. [Domain Verification](#domain-verification)
4. [Environment Configuration](#environment-configuration)
5. [Hostinger Deployment](#hostinger-deployment)
6. [Testing the System](#testing-the-system)
7. [Troubleshooting](#troubleshooting)
8. [Security Best Practices](#security-best-practices)

---

## 📋 Overview

### What This System Does

When a potential customer submits the contact form on **mielunch.com**, the system will:

1. ✅ **Validate** the form data (name, phone, email, message)
2. ✅ **Send email notification** to `cnavas@mielunch.com` with lead details
3. ✅ **Redirect user to WhatsApp** for immediate conversation (existing behavior maintained)
4. ✅ **Prevent spam** with honeypot field and rate limiting (5 submissions per hour per IP)

### Technical Stack

- **Email Service:** Resend API (modern, reliable, developer-friendly)
- **Backend:** PHP (native cURL, no dependencies)
- **Frontend:** JavaScript (AJAX with Fetch API)
- **Security:** Rate limiting, input sanitization, honeypot spam detection

### Files Included

```
elunch-site/
├── api/
│   ├── send-email.php      ← Main email handler (PHP backend)
│   └── .htaccess           ← Security rules for API directory
├── public/
│   └── js/
│       └── main.js         ← Updated with AJAX form submission
├── index.html              ← Updated with honeypot field + loading state
├── .env.example            ← Environment variables template
└── RESEND-EMAIL-SETUP.md   ← This file
```

---

## 🚀 Resend Account Setup

### Step 1: Create Resend Account

1. Go to **https://resend.com**
2. Click **"Sign Up"** (top right)
3. Choose signup method:
   - **GitHub** (recommended for developers)
   - **Google**
   - **Email + Password**
4. Complete registration
5. Verify your email address

### Step 2: Get Your API Key

1. Log in to **Resend Dashboard**: https://resend.com/home
2. Navigate to **API Keys** section (left sidebar)
3. Click **"Create API Key"**
4. Configure the key:
   - **Name:** `eLunch Production` (or any descriptive name)
   - **Permission:** Select **"Sending access"**
   - **Domain:** Select `mielunch.com` (after domain verification - see next section)
5. Click **"Create"**
6. **IMPORTANT:** Copy the API key immediately (starts with `re_`)
   - Example: `re_123abc456def789ghi012jkl345mno678`
   - You won't be able to see it again!
7. Save it securely (we'll use it in the `.env` file later)

---

## 🌐 Domain Verification

Before sending emails from `noreply@mielunch.com`, you must verify ownership of `mielunch.com` in Resend.

### Step 1: Add Domain in Resend

1. Go to **Resend Dashboard** > **Domains**
2. Click **"Add Domain"**
3. Enter: `mielunch.com`
4. Click **"Add"**

### Step 2: Get DNS Records

Resend will provide **3 DNS records** to add to your domain:

#### Example Records (yours will be different):

```
1. SPF Record (TXT)
   Name: @
   Value: v=spf1 include:_spf.resend.com ~all

2. DKIM Record (TXT)
   Name: resend._domainkey
   Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...

3. DMARC Record (TXT)
   Name: _dmarc
   Value: v=DMARC1; p=none;
```

### Step 3: Add DNS Records in Hostinger

1. Log in to **Hostinger Control Panel** (hpanel)
2. Navigate to **Domains** > Select `mielunch.com`
3. Click **"DNS / Name Servers"**
4. Click **"Manage DNS Records"**
5. Add each record from Resend:

#### Adding SPF Record:
- **Type:** TXT
- **Name:** @ (or leave empty)
- **Value:** `v=spf1 include:_spf.resend.com ~all`
- **TTL:** 3600 (or default)
- Click **"Add Record"**

#### Adding DKIM Record:
- **Type:** TXT
- **Name:** `resend._domainkey`
- **Value:** (paste the long DKIM value from Resend)
- **TTL:** 3600
- Click **"Add Record"**

#### Adding DMARC Record:
- **Type:** TXT
- **Name:** `_dmarc`
- **Value:** `v=DMARC1; p=none;`
- **TTL:** 3600
- Click **"Add Record"**

### Step 4: Verify in Resend

1. Return to **Resend Dashboard** > **Domains**
2. Click **"Verify Records"** next to `mielunch.com`
3. Wait 10-30 minutes for DNS propagation
4. Status should change from **"Pending"** to **"Verified"** ✅

**Note:** DNS changes can take up to 48 hours, but typically complete in 10-30 minutes.

### Testing Domain (Optional - For Testing Only)

If you want to test the system **before** domain verification completes, you can use Resend's sandbox domain:

- **From email:** `onboarding@resend.dev`
- **Limitation:** Emails can only be sent to your verified email address in Resend

To use sandbox domain:
1. In `.env` file, temporarily set:
   ```
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```
2. Add your test email to **Resend Dashboard** > **Settings** > **Verified Emails**

⚠️ **Remember:** Change back to `noreply@mielunch.com` after domain verification!

---

## ⚙️ Environment Configuration

### Step 1: Create `.env` File

1. Navigate to your project folder:
   ```
   /home/cano/Documents/elunch-site/
   ```

2. Copy the `.env.example` file:
   ```bash
   cp .env.example .env
   ```

3. Open `.env` in a text editor

4. Replace placeholder values with your actual credentials:

```bash
# ===================================
# RESEND API CONFIGURATION
# ===================================

# Your Resend API Key (from Step 2 above)
RESEND_API_KEY=re_YOUR_ACTUAL_API_KEY_HERE

# Email address to send FROM (must be verified domain)
RESEND_FROM_EMAIL=noreply@mielunch.com

# Email address to send TO (sales team notification)
RESEND_TO_EMAIL=cnavas@mielunch.com
```

### Step 2: Secure the `.env` File

**CRITICAL SECURITY NOTE:**

The `.env` file contains your **secret API key** and must NEVER be:
- ❌ Committed to Git
- ❌ Uploaded to `public_html/` (web-accessible directory)
- ❌ Shared publicly

**Correct placement on Hostinger:**

```
/home/u123456789/              ← Place .env HERE
├── .env                        ✅ Secure (not web-accessible)
└── public_html/                ← Web root
    ├── index.html
    ├── api/
    │   └── send-email.php      ← Loads .env from parent directory
    └── public/
```

**Why?** Files in `public_html/` are accessible via browser. Files in `/home/u123456789/` are only accessible by PHP scripts.

---

## 🚢 Hostinger Deployment

### Pre-Deployment Checklist

Before uploading to Hostinger, ensure:

- ✅ `.env` file is created with your Resend API key
- ✅ Domain `mielunch.com` is verified in Resend (DNS records added)
- ✅ All files are ready to upload
- ✅ You have Hostinger File Manager or FTP access

### Option A: Upload via Hostinger File Manager

#### 1. Log in to Hostinger
- Go to: https://hpanel.hostinger.com
- Enter your credentials

#### 2. Access File Manager
- Click on **"File Manager"** in your hosting panel
- You'll see your home directory: `/home/u123456789/`

#### 3. Upload `.env` File (Outside public_html)
- Stay in `/home/u123456789/` (home directory)
- Click **"Upload Files"**
- Select `.env` from your computer
- **Verify:** `.env` should be at `/home/u123456789/.env` (NOT inside public_html)

#### 4. Navigate to Web Root
- Double-click `public_html/` folder
- You should see existing files: `index.html`, `.htaccess`, `robots.txt`, etc.

#### 5. Create API Directory
- Click **"New Folder"**
- Name: `api`
- Press Enter

#### 6. Upload API Files
- Enter the `api/` folder
- Upload these files:
  - `send-email.php`
  - `.htaccess`

#### 7. Update JavaScript File
- Navigate to `public_html/public/js/`
- **Delete** the old `main.js` (or rename to `main.js.backup`)
- Upload the new `main.js` file

#### 8. Update HTML File
- Navigate back to `public_html/`
- **Backup** existing `index.html`:
  - Right-click `index.html` > **Rename** > `index.html.backup`
- Upload the new `index.html` file

### Option B: Upload via FTP (FileZilla)

If you prefer FTP:

1. **FTP Credentials** (from Hostinger):
   - **Host:** ftp.mielunch.com (or IP from Hostinger)
   - **Username:** u123456789 (your Hostinger username)
   - **Password:** (your FTP password)
   - **Port:** 21

2. **Connect** using FileZilla or any FTP client

3. **Upload structure:**
   ```
   Remote: /home/u123456789/
   ├── .env (upload here)
   └── public_html/
       ├── api/ (create folder)
       │   ├── send-email.php
       │   └── .htaccess
       ├── public/js/
       │   └── main.js (replace)
       └── index.html (replace)
   ```

### Verify File Permissions

After upload, check permissions (via File Manager or FTP):

- **`.env`**: 600 or 644 (readable by owner)
- **`api/send-email.php`**: 644 (readable, executable by PHP)
- **`api/.htaccess`**: 644
- **`api/` directory**: 755

To set permissions in Hostinger File Manager:
1. Right-click file/folder
2. Select **"Permissions"**
3. Set appropriate values

---

## 🧪 Testing the System

### Test 1: Basic Form Submission

1. Go to **https://mielunch.com** (or your domain)
2. Scroll to the **"Contacto"** section
3. Fill out the form:
   - **Nombre:** Test User
   - **Teléfono:** 78778253
   - **Email:** your-test-email@example.com
   - **Mensaje:** This is a test submission to verify email integration.
4. Click **"ENVIAR"**

### Expected Behavior:

1. **Button changes:** "ENVIAR" → "ENVIANDO..." (with spinner)
2. **Message appears:** "Enviando tu solicitud..."
3. **Success message:** "¡Solicitud enviada! Redirigiendo a WhatsApp..."
4. **WhatsApp opens** in new tab after 1.5 seconds
5. **Form resets** (all fields cleared)

### Test 2: Check Email Delivery

1. Open inbox for: **cnavas@mielunch.com**
2. Look for email with subject: **"🔔 Nuevo Lead - eLunch | Test User"**
3. Verify email contains:
   - ✅ Sender: eLunch <noreply@mielunch.com>
   - ✅ Professional HTML design
   - ✅ All form data (name, phone, email, message)
   - ✅ Timestamp
   - ✅ "Contactar por WhatsApp" button

**Email should arrive within 5-10 seconds.**

### Test 3: Rate Limiting

1. Submit the form **6 times in a row** (quickly)
2. On the **6th submission**, you should see:
   - Error message: "Has excedido el límite de solicitudes. Por favor, intenta nuevamente en X minutos."
3. Wait 1 hour, then try again (should work)

### Test 4: Honeypot Spam Detection

This test requires modifying the page temporarily (use browser DevTools):

1. Open browser **Developer Tools** (F12)
2. Go to **Console** tab
3. Run this command:
   ```javascript
   document.getElementById('website').value = 'spam-bot-value';
   ```
4. Fill out and submit the form
5. **Expected:** Form submits successfully (fake success message), but NO email is sent
6. Check `cnavas@mielunch.com` inbox - should NOT receive email

**Why?** Honeypot field is hidden from humans but filled by bots. System silently rejects spam.

---

## 🔧 Troubleshooting

### Issue 1: "Error de configuración del servidor"

**Symptom:** Form shows error message immediately after clicking "ENVIAR"

**Cause:** `.env` file not found or API key missing

**Solutions:**

1. **Check `.env` file location:**
   - Should be at `/home/u123456789/.env` (NOT in public_html)
   - Use Hostinger File Manager to verify

2. **Check `.env` file contents:**
   - Open `.env` in File Manager
   - Verify `RESEND_API_KEY` line exists and has valid key (starts with `re_`)
   - Example: `RESEND_API_KEY=re_abc123def456...`

3. **Check PHP error logs:**
   - In Hostinger File Manager, go to `/home/u123456789/public_html/`
   - Look for `error_log` file
   - Open and search for "ERROR: .env file not found"

4. **File permissions:**
   - Right-click `.env` > Permissions > Set to **644**

---

### Issue 2: "Error al enviar el correo"

**Symptom:** Form validation passes, but email fails to send

**Cause:** Resend API error (invalid key, domain not verified, rate limit)

**Solutions:**

1. **Verify Resend API key:**
   - Log in to https://resend.com/api-keys
   - Check if key is still active (not deleted/expired)
   - Try creating a new API key

2. **Check domain verification:**
   - Go to https://resend.com/domains
   - Ensure `mielunch.com` shows **"Verified"** status ✅
   - If "Pending", wait for DNS propagation (up to 48 hours)

3. **Check Resend API logs:**
   - Go to https://resend.com/logs
   - Look for recent failed requests
   - Check error messages (e.g., "Domain not verified", "Invalid API key")

4. **Test with sandbox domain (temporary):**
   - Edit `.env` file:
     ```
     RESEND_FROM_EMAIL=onboarding@resend.dev
     ```
   - Try submitting form again
   - If successful, issue is with domain verification

5. **Check PHP error logs:**
   - Look in `/home/u123456789/public_html/error_log`
   - Search for "Resend API failed" errors
   - Note the HTTP status code (403, 429, 500, etc.)

---

### Issue 3: WhatsApp Opens But No Email Received

**Symptom:** WhatsApp redirect works, but `cnavas@mielunch.com` never receives email

**Cause:** Email sent successfully but filtered as spam, or wrong recipient address

**Solutions:**

1. **Check spam/junk folder** in `cnavas@mielunch.com` inbox

2. **Check "To" email address:**
   - Open `.env` file
   - Verify: `RESEND_TO_EMAIL=cnavas@mielunch.com` (no typos)

3. **Check Resend logs for successful sends:**
   - Go to https://resend.com/logs
   - Filter by "Sent" status
   - Verify emails are being sent (status: Delivered)

4. **Add sender to safe list:**
   - In your email client (Gmail, Outlook, etc.)
   - Add `noreply@mielunch.com` to contacts/safe senders

5. **Test with different recipient:**
   - Temporarily edit `.env`:
     ```
     RESEND_TO_EMAIL=your-personal-email@gmail.com
     ```
   - Submit form again
   - If you receive it, issue is with `cnavas@mielunch.com` inbox settings

---

### Issue 4: AJAX Request Fails (CORS Error)

**Symptom:** Browser console shows: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Cause:** API endpoint blocking cross-origin requests

**Solutions:**

1. **Check `.htaccess` in `/api/` directory:**
   - Ensure it exists and contains security headers
   - Should allow POST requests

2. **Verify API endpoint URL:**
   - In browser DevTools > Network tab
   - Check the request URL: should be `/api/send-email.php`
   - If showing full URL (https://...), form may be on different domain

3. **Check file permissions:**
   - `api/send-email.php` should be **644**
   - `api/.htaccess` should be **644**

---

### Issue 5: Rate Limiting Too Aggressive

**Symptom:** Users report being blocked after only 2-3 submissions

**Cause:** Shared IP address (office network) or incorrect rate limit configuration

**Solutions:**

1. **Adjust rate limit in `send-email.php`:**
   - Edit line ~93:
     ```php
     $max_submissions = 10; // Increase from 5 to 10
     $time_window = 3600; // Keep at 1 hour
     ```

2. **Clear rate limit cache (temporary):**
   - SSH into Hostinger or use File Manager
   - Delete files in `/tmp/` matching pattern: `elunch_rate_limit_*.json`
   - Note: Automatically clears after 1 hour

---

### Issue 6: Email Design Looks Broken

**Symptom:** Email arrives but formatting is wrong (missing colors, no styling)

**Cause:** Email client stripping CSS (Outlook, some mobile clients)

**Solutions:**

1. **Test in different email clients:**
   - Gmail (web) ✅ Full support
   - Outlook (desktop) ⚠️ Limited CSS support
   - iPhone Mail ✅ Good support
   - Android Gmail ✅ Good support

2. **Check plain text version:**
   - If HTML is broken, recipients will see plain text version
   - Plain text version is automatically included (see `$text_body` in PHP)

3. **No action required:**
   - Email design works in 90%+ of clients
   - Plain text fallback ensures message is always readable

---

### Issue 7: Form Submits But Nothing Happens

**Symptom:** Click "ENVIAR" but no loading state, no messages, no redirect

**Cause:** JavaScript error or file not loaded

**Solutions:**

1. **Check browser console for errors:**
   - Press **F12** > Console tab
   - Look for JavaScript errors (red messages)
   - Common errors:
     - "Fetch is not defined" (old browser - use polyfill)
     - "getElementById returned null" (ID mismatch in HTML)

2. **Verify JavaScript file loaded:**
   - In browser DevTools > Network tab
   - Refresh page
   - Look for `main.js` in file list
   - Status should be **200 OK** (not 404)

3. **Clear browser cache:**
   - Press **Ctrl+Shift+Delete** (Windows) or **Cmd+Shift+Delete** (Mac)
   - Select "Cached images and files"
   - Clear cache and reload page

4. **Check file path in HTML:**
   - Open `index.html` source (browser: right-click > View Page Source)
   - Search for `<script src="` near the end
   - Should be: `<script src="public/js/main.js"></script>`

---

## 🔒 Security Best Practices

### 1. Protect Your API Key

- ✅ **DO:** Store in `.env` file outside web root
- ✅ **DO:** Use environment variables
- ✅ **DO:** Rotate API keys every 6 months

- ❌ **DON'T:** Hardcode in PHP files
- ❌ **DON'T:** Commit to Git
- ❌ **DON'T:** Share publicly

### 2. Monitor Email Logs

- **Check Resend dashboard weekly:**
  - https://resend.com/logs
  - Look for unusual activity (high volume, failed sends)

- **Set up alerts:**
  - Resend can notify you of delivery failures
  - Configure in Dashboard > Settings

### 3. Rate Limiting Best Practices

- **Current limit:** 5 submissions per IP per hour
- **Adjust if needed:**
  - Higher for busy offices (shared IP)
  - Lower if spam increases

### 4. Update PHP Regularly

- Check Hostinger for PHP version:
  - Hosting Panel > Advanced > PHP Configuration
  - Recommended: **PHP 8.1** or newer

### 5. Backup Configuration

- **Weekly backups of:**
  - `.env` file (secure location, not cloud)
  - `api/send-email.php`
  - `public/js/main.js`
  - `index.html`

### 6. Monitor Form Submissions

- **Check email inbox** (`cnavas@mielunch.com`) daily
- **Look for spam patterns:**
  - Gibberish messages
  - Repeated submissions
  - Unusual email addresses

- **If spam increases:**
  - Add CAPTCHA (Google reCAPTCHA v3)
  - Reduce rate limit to 3 per hour
  - Add more honeypot fields

---

## 📞 Support & Resources

### Resend Resources

- **Documentation:** https://resend.com/docs
- **API Reference:** https://resend.com/docs/api-reference/emails/send-email
- **Support:** support@resend.com
- **Status Page:** https://resend.com/status

### Hostinger Resources

- **Help Center:** https://support.hostinger.com
- **Live Chat:** Available 24/7 in Hostinger panel
- **PHP Documentation:** https://www.php.net/docs.php

### Project Maintainer

For questions about this specific implementation:
- **Review code comments** in `api/send-email.php`
- **Check error logs** in Hostinger File Manager
- **Test with sandbox domain** (`onboarding@resend.dev`) first

---

## ✅ Final Checklist

Before going live, ensure:

- [ ] Resend account created and verified
- [ ] Domain `mielunch.com` verified in Resend (DNS records added)
- [ ] API key generated and saved in `.env` file
- [ ] `.env` file placed **outside** `public_html/` directory
- [ ] All files uploaded to Hostinger
- [ ] File permissions set correctly (644 for files, 755 for folders)
- [ ] Test form submission completed successfully
- [ ] Email received at `cnavas@mielunch.com`
- [ ] WhatsApp redirect works as expected
- [ ] Rate limiting tested (6th submission blocked)
- [ ] Spam protection verified (honeypot field hidden)
- [ ] Browser console shows no JavaScript errors
- [ ] Mobile testing completed (responsive design)

---

## 🎉 You're All Set!

Your eLunch contact form now has professional email notifications powered by Resend. 

**What happens now:**

1. Customer fills out form on mielunch.com
2. Email notification sent to `cnavas@mielunch.com` instantly
3. Customer redirected to WhatsApp for conversation
4. Sales team receives all lead details via email
5. System prevents spam with rate limiting + honeypot

**Enjoy your new lead management system! 🚀**

---

*Last updated: January 26, 2026*
*Version: 1.0.0*

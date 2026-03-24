# Sudipto Debnath — Personal Website
## Deployment & Customization Guide

---

## 📁 File Structure

```
sudipto-website/
├── index.html       ← Main HTML (all content lives here)
├── style.css        ← All styles and animations
├── script.js        ← All JavaScript logic
└── README.md        ← This guide
```

---

## 🚀 GitHub Pages Deployment (Step-by-Step)

### Step 1 — Create a GitHub Account
Go to https://github.com and sign up if you don't have an account.

### Step 2 — Create a New Repository
1. Click the **+** button (top right) → **New repository**
2. Name it: `sudipto-debnath` (or any name you like)
3. Set to **Public**
4. Click **Create repository**

### Step 3 — Upload Your Files
**Option A — Using GitHub Website (easiest):**
1. Open your new repository
2. Click **Add file** → **Upload files**
3. Drag and drop `index.html`, `style.css`, and `script.js`
4. Click **Commit changes**

**Option B — Using Git command line:**
```bash
git init
git add .
git commit -m "Initial commit — Sudipto Debnath website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sudipto-debnath.git
git push -u origin main
```

### Step 4 — Enable GitHub Pages
1. In your repository, go to **Settings**
2. Scroll down to **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Set Branch to **main** and folder to **/ (root)**
5. Click **Save**

### Step 5 — Access Your Site
After 1–2 minutes, your site will be live at:
```
https://YOUR_USERNAME.github.io/sudipto-debnath/
```

---

## 🖼️ Replacing Images

All images are loaded from Unsplash. To replace with real photos:

### Hero Section
The hero uses a particle canvas background (no image). To add a background photo:
In `style.css`, find `.hero` and add:
```css
.hero {
  background: url('images/hero.jpg') center/cover no-repeat;
}
```

### About Section
Find this line in `index.html`:
```html
<img src="https://images.unsplash.com/photo-1507003211169..." alt="Portrait of Sudipto..." />
```
Replace the URL with your own photo path, e.g.:
```html
<img src="images/sudipto-portrait.jpg" alt="Portrait of Sudipto Debnath smiling" />
```

### Work Cards
Each card has an image. Find the `<img>` tags inside `.work-card-img` and replace URLs similarly.

### Image Optimization Tips
- Use `.webp` format for best performance (70–80% smaller)
- Recommended sizes: Portrait → 600×800px, Cards → 600×400px
- Compress with https://squoosh.app (free, no upload limit)

---

## ✏️ Editing Content

### Changing the Name, Title, or Bio
All content is in `index.html`. Search for the text you want to change and edit directly.

### Adding a Timeline Entry
Find the `.timeline` section and copy-paste a `.timeline-item` block:
```html
<div class="timeline-item" data-side="left">
  <div class="timeline-dot"></div>
  <div class="timeline-card glass">
    <span class="timeline-year">2026</span>
    <h3>New Achievement</h3>
    <p>Description of what happened.</p>
  </div>
</div>
```
Alternate `data-side="left"` and `data-side="right"` for visual balance.

### Adding a Work Card
Copy a `.work-card` block and update the image, tag, title, description, and meta.

### Changing Colors
In `style.css`, find `:root { ... }` at the top:
```css
--accent:      #4f8eff;   /* Main blue — change to any color */
--accent-warm: #ff7b4f;   /* Orange accent */
--gold:        #e8c96a;   /* Gold for highlights */
```

### Changing Typed Text Phrases
In `script.js`, find `initTypedText()` and edit the `phrases` array:
```js
const phrases = [
  'Youth Leader',
  'Your Custom Role',
  '...'
];
```

---

## 📧 Making the Contact Form Work

The form currently shows a success message (simulated). To actually send emails:

**Option A — Formspree (free, no backend needed):**
1. Go to https://formspree.io and create a free account
2. Create a new form → get your form ID (e.g., `xpwzerqb`)
3. In `script.js`, find `initContactForm()` and replace the `setTimeout` block with:
```js
const data = new FormData(form);
fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: data,
  headers: { 'Accept': 'application/json' }
}).then(() => {
  success.classList.add('show');
  form.reset();
});
```

---

## 🌙 Dark / Light Mode
The toggle button (top right) switches between dark and light mode. Default is dark.

---

## 📱 Mobile Responsiveness
The site is fully responsive. The navigation links hide on mobile. All grids collapse to single column on small screens.

---

## 🔧 Performance Tips
- Images lazy-load by default (`loading="lazy"` attribute)
- GSAP and fonts load from CDN
- For best Lighthouse score, also add `rel="preload"` for critical fonts

---

## 📞 Support
For questions about this website, contact: hello23sudipto@gmail.com

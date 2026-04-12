# Dita – Personal Portfolio Website

A clean, minimalist personal portfolio built with **HTML, CSS, and vanilla JavaScript only**.  
No build tools. No frameworks. Deploy in minutes via GitHub Pages.

---

## 📁 Folder Structure

```
portfolio/
├── index.html        ← Main page (all sections)
├── style.css         ← All styling (CSS variables, responsive, dark mode)
├── script.js         ← Interactions (dark mode, animations, mobile menu)
├── assets/
│   ├── profile.png   ← Your profile photo (replace this)
│   └── cv-dita.pdf   ← Your CV/Resume (replace this)
└── README.md         ← This file
```

---

## 🚀 Deploy to GitHub Pages (Step-by-Step)

### Step 1 – Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in.
2. Click the **+** icon → **New repository**.
3. Name it exactly: `yourusername.github.io`  
   *(Replace `yourusername` with your actual GitHub username — this is your free domain!)*
4. Set it to **Public**.
5. Click **Create repository**.

### Step 2 – Upload Your Files

**Option A – via GitHub web UI (easiest):**
1. Inside the new repo, click **Add file → Upload files**.
2. Drag and drop **all files** from this folder (including the `assets/` folder).
3. Click **Commit changes**.

**Option B – via Git CLI:**
```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

### Step 3 – Enable GitHub Pages

1. In your repo, go to **Settings → Pages**.
2. Under **Source**, select **Deploy from a branch**.
3. Choose branch: **main**, folder: **/ (root)**.
4. Click **Save**.
5. Wait ~60 seconds, then visit: `https://yourusername.github.io` 🎉

---

## ✏️ Customising Your Content

All placeholder content is clearly marked with `<!-- ✏️ -->` comments in `index.html`.

### Personal Info
Open `index.html` and update:

| What | Where to find it |
|------|-----------------|
| Your name | `<h1 class="hero-name">` and footer |
| Job title | `<p class="hero-title">` |
| Tagline | `<p class="hero-tagline">` |
| Bio paragraphs | Inside `#about .about-bio` |
| Email address | `<a href="mailto:...">` in the contact section |
| LinkedIn / GitHub / Instagram | `<a href="...">` in `.social-links` |

### Profile Photo
Replace `assets/profile.png` with your own photo.  
Keep the filename the same, or update the `src` in the `<img>` tag:
```html
<img src="assets/your-photo.jpg" alt="Your Name – profile photo" class="hero-photo" />
```

### CV / Resume
Drop your PDF into the `assets/` folder and update:
```html
<a href="assets/your-cv.pdf" class="btn btn-outline" download>Download CV</a>
```

### Skills
Edit the `.skill-chip` spans inside `#about`:
```html
<span class="skill-chip">Your Skill Here</span>
```

### Portfolio Projects
Each project is an `<article class="project-card">`. To add a real screenshot:
1. Place the image in `assets/` (e.g. `assets/project1.jpg`).
2. Replace the placeholder `<div class="card-img-placeholder">` with:
```html
<img src="assets/project1.jpg" alt="Project screenshot" />
```
Update the title, description, and link as needed.

### Experience Timeline
Edit the `.timeline-item` blocks in `#experience`. Add or remove items freely.

---

## 🎨 Colour Customisation

The site is strictly black & white with CSS variables. To tweak colours, edit the `:root` block in `style.css`:

```css
:root {
  --bg:         #ffffff;   /* page background */
  --text:       #0a0a0a;   /* primary text */
  --text-muted: #6b6b6b;   /* secondary text */
  --border:     #e5e5e5;   /* borders */
  --bg-subtle:  #f5f5f5;   /* alternate section bg */
}
```

Dark mode values are in the `body.dark-mode { }` block directly below.

---

## 🌙 Dark Mode

Dark mode is built-in. It respects the user's OS preference on first visit  
and remembers their toggle choice via `localStorage`.

---

## ⚡ Performance Tips

- Images in `assets/` should be compressed (use [Squoosh](https://squoosh.app/)).
- Keep project screenshots under **200 KB** each.
- The site has zero JavaScript dependencies — loads extremely fast.

---

## 📄 License

Feel free to use and modify this template for your personal portfolio.  
Please remove or update the credits in the footer.

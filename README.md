# Sunny's ML Learning Journal

A simple, static blog-style journal for documenting machine learning progress. Built with plain HTML, CSS, and JavaScript — no build step required.

## Quick Start

Since this is a static site that fetches local files, you need a local server (browsers block `fetch()` on `file://` URLs).

**Option 1 — Python:**
```bash
cd ml-journal
python3 -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000).

**Option 2 — Node.js:**
```bash
npx serve ml-journal
```

**Option 3 — VS Code:**
Install the "Live Server" extension and click "Go Live".

## Adding a New Post

1. Create a Markdown file in `posts/`, e.g. `posts/2026-04-01-gradient-descent.md`.
2. Add an entry to `posts/posts.json`:
   ```json
   {
     "title": "Understanding Gradient Descent",
     "date": "2026-04-01",
     "file": "2026-04-01-gradient-descent.md",
     "summary": "My notes on how gradient descent works."
   }
   ```
3. That's it! The site picks it up automatically and sorts posts by date (newest first).

## Editing Content

All non-post content lives in `content.json`. Edit this file to update:

- **About Me** — The `about` field (use `\n` for paragraph breaks).
- **Contact** — The `contact` array. Each item has `type` (email, github, linkedin, twitter, website), `label`, and `url`.
- **Objectives** — The `objectives` array. Each item has `type` ("objective" or "question") and `text`.
- **Resources** — The `resources` array, grouped by `category`, each with `items` containing `name`, `url`, and optional `description`.

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Push this folder as the repo root:
   ```bash
   cd ml-journal
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Go to **Settings > Pages** in your repo.
4. Set source to **Deploy from a branch**, select **main** branch, root `/`.
5. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`.

## Project Structure

```
ml-journal/
├── index.html          Single HTML file with all sections
├── css/
│   └── style.css       White/black/pink theme, responsive layout
├── js/
│   └── app.js          Navigation, Markdown rendering, content loading
├── content.json        About, contact, objectives, and resources data
├── posts/
│   ├── posts.json      Post manifest (title, date, file, summary)
│   └── *.md            Individual blog posts in Markdown
└── README.md
```

## Tech

- **marked.js** (CDN) — Markdown to HTML rendering
- **Inter** (Google Fonts) — Typography
- No frameworks, no build tools, no dependencies to install.

# Joshua Immanuel · Data × Behaviour × Decisions

## What this version is

This portfolio is not a generic "developer portfolio". The site is positioned around:

**Data × Behaviour × Decisions**

The visual direction combines:
- Editorial spacing, large type, interactive cards and motion
- Power BI-style KPI and analytical hierarchy
- causal-diagram motifs and prediction-vs-causality language
- light/dark mode
- responsive desktop / tablet / mobile layouts
- reduced-motion accessibility

## Main proof layers

### 1. GitHub projects
The first three project cards are the main technical portfolio:
- Causal behavioural telemarketing audit
- NudgeDesigner
- Water Access Portfolio

### 2. Featured writing
"Beyond the Nudge: The Behavioural Strategy Playbook Nobody Teaches" is treated as a flagship intellectual asset.

### 3. Credentials
Certificates are deliberately presented as supporting evidence, not as the centre of the portfolio. The strongest relevance signals are:
- World Bank · Introduction to Behavioral Science in Public Policy
- ALX / Explore AI Academy · 13-month Data Science Programme
- ALX · Professional Development Skills / Tech Career Specialization
- NED 9.0 · Certificate of Recognition
- University of Amsterdam / Coursera · Introduction to Communication Science
- Side Hustle Internship

## Content editing

The design is separated from content. Most content lives in `/content/*.json`.

Files:
- `site.json` · profile, hero, KPIs, principles and education
- `projects.json` · portfolio projects
- `experience.json` · professional experience
- `leadership.json` · leadership/community evidence
- `certificates.json` · certificate cards
- `writing.json` · Medium posts
- `skills.json` · toolkit

You can edit the JSON directly during development, or use Decap CMS once the CMS connection is configured.

---

# GitHub → Netlify → Decap CMS

## Recommended architecture

```text
Decap CMS
    │
    │ publish
    ▼
GitHub repository
    │
    │ commit detected
    ▼
Netlify
    │
    ▼
Live portfolio
```

GitHub is the source of truth. Netlify is the deployment layer. Decap is the editing interface.

### Important 2026 note

Netlify currently marks **Git Gateway as deprecated for new configurations**. This repository therefore includes a simple `git-gateway` configuration because it is the shortest setup for the requested GitHub → Netlify → Decap flow, but if Netlify does not expose Git Gateway for your new site, use **Decap Turbo** or a GitHub backend/OAuth provider instead.

---

## Step 1 · Create the GitHub repository

Create a public repository:

`joshua-immanuel-portfolio`

Then from the project folder:

```bash
git init
git branch -M main
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/immanueljoshua2019-art/joshua-immanuel-portfolio.git
git push -u origin main
```

---

## Step 2 · Test locally

Do not double-click `index.html`, because the site loads JSON using `fetch()`.

Run:

```bash
python -m http.server 8000
```

Open:

`http://localhost:8000`

Check:
- light/dark mode
- mobile menu
- project cards
- certificate images
- Medium slideshow
- all links
- `/admin/`

---

## Step 3 · Connect GitHub to Netlify

In Netlify:

1. Add new project/site.
2. Choose "Import an existing project".
3. Select GitHub.
4. Select `joshua-immanuel-portfolio`.
5. Deploy.

For this static site:

**Build command:** leave blank

**Publish directory:** `.`

The live site will receive a Netlify URL.

---

## Step 4 · Configure the CMS

The CMS lives at:

`/admin/`

The repository already includes:

```text
admin/
  index.html
  config.yml
```

After deployment, visit:

`https://YOUR-SITE.netlify.app/admin/`

### If Git Gateway is available

In Netlify:
1. Enable Identity.
2. Set registration to Invite only.
3. Enable Git Gateway.
4. Invite your own email.
5. Accept the invitation.
6. Open `/admin/`.

Publishing from Decap will commit changes to GitHub, which Netlify then deploys.

### If Git Gateway is unavailable

Do not fight the deprecated integration. Use Decap Turbo or configure Decap's GitHub backend with a suitable OAuth provider.

The site content architecture is intentionally backend-agnostic: the visible site only needs the JSON files to exist in the repository.

---


## Future content collections

Add these to Decap later:
- `case-studies`
- `research-notes`
- `speaking`
- `experiments`
- `recommendations`
- `press`
- `certificates`
- `writing`

## Future case-study structure

Each major project should eventually have:

```text
Problem
↓
Context
↓
Behavioural diagnosis
↓
Data
↓
Hypothesis
↓
Method
↓
Evidence
↓
Causal question
↓
Limitations
↓
Recommendation
↓
Decision
```

That is the strongest way to make the website itself demonstrate your analytical method.

## Future QA

Use GitHub Actions to automatically test:
- JSON validity
- broken links
- missing images
- missing alt text
- HTML validity
- accessibility
- Lighthouse performance

Then use:

```text
feature branch
    ↓
Netlify deploy preview
    ↓
review
    ↓
merge to main
    ↓
production
```

---

# Updating the portfolio without hardcoding

The intended workflow is:

```text
Open /admin
   ↓
Projects
   ↓
Add / edit project
   ↓
Upload image
   ↓
Publish
   ↓
GitHub commit
   ↓
Netlify deploy
   ↓
Live portfolio
```

For the Medium section:

```text
Open /admin
   ↓
Writing
   ↓
Add article
   ↓
Paste Medium URL
   ↓
Publish
```

For certificates:

```text
Open /admin
   ↓
Credentials
   ↓
Add certificate
   ↓
Upload certificate image
   ↓
Add issuer / year / capability signal
   ↓
Publish
```

The site does not need to be rebuilt from scratch every time you add content.

---

# Design philosophy

The site follows one rule:

**Motion should explain relationships, not merely decorate the page.**

Examples:
- causal arrows move
- analytical grids create spatial structure
- KPI cards surface evidence quickly
- project visuals encode the underlying idea
- the Medium carousel creates progressive disclosure
- certificates provide secondary credibility
- dark mode becomes an analytical "lab" environment
- mobile layouts collapse complexity rather than merely shrinking it

# LifeOS Practice Tests — React App

A clean, mobile-first practice test platform for Vinay and Ishaan.

## Quick Start

### 1. Prerequisites
- Node.js 16+ installed
- GitHub account (create at github.com if needed)
- Vercel account (sign in with GitHub)

### 2. Local Setup

```bash
# Clone or download this folder
cd lifeos-practice-tests

# Install dependencies
npm install

# Create .env.local and fill in values (see below)
# cp .env.local.template .env.local

# Start development server
npm run dev
```

The app opens at `http://localhost:3000`.

### 3. Configure Environment Variables

Open `.env.local` and fill in:

```
VITE_HUB_SHEET_ID=<your-hub-sheet-id>
VITE_APPS_SCRIPT_URL=<your-web-app-url>
```

**How to get these:**

- **HUB_SHEET_ID**: Open your `LifeOS_PracticeTests_HUB` Google Sheet, copy the ID from the URL:
  - URL: `https://docs.google.com/spreadsheets/d/{ID}/edit`
  - Paste the `{ID}` part

- **APPS_SCRIPT_URL**: After deploying the HUB Apps Script as a Web App:
  1. In the HUB sheet, go to **Extensions → Apps Script**
  2. Click **Deploy → New deployment → Type: Web app**
  3. Execute as: Your account
  4. Who has access: Anyone
  5. Deploy
  6. Copy the resulting URL and paste into `.env.local`

### 4. Deploy to Vercel

```bash
# Push to GitHub
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/lifeos-practice-tests.git
git push -u origin main
```

Then:
1. Go to vercel.com
2. Click "New Project"
3. Select your GitHub repo
4. Add environment variables (copy from `.env.local`)
5. Deploy!

Your app will be live at `https://your-project.vercel.app`.

## File Structure

```
src/
├── components/
│   ├── LoginScreen.jsx       # Kid selector
│   ├── Dashboard.jsx         # Subject list
│   ├── SubjectSelector.jsx   # Test config
│   ├── TestTaker.jsx         # Question display + navigation
│   ├── QuestionDisplay.jsx   # Individual question renderer
│   └── ScoreSummary.jsx      # Results screen
├── services/
│   ├── config.js             # Environment config
│   └── appsScriptBridge.js   # Apps Script API calls
├── styles/
│   └── index.css             # Tailwind styles
├── App.jsx                   # Main app logic
└── index.jsx                 # Entry point
```

## How It Works

1. **Kid picks subject** on dashboard
2. **Config test** (# questions, difficulty)
3. **Questions fetched** from HUB QuestionBank
4. **Test taken** one question at a time
5. **Answers submitted** to Apps Script for grading
6. **Score displayed** with per-cluster breakdown

## Troubleshooting

| Issue | Fix |
|---|---|
| "VITE_APPS_SCRIPT_URL not configured" | Fill `.env.local` and restart (`npm run dev`) |
| Blank dashboard | Check HUB_SHEET_ID is correct; make sure HUB sheet has Subjects tab |
| "No questions found" | QuestionBank tab in HUB is empty; use LLM Generator to add questions |
| Deploy fails | Check `.gitignore` includes `node_modules` and `.env.local` |

## Next Steps

- Test locally with `npm run dev`
- Deploy to Vercel and share the URL with the kids
- Monitor ScoreTracker in the HUB sheet to see progress
- Add more questions via the LLM Generator as needed

## Environment Variables Reference

- `VITE_HUB_SHEET_ID` — The Google Sheet ID of your HUB
- `VITE_APPS_SCRIPT_URL` — The deployed Web App URL of HUB's Apps Script

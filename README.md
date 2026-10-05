# 3riumphant — Learn → Practice → 3riumph

AI study platform for medical and health-science students. Upload PDF, PPTX, DOCX, TXT or MD files, then get summaries, mnemonics, quizzes (5/10/20/50 questions) and spaced-repetition flashcards.

## Problem
Students face large volumes of lecture material and little time to turn it into active revision.

## Solution
Upload once. 3riumphant extracts the text in the browser and uses an LLM to generate study resources grounded in that material. Quiz answers stay hidden until submitted, and flashcards are scheduled with an SM-2-style spaced-repetition algorithm.

## Tech
Static HTML/CSS/JS front end, pdf.js and JSZip for file parsing, one serverless function (`api/ai.js`) that calls any OpenAI-compatible API. The API key never reaches the browser.

## Run / deploy
1. Push this folder to GitHub.
2. Import the repo into Vercel (free tier works).
3. Add environment variables from `.env.example` (`AI_API_KEY` required).
4. Deploy. `index.html` is the landing page and `app.html` is the studio.

## Security notes
Materials and progress are stored in the user's browser (localStorage) only, so no user can access another's documents. The AI endpoint has no login yet, so anyone with the URL can use your key quota: set a spending limit with your provider.

## Not built yet
User accounts, cloud database (e.g. Supabase), server-side file storage, global search, progress charts, bookmarks, clinical cases, and a test suite.

## Roadmap
Accounts and cloud sync, rate limiting, clinical cases, progress analytics, voice tutor, study groups.

## Screenshots
Add screenshots to a `/screenshots` folder and link them here.

*Educational tool, not a substitute for professional medical advice, diagnosis, or treatment.*

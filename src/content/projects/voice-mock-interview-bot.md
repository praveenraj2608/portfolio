---
title: Voice-Enabled AI Mock-Interview Bot
order: 3
year: '2026'
role: Solo build - LLM logic, voice pipeline
summary: A voice interviewer built on the Claude API that asks, listens, adapts its difficulty and gives structured feedback.
what:
  - Runs a spoken mock interview - it asks questions out loud and listens to your answers.
  - Adapts the next question to your previous answers and adjusts difficulty as you go.
  - Keeps contextual memory of the whole session so follow-ups make sense.
  - Evaluates each response and ends with structured feedback.
  - Uses speech-to-text for input and ElevenLabs for natural voice output.
why: Practising interviews alone is hard - reading questions off a list does not feel like the real thing. I wanted a practice partner that talks, listens and pushes back like an interviewer would.
stack:
  Language: [Python]
  LLM: [Claude API]
  Voice: [Speech-to-text, ElevenLabs]
  Techniques: [Prompt engineering, Contextual memory]
problems:
  - problem: Maintaining conversational context across interview turns — each follow-up question needs to reference what the candidate already said, but LLM calls are stateless by default.
    fix: The full conversation history is appended to every Claude API request so the model can reference earlier answers. This works for short sessions but grows linearly with turn count. A future improvement is to summarise older turns into a compressed context window so token usage stays bounded during longer interviews.
  - problem: Coordinating two different LLMs — Claude generates the interview questions and drives the conversation, while Gemini evaluates the candidate's answers — means their outputs need to stay aligned on rubric and context.
    fix: Both models receive the same structured prompt template and scoring rubric, so evaluation criteria stay consistent regardless of which model runs which task. The current design passes Claude's conversation log to Gemini at evaluation time. A tighter integration — such as a shared schema contract or validation layer between the two — is an open area for improvement.
  - problem: Authenticated endpoints (session start, answer submission, feedback retrieval) are exposed over HTTP during development, and any credentials or API keys in transit need protection.
    fix: API keys are loaded from environment variables and never embedded in client code. Session tokens gate access to each interview session. For production, HTTPS and proper CORS policies are planned but not yet enforced in the development build.
  - problem: The app depends on three external APIs (Claude, Gemini, ElevenLabs) and any of them can fail mid-session due to rate limits, expired keys, or network issues.
    fix: Each API call is wrapped in try/except with a user-facing fallback message so a single failure does not crash the session. Missing API keys are caught at startup and surfaced as clear configuration errors. Retry logic with exponential backoff is a planned addition for transient failures.
  - problem: Text-to-speech through ElevenLabs adds noticeable latency to every interviewer turn, and the free tier has strict character quotas that can run out mid-session.
    fix: Audio is streamed rather than generated as a single block, which reduces perceived wait time. Quota usage is tracked per session, and when the limit is close the app falls back to browser-native speech synthesis. Caching repeated phrases (greetings, transitions) to avoid redundant API calls is a future optimisation.
  - problem: Interview sessions are stored in temporary server-side storage, which does not persist across restarts and will not scale horizontally if multiple instances run behind a load balancer.
    fix: Sessions currently live in in-memory or file-based storage, which is sufficient for single-user local development. For deployment, migrating to a shared store such as Redis or a lightweight database is the planned path so sessions survive restarts and can be accessed from any instance.
status: in-progress
draftProblems: true
---
